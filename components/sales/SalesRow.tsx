"use client";
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';
import { deleteSale, updateSale } from '../../lib/actions/sales';
import { TD } from '../ui/Table';
import { useState } from 'react';

export default function SalesRow({ s, refs }: { s: any; refs: { products: any[]; materials: any[] } }) {
  const [open, setOpen] = useState(false);
  const { show } = useToast();
  return (
    <tr>
      <TD>{s.products?.name}</TD>
      <TD>{s.materials?.name}</TD>
      <TD>R$ {Number(s.sale_price).toFixed(2)}</TD>
      <TD>{s.shipping_qr_code}</TD>
      <TD>{s.status}</TD>
      <TD className="flex gap-2">
        <Button variant="secondary" onClick={() => setOpen(true)}>Editar</Button>
        <form action={async () => { await deleteSale(s.id); show('Venda excluída'); }}>
          <Button variant="danger" type="submit">Excluir</Button>
        </form>
        <Modal open={open} onClose={() => setOpen(false)} title="Editar Venda">
          <form action={async (fd) => { await updateSale(s.id, fd); show('Venda atualizada'); setOpen(false); }} className="grid gap-3">
            <Select name="product_id" label="Produto" options={refs.products.map(p => ({ value: p.id, label: p.name }))} defaultValue={s.product_id} />
            <Select name="material_id" label="Material" options={refs.materials.map(m => ({ value: m.id, label: m.name }))} defaultValue={s.material_id} />
            <Input name="sale_price" label="Preço de venda" type="number" step="0.01" defaultValue={s.sale_price} />
            <Input name="shipping_qr_code" label="QR Code Correios" defaultValue={s.shipping_qr_code} />
            <Select name="status" label="Status" options={[{ value: 'PENDING', label: 'PENDENTE' }, { value: 'DELIVERED', label: 'ENTREGUE' }]} defaultValue={s.status} />
            <div className="flex justify-end"><Button type="submit">Salvar</Button></div>
          </form>
        </Modal>
      </TD>
    </tr>
  );
}
