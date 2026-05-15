import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { UsageRecord } from '../types';

interface UsagePeriodChartProps {
  records: UsageRecord[];
}

const COLORS = ['#1f6f5b', '#8c6b52', '#4b5563'];

const UsagePeriodChart = ({ records }: UsagePeriodChartProps) => {
  const dataMap = records.reduce(
    (acc, curr) => {
      acc[curr.usagePeriod] = (acc[curr.usagePeriod] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.keys(dataMap).map((name) => ({
    name,
    value: dataMap[name],
  }));

  return (
    <div className="h-72 w-full">
      <h3 className="mb-4 text-center text-sm font-semibold text-ink">Usage frequency by period</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={52}
            outerRadius={88}
            paddingAngle={2}
            dataKey="value"
            stroke="#f5f4f0"
            strokeWidth={2}
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: '1px solid #e2e0da',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: '#5f5e5b' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsagePeriodChart;
