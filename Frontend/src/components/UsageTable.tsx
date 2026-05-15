import { Trash2 } from 'lucide-react';
import type { UsageRecord } from '../types';
import { btnDangerClass, cardClass } from '../lib/ui';

interface UsageTableProps {
  records: UsageRecord[];
  onDelete: (id: string) => void;
}

const UsageTable = ({ records, onDelete }: UsageTableProps) => {
  return (
    <div className={`${cardClass} overflow-hidden p-0`}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-canvas/80">
            <tr>
              <th className="px-4 py-3 font-medium text-ink-muted">User</th>
              <th className="px-4 py-3 font-medium text-ink-muted">Application</th>
              <th className="px-4 py-3 font-medium text-ink-muted">Time</th>
              <th className="px-4 py-3 font-medium text-ink-muted">Period</th>
              <th className="px-4 py-3 font-medium text-ink-muted">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {records.map((record) => (
              <tr key={record.id} className="transition hover:bg-canvas/50">
                <td className="px-4 py-3 font-medium text-ink">
                  {record.user ? `${record.user.firstName} ${record.user.lastName}` : record.userId}
                </td>
                <td className="px-4 py-3 text-ink-muted">{record.application}</td>
                <td className="px-4 py-3 tabular-nums text-ink-muted">
                  {record.days}d {record.hours}h {record.minutes}m
                </td>
                <td className="px-4 py-3 text-ink-muted">{record.usagePeriod}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => record.id && onDelete(record.id)}
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

export default UsageTable;
