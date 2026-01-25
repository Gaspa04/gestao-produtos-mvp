"use client";
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';
import { deleteProduct, updateProduct } from '../../lib/actions/products';
import { TD } from '../ui/Table';
import { useState } from 'react';

export default function ProductRow({ p }: { p: any }) {
  const [open, setOpen] = useState(false);
  const { show } = useToast();
  return (
    <tr>
      <TD>{p.name}</TD>
      <TD>{p.grams} g</TD>
      <TD>{p.manufacturing_time_minutes} min</TD>
      <TD className="flex gap-2">
        <Button variant="secondary" onClick={() => setOpen(true)}>Editar</Button>
        <form action={async () => { await deleteProduct(p.id); show('Produto excluído'); }}>
          <Button variant="danger" type="submit">Excluir</Button>
        </form>
        <Modal open={open} onClose={() => setOpen(false)} title="Editar Produto">
          <form action={async (fd) => { await updateProduct(p.id, fd); show('Produto atualizado'); setOpen(false); }} className="grid gap-3">
            <Input name="name" label="Nome" defaultValue={p.name} />
            <Input name="grams" label="Gramas" type="number" defaultValue={p.grams} />
            <Input name="manufacturing_time_minutes" label="Tempo de fabricação (min)" type="number" defaultValue={p.manufacturing_time_minutes} />
            <div className="flex justify-end"><Button type="submit">Salvar</Button></div>
          </form>
        </Modal>
      </TD>
    </tr>
  );
}
