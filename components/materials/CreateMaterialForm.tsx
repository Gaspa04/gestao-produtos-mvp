"use client";
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useToast } from '../ui/Toast';
import { createMaterial } from '../../lib/actions/materials';

export default function CreateMaterialForm() {
  const { show } = useToast();
  return (
    <form action={async (fd) => { await createMaterial(fd); show('Material criado'); }} className="grid gap-3 md:grid-cols-3">
      <Input name="name" label="Nome" />
      <Input name="price_per_kg" label="Preço por KG" type="number" step="0.01" />
      <div className="md:col-span-3"><Button type="submit">Criar Material</Button></div>
    </form>
  );
}
