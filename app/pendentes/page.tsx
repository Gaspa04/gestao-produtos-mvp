import { supabase } from '../../lib/supabase';
import { THead, TBody, TH, TD, Table } from '../../components/ui/Table';

async function getPendingSales() {
  const { data } = await supabase
    .from('sales')
    .select('*, products:product_id(name, manufacturing_time_minutes), materials:material_id(name)')
    .eq('status', 'PENDING')
    .order('created_at', { ascending: true });
  return data ?? [];
}

export default async function PendentesPage() {
  const sales = await getPendingSales();
  const totalTime = sales.reduce((sum, s) => sum + (s.products?.manufacturing_time_minutes ?? 0), 0);
  const totalHours = totalTime / 60;

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-lg font-semibold">Vendas Pendentes</h2>
        <p className="text-gray-600 text-sm mt-1">Total: {sales.length} venda(s) | Tempo: {totalHours.toFixed(2)}h ({totalTime}min)</p>
      </div>

      <Table>
        <THead>
          <TH>Produto</TH>
          <TH>Cliente</TH>
          <TH>Endereço</TH>
          <TH>Material</TH>
          <TH>Tempo (min)</TH>
          <TH>QR Code</TH>
        </THead>
        <TBody>
          {sales.map((s: any) => (
            <tr key={s.id}>
              <TD>{s.products?.name}</TD>
              <TD>{s.customer_name}</TD>
              <TD className="text-xs">
                {s.customer_street}, {s.customer_number}
                {s.customer_complement && <div>{s.customer_complement}</div>}
                <div className="text-gray-500">{s.customer_cep}</div>
              </TD>
              <TD>{s.materials?.name}</TD>
              <TD><strong>{s.products?.manufacturing_time_minutes}</strong></TD>
              <TD className="font-mono text-xs">{s.shipping_qr_code}</TD>
            </tr>
          ))}
        </TBody>
      </Table>

      {sales.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhuma venda pendente! ✓
        </div>
      )}
    </div>
  );
}
