import { supabase } from '../../lib/supabase';
import { THead, TBody, TH, Table } from '../../components/ui/Table';
import ProductRow from '../../components/products/ProductRow';
import CreateProductForm from '../../components/products/CreateProductForm';

async function getProducts() {
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  return data ?? [];
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="grid gap-6">
      <h2 className="text-lg font-semibold">Cadastro de Produtos</h2>
      <CreateProductForm />
      <Table>
        <THead>
          <TH>Nome</TH>
          <TH>Gramas</TH>
          <TH>Tempo (min)</TH>
          <TH>Ações</TH>
        </THead>
        <TBody>
          {products.map((p: any) => (
            <ProductRow key={p.id} p={p} />
          ))}
        </TBody>
      </Table>
    </div>
  );
}
