import { SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type Option = { value: string; label: string };

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Option[];
};

export function Select({ label, error, className, options, ...props }: Props) {
  return (
    <label className="grid gap-1 text-sm">
      {label && <span className="text-gray-700">{label}</span>}
      <select
        className={clsx(
          'rounded-md border border-gray-300 bg-white px-3 py-2 outline-none',
          'focus:ring-2 focus:ring-brand focus:border-brand',
          className
        )}
        {...props}
      >
        <option value="">Selecione...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-600 text-xs">{error}</span>}
    </label>
  );
}
