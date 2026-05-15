import { useState, useEffect } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import type { CreateUserPayload } from '../services/userService';
import type { User } from '../types';
import { getUsers, createUser, deleteUser } from '../services/userService';
import { btnSecondaryClass, cardClass } from '../lib/ui';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (user: CreateUserPayload) => {
    try {
      await createUser(user);
      fetchUsers();
    } catch (err: unknown) {
      const ax = err as {
        response?: { status?: number; data?: Record<string, string> };
      };
      if (ax.response?.status === 400 || ax.response?.status === 409) {
        const data = ax.response.data;
        const detail =
          data?.message ||
          (data
            ? Object.entries(data)
                .filter(([k]) => k !== 'message' && k !== 'error')
                .map(([, v]) => v)
                .join(' ')
            : '');
        alert('Validation error: ' + (detail || 'Check fields'));
      } else {
        alert('Error creating user');
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch {
        alert('Error deleting user');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">User management</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          Create people once, then attach usage records to them from the Usage page.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-muted">Register user</h2>
          <UserForm onSubmit={handleCreateUser} />
        </div>
        <div className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Registered users</h2>
            <button type="button" onClick={() => fetchUsers()} className={btnSecondaryClass} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} aria-hidden />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className={`${cardClass} flex items-center gap-3 text-sm text-ink-muted`}>
              <Loader2 className="h-5 w-5 animate-spin text-accent" aria-hidden />
              Loading users…
            </div>
          ) : error ? (
            <div className={`${cardClass} border-danger/25 bg-danger-soft/40`}>
              <p className="text-sm font-medium text-danger">{error}</p>
              <button type="button" className={`${btnSecondaryClass} mt-4`} onClick={() => fetchUsers()}>
                Try again
              </button>
            </div>
          ) : (
            <UserTable users={users} onDelete={handleDeleteUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
