import { supabase } from '../../lib/supabase';
import { THead, TBody, TH, Table } from '../../components/ui/Table';
import SalesRow from '../../components/sales/SalesRow';
import CreateSalesForm from '../../components/sales/CreateSalesForm';

async function getSales() {
  const { data } = await supabase
    .from('sales')
    .select('*, products:product_id(name), materials:material_id(name)')
    .order('created_at', { ascending: false });
  return data ?? [];
}

async function getRefs() {
  const [products, materials] = await Promise.all([
    supabase.from('products').select('id, name').order('name'),
    supabase.from('materials').select('id, name').order('name'),
  ]);
  return {
    products: products.data ?? [],
    materials: materials.data ?? [],
  };
}

export default async function SalesPage() {
  const [sales, refs] = await Promise.all([getSales(), getRefs()]);
  return (
    <div className="grid gap-6">
      <h2 className="text-lg font-semibold">Cadastro de Vendas</h2>
      <CreateSalesForm refs={refs} />
      <Table>
        <THead>
          <TH>Produto</TH>
          <TH>Material</TH>
          <TH>Preço</TH>
          <TH>QR Code</TH>
          <TH>Status</TH>
          <TH>Ações</TH>
        </THead>
        <TBody>
          {sales.map((s: any) => (
            <SalesRow key={s.id} s={s} refs={refs} />
          ))}
        </TBody>
      </Table>
    </div>
  );
}
