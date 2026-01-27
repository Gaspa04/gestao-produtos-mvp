import { ReactNode, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-gray-50">
      <tr className="text-left text-gray-700">{children}</tr>
    </thead>
  );
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
}

export function TH({ children }: { children: ReactNode }) {
  return <th className="px-4 py-2 font-medium">{children}</th>;
}

export function TD({ children, className, ...props }: HTMLAttributes<HTMLTableCellElement> & { children: ReactNode }) {
  return <td className={clsx('px-4 py-2 align-middle', className)} {...props}>{children}</td>;
}
