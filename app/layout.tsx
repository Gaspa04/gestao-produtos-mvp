import '../styles/globals.css';
import { ReactNode } from 'react';
import { ToastProvider } from '../components/ui/Toast';

export const metadata = {
  title: 'Gestão de Produção e Vendas',
  description: 'MVP de gestão de produtos, materiais e vendas',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <ToastProvider>
          <header className="bg-white border-b">
            <div className="container py-4 flex items-center gap-4">
              <h1 className="text-xl font-semibold">Gestão</h1>
              <nav className="flex gap-3 text-sm">
                <a href="/" className="text-gray-700 hover:text-black">Dashboard</a>
                <a href="/products" className="text-gray-700 hover:text-black">Produtos</a>
                <a href="/materials" className="text-gray-700 hover:text-black">Materiais</a>
                <a href="/sales" className="text-gray-700 hover:text-black">Vendas</a>
              </nav>
            </div>
          </header>
          <main className="container py-6">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
