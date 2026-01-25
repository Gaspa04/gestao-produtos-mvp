import { supabase } from '../../lib/supabase';
import { THead, TBody, TH, Table } from '../../components/ui/Table';
import MaterialRow from '../../components/materials/MaterialRow';
import CreateMaterialForm from '../../components/materials/CreateMaterialForm';

async function getMaterials() {
  const { data } = await supabase.from('materials').select('*').order('created_at', { ascending: false });
  return data ?? [];
}

export default async function MaterialsPage() {
  const materials = await getMaterials();
  return (
    <div className="grid gap-6">
      <h2 className="text-lg font-semibold">Cadastro de Materiais</h2>
      <CreateMaterialForm />
      <Table>
        <THead>
          <TH>Nome</TH>
          <TH>Preço</TH>
          <TH>Ações</TH>
        </THead>
        <TBody>
          {materials.map((m: any) => (
            <MaterialRow key={m.id} m={m} />
          ))}
        </TBody>
      </Table>
    </div>
  );
}
