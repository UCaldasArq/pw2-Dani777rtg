import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { UsageRecord } from '../types';

interface ApplicationChartProps {
  records: UsageRecord[];
}

const ACCENT = '#1f6f5b';

const ApplicationChart = ({ records }: ApplicationChartProps) => {
  const dataMap = records.reduce(
    (acc, curr) => {
      const totalMinutes = curr.days * 24 * 60 + curr.hours * 60 + curr.minutes;
      acc[curr.application] = (acc[curr.application] || 0) + totalMinutes;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.keys(dataMap).map((name) => ({
    name,
    minutes: dataMap[name],
    hours: parseFloat((dataMap[name] / 60).toFixed(2)),
  }));

  return (
    <div className="h-72 w-full">
      <h3 className="mb-4 text-center text-sm font-semibold text-ink">Usage by application (hours)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="#e2e0da" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#5f5e5b', fontSize: 12 }} axisLine={{ stroke: '#e2e0da' }} />
          <YAxis tick={{ fill: '#5f5e5b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #e2e0da',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}
            labelStyle={{ color: '#171717', fontWeight: 600 }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: '#5f5e5b' }} />
          <Bar dataKey="hours" name="Hours" fill={ACCENT} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationChart;
