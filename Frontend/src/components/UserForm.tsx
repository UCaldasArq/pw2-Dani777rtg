import { useState } from 'react';
import type { CreateUserPayload } from '../services/userService';
import { btnPrimaryClass, cardClass, inputClass, labelClass } from '../lib/ui';

interface UserFormProps {
  onSubmit: (user: CreateUserPayload) => void;
}

type FormState = {
  firstName: string;
  lastName: string;
  document: string;
  phoneNumber: string;
  email: string;
  city: string;
  birthDate: string;
};

const emptyForm: FormState = {
  firstName: '',
  lastName: '',
  document: '',
  phoneNumber: '',
  email: '',
  city: '',
  birthDate: '',
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const UserForm = ({ onSubmit }: UserFormProps) => {
  const [formData, setFormData] = useState<FormState>(emptyForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, document, phoneNumber, email, city, birthDate } = formData;
    if (!firstName.trim() || !lastName.trim() || !document.trim() || !phoneNumber.trim() || !email.trim()) {
      alert('Nombre, apellido, documento, teléfono y correo son obligatorios.');
      return;
    }
    if (!emailOk(email)) {
      alert('Introduce un correo electrónico válido.');
      return;
    }
    if (!/^\d+$/.test(phoneNumber.trim())) {
      alert('El teléfono solo puede contener números.');
      return;
    }

    const payload: CreateUserPayload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      document: document.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
    };
    const c = city.trim();
    if (c) {
      payload.city = c;
    }
    const b = birthDate.trim();
    if (b) {
      payload.birthDate = b;
    }

    onSubmit(payload);
    setFormData(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cardClass}
      noValidate
      aria-label="Formulario de registro de usuario"
    >
      <div className="mb-4">
        <label htmlFor="user-firstName" className={labelClass}>
          Nombre
        </label>
        <input
          id="user-firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={inputClass}
          type="text"
          autoComplete="given-name"
          placeholder="Ej. María"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user-lastName" className={labelClass}>
          Apellido
        </label>
        <input
          id="user-lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={inputClass}
          type="text"
          autoComplete="family-name"
          placeholder="Ej. Gómez"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user-document" className={labelClass}>
          Documento
        </label>
        <input
          id="user-document"
          name="document"
          value={formData.document}
          onChange={handleChange}
          className={inputClass}
          type="text"
          inputMode="text"
          autoComplete="off"
          placeholder="Ej. 1234567890"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user-phoneNumber" className={labelClass}>
          Teléfono
        </label>
        <input
          id="user-phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={inputClass}
          type="text"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="Solo números, ej. 3001234567"
          required
          pattern="[0-9]+"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user-email" className={labelClass}>
          Correo electrónico
        </label>
        <input
          id="user-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          type="email"
          autoComplete="email"
          placeholder="Ej. maria.gomez@correo.com"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user-city" className={labelClass}>
          Ciudad <span className="font-normal normal-case text-zinc-400">(opcional)</span>
        </label>
        <input
          id="user-city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={inputClass}
          type="text"
          autoComplete="address-level2"
          placeholder="Ej. Manizales"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="user-birthDate" className={labelClass}>
          Fecha de nacimiento <span className="font-normal normal-case text-zinc-400">(opcional)</span>
        </label>
        <input
          id="user-birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className={inputClass}
          type="date"
          max={new Date().toISOString().slice(0, 10)}
        />
      </div>
      <button className={`${btnPrimaryClass} w-full sm:w-auto`} type="submit">
        Registrar usuario
      </button>
    </form>
  );
};

export default UserForm;
