import { render, screen } from '@testing-library/react';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import DashboardPage from '../src/pages/DashboardPage';
import { getUsageRecords } from '../src/services/usageService';

vi.mock('../src/services/usageService', () => ({
  getUsageRecords: vi.fn(),
}));

vi.mock('../src/components/ApplicationChart', () => ({
  default: ({ records }: { records: unknown[] }) => <div>Application chart records: {records.length}</div>,
}));

vi.mock('../src/components/UsagePeriodChart', () => ({
  default: ({ records }: { records: unknown[] }) => <div>Usage period chart records: {records.length}</div>,
}));

beforeEach(() => {
  vi.mocked(getUsageRecords).mockResolvedValue({
    data: [
      {
        id: 'record-1',
        userId: 'user-1',
        application: 'YouTube',
        days: 0,
        hours: 2,
        minutes: 30,
        usagePeriod: 'Morning',
      },
      {
        id: 'record-2',
        userId: 'user-1',
        application: 'TikTok',
        days: 0,
        hours: 4,
        minutes: 0,
        usagePeriod: 'Night',
      },
    ],
  });
});

describe('DashboardPage', () => {
  it('shows loading state, summary cards and top used application', async () => {
    render(<DashboardPage />);

    expect(screen.getByText(/Loading dashboard/i)).toBeInTheDocument();

    expect(await screen.findByRole('heading', { name: /usage dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/total records/i)).toBeInTheDocument();
    expect(screen.getByText(/most used app/i)).toBeInTheDocument();
    expect(screen.getByText('TikTok')).toBeInTheDocument();
    // Total time: 2h30 + 4h = 6.5 h; top app TikTok remains 4.0 h in subtitle
    expect(screen.getByText('6.5')).toBeInTheDocument();
    expect(screen.getByText(/Top app: TikTok \(4\.0 h\)/)).toBeInTheDocument();
    expect(screen.getByText('Application chart records: 2')).toBeInTheDocument();
    expect(screen.getByText('Usage period chart records: 2')).toBeInTheDocument();
  });
});
