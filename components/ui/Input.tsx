import { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, ...props }: Props) {
  return (
    <label className="grid gap-1 text-sm">
      {label && <span className="text-gray-700">{label}</span>}
      <input
        className={clsx(
          'rounded-md border border-gray-300 bg-white px-3 py-2 outline-none',
          'focus:ring-2 focus:ring-brand focus:border-brand',
          className
        )}
        {...props}
      />
      {error && <span className="text-red-600 text-xs">{error}</span>}
    </label>
  );
}
