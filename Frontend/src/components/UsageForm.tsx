import { useState } from 'react';
import type { User, UsageRecord, Application } from '../types';
import { btnPrimaryClass, cardClass, inputClass, labelClass, selectClass } from '../lib/ui';

interface UsageFormProps {
  users: User[];
  applications: Application[];
  onSubmit: (record: UsageRecord) => void;
}

const UsageForm = ({ users, applications, onSubmit }: UsageFormProps) => {
  const [formData, setFormData] = useState<UsageRecord>({
    userId: '',
    application: '',
    days: 0,
    hours: 0,
    minutes: 0,
    usagePeriod: 'Morning',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const val = name === 'days' || name === 'hours' || name === 'minutes' ? parseInt(value, 10) || 0 : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.userId && formData.application) {
      if (
        formData.hours < 0 ||
        formData.hours > 23 ||
        formData.minutes < 0 ||
        formData.minutes > 59 ||
        (formData.days ?? 0) < 0
      ) {
        alert('Invalid time values');
        return;
      }
      onSubmit(formData);
      setFormData({
        userId: '',
        application: '',
        days: 0,
        hours: 0,
        minutes: 0,
        usagePeriod: 'Morning',
      });
    } else {
      alert('User and Application are mandatory');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cardClass} noValidate>
      <div className="mb-4">
        <label htmlFor="userId" className={labelClass}>
          User
        </label>
        <select
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className={selectClass}
          required
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.firstName} {u.lastName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="application" className={labelClass}>
          Application
        </label>
        <select
          id="application"
          name="application"
          value={formData.application}
          onChange={handleChange}
          className={selectClass}
          required
        >
          <option value="">Select Application</option>
          {applications.map((app) => (
            <option key={app.id} value={app.name}>
              {app.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div>
          <label htmlFor="days" className={labelClass}>
            Days
          </label>
          <input
            id="days"
            name="days"
            type="number"
            min="0"
            value={formData.days}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="hours" className={labelClass}>
            Hours
          </label>
          <input
            id="hours"
            name="hours"
            type="number"
            min="0"
            max="23"
            value={formData.hours}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="minutes" className={labelClass}>
            Minutes
          </label>
          <input
            id="minutes"
            name="minutes"
            type="number"
            min="0"
            max="59"
            value={formData.minutes}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="usagePeriod" className={labelClass}>
          Usage Period
        </label>
        <select
          id="usagePeriod"
          name="usagePeriod"
          value={formData.usagePeriod}
          onChange={handleChange}
          className={selectClass}
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </select>
      </div>
      <button className={btnPrimaryClass} type="submit">
        Register Usage
      </button>
    </form>
  );
};

export default UsageForm;
