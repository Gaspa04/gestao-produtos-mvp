import { ReactNode } from 'react';

export function Card({ title, icon, value, subtext, variant }: {
  title: string;
  icon?: ReactNode;
  value: ReactNode;
  subtext?: string;
  variant?: 'default' | 'warning';
}) {
  return (
    <div className={`rounded-md border bg-white p-4 ${variant === 'warning' ? 'border-yellow-400' : 'border-gray-200'}`}>
      <div className="flex items-center gap-2 text-gray-700">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {subtext && <div className="mt-1 text-xs text-gray-500">{subtext}</div>}
    </div>
  );
}
