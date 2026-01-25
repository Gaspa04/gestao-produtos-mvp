"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

type Toast = { id: number; message: string; type?: 'success' | 'error' };

const ToastCtx = createContext<{
  toasts: Toast[];
  show: (message: string, type?: 'success' | 'error') => void;
  remove: (id: number) => void;
} | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const show = (message: string, type?: 'success' | 'error') => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => remove(id), 4000);
  };
  const remove = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));
  return (
    <ToastCtx.Provider value={{ toasts, show, remove }}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 grid gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`rounded-md px-3 py-2 text-sm shadow-md ${t.type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'}`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('ToastProvider não encontrado');
  return ctx;
}
