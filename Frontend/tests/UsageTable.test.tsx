import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UsageTable from '../src/components/UsageTable';

describe('UsageTable', () => {
  it('renders usage records with user names, time and period', () => {
    const handleDelete = vi.fn();
    render(
      <UsageTable
        records={[
          {
            id: 'record-1',
            userId: 'user-1',
            user: {
              id: 'user-1',
              firstName: 'Ana',
              lastName: 'Perez',
              document: '123',
              phoneNumber: '3001234567',
              email: 'ana@example.com',
            },
            application: 'YouTube',
            days: 1,
            hours: 3,
            minutes: 15,
            usagePeriod: 'Afternoon',
          },
        ]}
        onDelete={handleDelete}
      />,
    );

    expect(screen.getByText('Ana Perez')).toBeInTheDocument();
    expect(screen.getByText('YouTube')).toBeInTheDocument();
    expect(screen.getByText('1d 3h 15m')).toBeInTheDocument();
    expect(screen.getByText('Afternoon')).toBeInTheDocument();
  });

  it('falls back to user id and calls delete for the selected record', () => {
    const handleDelete = vi.fn();
    render(
      <UsageTable
        records={[
          {
            id: 'record-2',
            userId: 'user-2',
            application: 'Spotify',
            days: 0,
            hours: 1,
            minutes: 45,
            usagePeriod: 'Night',
          },
        ]}
        onDelete={handleDelete}
      />,
    );

    expect(screen.getByText('user-2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    expect(handleDelete).toHaveBeenCalledWith('record-2');
  });
});
