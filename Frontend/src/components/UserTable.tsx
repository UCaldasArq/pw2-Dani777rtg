import { Trash2 } from 'lucide-react';
import type { User } from '../types';
import { btnDangerClass, cardClass } from '../lib/ui';

interface UserTableProps {
  users: User[];
  onDelete: (id: string) => void;
}

const formatDate = (iso?: string) => {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
};

const UserTable = ({ users, onDelete }: UserTableProps) => {
  return (
    <div className={`${cardClass} overflow-hidden p-0`}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr>
              <th className="px-4 py-3 font-medium text-zinc-600">Nombre</th>
              <th className="px-4 py-3 font-medium text-zinc-600">Documento</th>
              <th className="px-4 py-3 font-medium text-zinc-600">Teléfono</th>
              <th className="px-4 py-3 font-medium text-zinc-600">Correo</th>
              <th className="px-4 py-3 font-medium text-zinc-600">Ciudad</th>
              <th className="px-4 py-3 font-medium text-zinc-600">Nacimiento</th>
              <th className="px-4 py-3 font-medium text-zinc-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white">
            {users.map((user) => (
              <tr key={user.id} className="transition hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium text-zinc-900">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-3 text-zinc-600">{user.document}</td>
                <td className="px-4 py-3 text-zinc-600">{user.phoneNumber}</td>
                <td className="max-w-[10rem] truncate px-4 py-3 text-zinc-600" title={user.email}>
                  {user.email}
                </td>
                <td className="px-4 py-3 text-zinc-600">{user.city?.trim() ? user.city : '—'}</td>
                <td className="px-4 py-3 tabular-nums text-zinc-600">{formatDate(user.birthDate)}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => user.id && onDelete(user.id)}
                    className={btnDangerClass}
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
