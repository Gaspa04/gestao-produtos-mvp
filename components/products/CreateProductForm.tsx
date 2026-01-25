"use client";
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useToast } from '../ui/Toast';
import { createProduct } from '../../lib/actions/products';

export default function CreateProductForm() {
  const { show } = useToast();
  return (
    <form action={async (fd) => { await createProduct(fd); show('Produto criado'); }} className="grid gap-3 md:grid-cols-3">
      <Input name="name" label="Nome" />
      <Input name="grams" label="Gramas" type="number" />
      <Input name="manufacturing_time_minutes" label="Tempo de fabricação (min)" type="number" />
      <div className="md:col-span-3"><Button type="submit">Criar Produto</Button></div>
    </form>
  );
}
