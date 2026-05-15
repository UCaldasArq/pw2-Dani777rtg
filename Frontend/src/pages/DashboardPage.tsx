import { useState, useEffect } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import ApplicationChart from '../components/ApplicationChart';
import UsagePeriodChart from '../components/UsagePeriodChart';
import type { UsageRecord } from '../types';
import { getUsageRecords } from '../services/usageService';
import { btnSecondaryClass, cardClass } from '../lib/ui';

const DashboardPage = () => {
  const [records, setRecords] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsageRecords();
      setRecords(response.data);
    } catch (err) {
      console.error('Failed to fetch usage records', err);
      setError('Could not load usage data. Check that the API is reachable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const recordToMinutes = (r: UsageRecord) => r.days * 24 * 60 + r.hours * 60 + r.minutes;

  const getTopApplication = () => {
    if (records.length === 0) return null;
    const dataMap = records.reduce(
      (acc, curr) => {
        const totalMinutes = recordToMinutes(curr);
        acc[curr.application] = (acc[curr.application] || 0) + totalMinutes;
        return acc;
      },
      {} as Record<string, number>,
    );

    let topApp = '';
    let maxTime = -1;

    for (const [app, time] of Object.entries(dataMap)) {
      if (time > maxTime) {
        maxTime = time;
        topApp = app;
      }
    }

    return { name: topApp, time: maxTime };
  };

  const topApp = getTopApplication();
  const totalMinutesAll = records.reduce((sum, r) => sum + recordToMinutes(r), 0);
  const totalHoursAll = totalMinutesAll / 60;

  if (loading) {
    return (
      <div className={`${cardClass} flex flex-col items-center justify-center gap-3 py-16 text-center`}>
        <Loader2 className="h-8 w-8 animate-spin text-accent" aria-hidden />
        <p className="text-sm font-medium text-ink-muted">Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${cardClass} max-w-lg border-danger/25 bg-danger-soft/40`}>
        <h1 className="text-xl font-semibold text-ink">Usage dashboard</h1>
        <p className="mt-2 text-sm text-danger">{error}</p>
        <button type="button" className={`${btnSecondaryClass} mt-6`} onClick={() => load()}>
          <RefreshCw className="h-4 w-4" aria-hidden />
          Retry
        </button>
      </div>
    );
  }

  const statCard = 'rounded-xl border border-border bg-surface p-6 shadow-sm';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Usage dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          High-level totals and two charts aligned with the rest of the app palette.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className={statCard}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Total records</h3>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-ink">{records.length}</p>
        </div>
        <div className={statCard}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Most used app</h3>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{topApp ? topApp.name : 'N/A'}</p>
        </div>
        <div className={statCard}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Total time (hours)</h3>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-ink">{totalHoursAll.toFixed(1)}</p>
          <p className="mt-2 text-xs text-ink-muted">
            {topApp ? `Top app: ${topApp.name} (${(topApp.time / 60).toFixed(1)} h)` : 'No usage yet'}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="button" className={btnSecondaryClass} onClick={() => load()}>
          <RefreshCw className="h-4 w-4" aria-hidden />
          Refresh data
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={cardClass}>
          <ApplicationChart records={records} />
        </div>
        <div className={cardClass}>
          <UsagePeriodChart records={records} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
