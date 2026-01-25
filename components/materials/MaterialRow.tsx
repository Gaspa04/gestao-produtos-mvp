"use client";
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';
import { deleteMaterial, updateMaterial } from '../../lib/actions/materials';
import { TD } from '../ui/Table';
import { useState } from 'react';

export default function MaterialRow({ m }: { m: any }) {
  const [open, setOpen] = useState(false);
  const { show } = useToast();
  return (
    <tr>
      <TD>{m.name}</TD>
      <TD>R$ {Number(m.price_per_kg).toFixed(2)} / kg</TD>
      <TD className="flex gap-2">
        <Button variant="secondary" onClick={() => setOpen(true)}>Editar</Button>
        <form action={async () => { await deleteMaterial(m.id); show('Material excluído'); }}>
          <Button variant="danger" type="submit">Excluir</Button>
        </form>
        <Modal open={open} onClose={() => setOpen(false)} title="Editar Material">
          <form action={async (fd) => { await updateMaterial(m.id, fd); show('Material atualizado'); setOpen(false); }} className="grid gap-3">
            <Input name="name" label="Nome" defaultValue={m.name} />
            <Input name="price_per_kg" label="Preço por KG" type="number" step="0.01" defaultValue={m.price_per_kg} />
            <div className="flex justify-end"><Button type="submit">Salvar</Button></div>
          </form>
        </Modal>
      </TD>
    </tr>
  );
}
