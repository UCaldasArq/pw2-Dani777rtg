import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import UsagePage from '../src/pages/UsagePage';
import { getUsers } from '../src/services/userService';
import { getUsageRecords, getApplications, deleteUsageRecord } from '../src/services/usageService';

vi.mock('../src/services/userService', () => ({
  getUsers: vi.fn(),
}));

vi.mock('../src/services/usageService', () => ({
  getUsageRecords: vi.fn(),
  createUsageRecord: vi.fn(),
  deleteUsageRecord: vi.fn(),
  getApplications: vi.fn(),
}));

const users = [
  {
    id: 'user-1',
    firstName: 'Ana',
    lastName: 'Perez',
    document: '123',
    phoneNumber: '3001234567',
    email: 'ana@example.com',
  },
  {
    id: 'user-2',
    firstName: 'Luis',
    lastName: 'Gomez',
    document: '456',
    phoneNumber: '3017654321',
    email: 'luis@example.com',
  },
];

const applications = [
  { id: 'app-1', name: 'YouTube' },
  { id: 'app-2', name: 'TikTok' },
];

const records = [
  {
    id: 'record-1',
    userId: 'user-1',
    user: users[0],
    application: 'YouTube',
    days: 0,
    hours: 2,
    minutes: 10,
    usagePeriod: 'Morning' as const,
  },
  {
    id: 'record-2',
    userId: 'user-2',
    user: users[1],
    application: 'TikTok',
    days: 0,
    hours: 1,
    minutes: 5,
    usagePeriod: 'Night' as const,
  },
];

beforeEach(() => {
  vi.mocked(getUsageRecords).mockResolvedValue({ data: records });
  vi.mocked(getUsers).mockResolvedValue({ data: users });
  vi.mocked(getApplications).mockResolvedValue({ data: applications });
  vi.mocked(deleteUsageRecord).mockResolvedValue({ data: {} });
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});

describe('UsagePage', () => {
  it('loads usage data and filters records by application and user', async () => {
    render(<UsagePage />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    const table = await screen.findByRole('table');
    expect(within(table).getByText('Ana Perez')).toBeInTheDocument();
    expect(within(table).getByText('YouTube')).toBeInTheDocument();
    expect(within(table).getByText('TikTok')).toBeInTheDocument();

    const [appFilter, userFilter] = screen.getAllByRole('combobox').slice(-2);

    fireEvent.change(appFilter, { target: { value: 'TikTok' } });
    expect(within(table).queryByText('YouTube')).not.toBeInTheDocument();
    expect(within(table).getByText('TikTok')).toBeInTheDocument();

    fireEvent.change(userFilter, { target: { value: 'user-1' } });
    expect(within(table).queryByText('TikTok')).not.toBeInTheDocument();
  });

  it('confirms and deletes a usage record', async () => {
    render(<UsagePage />);

    await screen.findByRole('table');
    fireEvent.click(screen.getAllByRole('button', { name: /Delete/i })[0]);

    await waitFor(() => {
      expect(deleteUsageRecord).toHaveBeenCalledWith('record-1');
    });
  });
});
