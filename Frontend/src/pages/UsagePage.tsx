import { useState, useEffect } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import UsageForm from '../components/UsageForm';
import UsageTable from '../components/UsageTable';
import type { User, UsageRecord, Application } from '../types';
import { getUsageRecords, createUsageRecord, deleteUsageRecord, getApplications } from '../services/usageService';
import { getUsers } from '../services/userService';
import { btnSecondaryClass, cardClass, inputClass, labelClass } from '../lib/ui';

const UsagePage = () => {
  const [records, setRecords] = useState<UsageRecord[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterApp, setFilterApp] = useState('');
  const [filterUser, setFilterUser] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usageRes, userRes, appRes] = await Promise.all([
        getUsageRecords(),
        getUsers(),
        getApplications(),
      ]);
      setRecords(usageRes.data);
      setUsers(userRes.data);
      setApplications(appRes.data);
      setError(null);
    } catch {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateRecord = async (record: UsageRecord) => {
    try {
      await createUsageRecord(record);
      fetchData();
    } catch {
      alert('Error saving record');
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (window.confirm('Delete this record?')) {
      try {
        await deleteUsageRecord(id);
        fetchData();
      } catch {
        alert('Error deleting record');
      }
    }
  };

  const filteredRecords = records.filter((r) => {
    const matchesApp = filterApp ? r.application === filterApp : true;
    const matchesUser = filterUser ? r.userId === filterUser : true;
    return matchesApp && matchesUser;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Application usage</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Log time per user and application, then filter the history without leaving the page.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-muted">Register usage</h2>
          <UsageForm users={users} applications={applications} onSubmit={handleCreateRecord} />
        </div>
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Usage history</h2>
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <label htmlFor="filter-app" className={labelClass}>
                  Application
                </label>
                <select
                  id="filter-app"
                  value={filterApp}
                  onChange={(e) => setFilterApp(e.target.value)}
                  className={`${inputClass} min-w-[10rem]`}
                >
                  <option value="">All apps</option>
                  {applications.map((app) => (
                    <option key={app.id} value={app.name}>
                      {app.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="filter-user" className={labelClass}>
                  User
                </label>
                <select
                  id="filter-user"
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                  className={`${inputClass} min-w-[12rem]`}
                >
                  <option value="">All users</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.firstName} {u.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={() => fetchData()} className={btnSecondaryClass} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} aria-hidden />
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className={`${cardClass} flex items-center gap-3 text-sm text-ink-muted`}>
              <Loader2 className="h-5 w-5 animate-spin text-accent" aria-hidden />
              Loading…
            </div>
          ) : error ? (
            <div className={`${cardClass} border-danger/25 bg-danger-soft/40`}>
              <p className="text-sm font-medium text-danger">{error}</p>
              <button type="button" className={`${btnSecondaryClass} mt-4`} onClick={() => fetchData()}>
                Try again
              </button>
            </div>
          ) : (
            <UsageTable records={filteredRecords} onDelete={handleDeleteRecord} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsagePage;
