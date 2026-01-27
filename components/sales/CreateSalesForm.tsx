"use client";
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useToast } from '../ui/Toast';
import { createSale } from '../../lib/actions/sales';

export default function CreateSalesForm({ refs }: { refs: { products: any[]; materials: any[] } }) {
  const { show } = useToast();
  return (
    <form action={async (fd) => { await createSale(fd); show('Venda criada'); }} className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Select name="product_id" label="Produto" options={refs.products.map(p => ({ value: p.id, label: p.name }))} />
      <Select name="material_id" label="Material" options={refs.materials.map(m => ({ value: m.id, label: m.name }))} />
      <Input name="sale_price" label="Preço de venda" type="number" step="0.01" />
      <Input name="shipping_qr_code" label="QR Code Correios" />
      <Select name="status" label="Status" options={[{ value: 'PENDING', label: 'PENDENTE' }, { value: 'DELIVERED', label: 'ENTREGUE' }]} />
      
      <Input name="customer_name" label="Nome do cliente" />
      <Input name="customer_cep" label="CEP" placeholder="00000-000" />
      <Input name="customer_street" label="Rua" />
      <Input name="customer_number" label="Número" />
      <Input name="customer_complement" label="Complemento (opcional)" />
      
      <div className="lg:col-span-3"><Button type="submit">Criar Venda</Button></div>
    </form>
  );
}
