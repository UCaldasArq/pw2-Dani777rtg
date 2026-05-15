import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserForm from '../src/components/UserForm';

describe('UserForm', () => {
  it('submits form with correct data', () => {
    const handleSubmit = vi.fn();
    render(<UserForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/^Nombre$/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/^Apellido$/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/^Documento$/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/^Teléfono$/i), { target: { value: '5551234' } });
    fireEvent.change(screen.getByLabelText(/^Correo electrónico$/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Ciudad/i), { target: { value: 'Bogotá' } });
    fireEvent.change(screen.getByLabelText(/^Fecha de nacimiento/i), { target: { value: '1990-06-15' } });

    fireEvent.click(screen.getByRole('button', { name: /Registrar usuario/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      document: '12345678',
      phoneNumber: '5551234',
      email: 'john@example.com',
      city: 'Bogotá',
      birthDate: '1990-06-15',
    });
  });

  it('shows alert if required fields are empty', () => {
    const handleSubmit = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<UserForm onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /Registrar usuario/i }));

    expect(alertSpy).toHaveBeenCalledWith(
      'Nombre, apellido, documento, teléfono y correo son obligatorios.',
    );
    expect(handleSubmit).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it('does not submit when phone number contains letters', () => {
    const handleSubmit = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<UserForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/^Nombre$/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/^Apellido$/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/^Documento$/i), { target: { value: '87654321' } });
    fireEvent.change(screen.getByLabelText(/^Teléfono$/i), { target: { value: '555abc' } });
    fireEvent.change(screen.getByLabelText(/^Correo electrónico$/i), { target: { value: 'jane@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /Registrar usuario/i }));

    expect(alertSpy).toHaveBeenCalledWith('El teléfono solo puede contener números.');
    expect(handleSubmit).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });
});
