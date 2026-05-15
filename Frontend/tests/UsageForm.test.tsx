import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import UsageForm from '../src/components/UsageForm';

const users = [
  {
    id: 'user-1',
    firstName: 'Ana',
    lastName: 'Perez',
    document: '123',
    phoneNumber: '3001234567',
    email: 'ana@example.com',
  },
];

const applications = [
  { id: 'app-1', name: 'YouTube' },
  { id: 'app-2', name: 'TikTok' },
];

afterEach(() => {
  vi.restoreAllMocks();
});

describe('UsageForm', () => {
  it('submits a usage record with selected user, application and time data', () => {
    const handleSubmit = vi.fn();
    render(<UsageForm users={users} applications={applications} onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/User/i), { target: { value: 'user-1' } });
    fireEvent.change(screen.getByLabelText(/Application/i), { target: { value: 'YouTube' } });
    fireEvent.change(screen.getByLabelText(/Days/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Hours/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Minutes/i), { target: { value: '30' } });
    fireEvent.change(screen.getByLabelText(/Usage Period/i), { target: { value: 'Night' } });

    fireEvent.click(screen.getByRole('button', { name: /Register Usage/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      userId: 'user-1',
      application: 'YouTube',
      days: 1,
      hours: 2,
      minutes: 30,
      usagePeriod: 'Night',
    });
  });

  it('requires user and application before submitting', () => {
    const handleSubmit = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<UsageForm users={users} applications={applications} onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /Register Usage/i }));

    expect(alertSpy).toHaveBeenCalledWith('User and Application are mandatory');
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('rejects invalid hour and minute values', () => {
    const handleSubmit = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<UsageForm users={users} applications={applications} onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/User/i), { target: { value: 'user-1' } });
    fireEvent.change(screen.getByLabelText(/Application/i), { target: { value: 'TikTok' } });
    fireEvent.change(screen.getByLabelText(/Hours/i), { target: { value: '24' } });
    fireEvent.change(screen.getByLabelText(/Minutes/i), { target: { value: '60' } });

    fireEvent.click(screen.getByRole('button', { name: /Register Usage/i }));

    expect(alertSpy).toHaveBeenCalledWith('Invalid time values');
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
