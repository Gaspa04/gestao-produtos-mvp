import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import { Icons } from '../components/ui/Icons';
import { RefreshButton } from '../components/dashboard/RefreshButton';

export const dynamic = 'force-dynamic';

async function getDashboard() {
  const salesRes = await supabase
    .from('sales')
    .select('id, sale_price, status, products:product_id(grams, manufacturing_time_minutes), materials:material_id(price_per_kg)');

  const sales = salesRes.data ?? [];

  let totalProfit = 0;
  let deliveredCount = 0;
  let pendingCount = 0;

  for (const s of sales as any[]) {
    const grams = s.products?.grams ?? 0;
    const pricePerKg = s.materials?.price_per_kg ?? 0;
    const costMaterial = (grams / 1000) * Number(pricePerKg);
    const profit = Number(s.sale_price) - costMaterial;
    if (s.status === 'DELIVERED') {
      deliveredCount++;
      totalProfit += profit;
    }
    if (s.status === 'PENDING') pendingCount++;
  }

  const pendingPrint = await supabase.rpc('pending_print_minutes');
  const totalPendingMinutes = Number(pendingPrint.data ?? 0);
  const totalPendingHours = totalPendingMinutes / 60;

  return { totalProfit, deliveredCount, pendingCount, totalPendingMinutes, totalPendingHours };
}

export default async function DashboardPage() {
  const { totalProfit, deliveredCount, pendingCount, totalPendingMinutes, totalPendingHours } = await getDashboard();
  return (
    <div className="grid gap-4">
      <div className="flex justify-end">
        <RefreshButton />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card title="Lucro total" icon={<Icons.DollarSign className="h-5 w-5 text-green-600" />} value={`R$ ${totalProfit.toFixed(2)}`} />
        <Card title="Entregues" icon={<Icons.CheckCircle2 className="h-5 w-5 text-emerald-600" />} value={deliveredCount} />
        <Card title="Pendentes" variant="warning" icon={<Icons.AlertTriangle className="h-5 w-5 text-yellow-600" />} value={pendingCount} />
        <Card title="Tempo de impressão pendente" icon={<Icons.Clock className="h-5 w-5 text-blue-600" />} value={`${totalPendingHours.toFixed(2)} h`} subtext={`${totalPendingMinutes} min`} />
      </div>
    </div>
  );
}
