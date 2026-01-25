# MVP Gestão de Produtos, Materiais e Vendas

Stack: Next.js (App Router) + TypeScript, Supabase (Postgres), Tailwind CSS.

Auth: opcional; este MVP não usa Auth (single-user). RLS está desativado nas tabelas para permitir uso com a `anon` key.

Decisões:
- Lucro total considera apenas vendas `DELIVERED`.
- Tempo total de impressão pendente (horas) calcula a soma de `products.manufacturing_time_minutes` das vendas `PENDING` via função SQL `pending_print_minutes()` e faz a conversão de minutos → horas no frontend.

## Rodar localmente

1. Crie um projeto no Supabase e rode o SQL em `sql/schema.sql` (opcional `sql/seed.sql`).
2. Copie `.env.local.example` para `.env.local` e preencha as variáveis.
3. Instale dependências e rode o dev server:

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Deploy na Vercel (passo a passo)

1. Suba o repositório para GitHub.
2. No Vercel, crie um novo projeto importando o repo.
3. Em Settings → Environment Variables, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Configure o Supabase com o SQL de `sql/schema.sql` e (opcional) `sql/seed.sql`.
5. Deploy. A aplicação estará disponível no domínio da Vercel.

## Estrutura de pastas

```
app/
  layout.tsx
  page.tsx
  products/page.tsx
  materials/page.tsx
  sales/page.tsx
components/ui/
  Button.tsx
  Input.tsx
  Select.tsx
  Table.tsx
  Modal.tsx
  Toast.tsx
  Card.tsx
  Icons.tsx
lib/
  supabase.ts
  validators.ts
  actions/
    products.ts
    materials.ts
    sales.ts
styles/
  globals.css
sql/
  schema.sql
  seed.sql
```

## Checklist do Dashboard

- ✅ Lucro total (apenas DELIVERED)
- ✅ Quantidade de vendas entregues
- ✅ Quantidade de vendas pendentes (com aviso visual)
- ✅ Tempo total de impressão pendente (em horas + minutos)
