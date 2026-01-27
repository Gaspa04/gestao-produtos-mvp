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
  const [openDetail, setOpenDetail] = useState(false);
  const { show } = useToast();
  const fullAddress = `${s.customer_street}, ${s.customer_number}${s.customer_complement ? ' ' + s.customer_complement : ''} - ${s.customer_cep}`;
  
  return (
    <>
      <tr>
        <TD>{s.products?.name}</TD>
        <TD>{s.materials?.name}</TD>
        <TD>R$ {Number(s.sale_price).toFixed(2)}</TD>
        <TD>{s.shipping_qr_code}</TD>
        <TD>
          <button 
            onClick={() => setOpenDetail(true)}
            className="px-2 py-1 rounded text-sm font-medium cursor-pointer"
            style={{
              backgroundColor: s.status === 'PENDING' ? '#fef08a' : '#dcfce7',
              color: s.status === 'PENDING' ? '#992700' : '#166534'
            }}
          >
            {s.status === 'PENDING' ? '⏳ PENDENTE' : '✓ ENTREGUE'}
          </button>
        </TD>
        <TD className="flex gap-2">
          <Button variant="secondary" onClick={() => setOpen(true)}>Editar</Button>
          <form action={async () => { await deleteSale(s.id); show('Venda excluída'); }}>
            <Button variant="danger" type="submit">Excluir</Button>
          </form>
        </TD>
      </tr>

      {/* Modal de detalhes */}
      <Modal open={openDetail} onClose={() => setOpenDetail(false)} title={`Detalhes da Venda - ${s.products?.name}`}>
        <div className="grid gap-3 text-sm">
          <div><strong>Cliente:</strong> {s.customer_name}</div>
          <div><strong>Endereço:</strong> {fullAddress}</div>
          <div><strong>Material:</strong> {s.materials?.name}</div>
          <div><strong>Preço:</strong> R$ {Number(s.sale_price).toFixed(2)}</div>
          <div><strong>QR Code:</strong> {s.shipping_qr_code}</div>
          <div><strong>Status:</strong> {s.status === 'PENDING' ? '⏳ Pendente' : '✓ Entregue'}</div>
        </div>
      </Modal>

      {/* Modal de edição */}
      <Modal open={open} onClose={() => setOpen(false)} title="Editar Venda">
        <form action={async (fd) => { await updateSale(s.id, fd); show('Venda atualizada'); setOpen(false); }} className="grid gap-3">
          <Select name="product_id" label="Produto" options={refs.products.map(p => ({ value: p.id, label: p.name }))} defaultValue={s.product_id} />
          <Select name="material_id" label="Material" options={refs.materials.map(m => ({ value: m.id, label: m.name }))} defaultValue={s.material_id} />
          <Input name="sale_price" label="Preço de venda" type="number" step="0.01" defaultValue={s.sale_price} />
          <Input name="shipping_qr_code" label="QR Code Correios" defaultValue={s.shipping_qr_code} />
          <Input name="customer_name" label="Nome do cliente" defaultValue={s.customer_name} />
          <Input name="customer_cep" label="CEP" defaultValue={s.customer_cep} />
          <Input name="customer_street" label="Rua" defaultValue={s.customer_street} />
          <Input name="customer_number" label="Número" defaultValue={s.customer_number} />
          <Input name="customer_complement" label="Complemento" defaultValue={s.customer_complement || ''} />
          <Select name="status" label="Status" options={[{ value: 'PENDING', label: 'PENDENTE' }, { value: 'DELIVERED', label: 'ENTREGUE' }]} defaultValue={s.status} />
          <div className="flex justify-end"><Button type="submit">Salvar</Button></div>
        </form>
      </Modal>
    </>
  );
}
