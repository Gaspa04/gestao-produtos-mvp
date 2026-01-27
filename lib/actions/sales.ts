'use server';
import { revalidatePath } from 'next/cache';
import { supabase } from '../supabase';
import { SaleSchema } from '../validators';

export async function createSale(formData: FormData) {
  const parsed = SaleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.errors.map(e => e.message).join('\n'));
  const { error } = await supabase.from('sales').insert({
    product_id: parsed.data.product_id,
    material_id: parsed.data.material_id,
    sale_price: parsed.data.sale_price,
    shipping_qr_code: parsed.data.shipping_qr_code,
    status: parsed.data.status,
    customer_name: parsed.data.customer_name,
    customer_cep: parsed.data.customer_cep,
    customer_street: parsed.data.customer_street,
    customer_number: parsed.data.customer_number,
    customer_complement: parsed.data.customer_complement || null,
  });
  if (error) throw error;
  revalidatePath('/sales');
}

export async function updateSale(id: string, formData: FormData) {
  const parsed = SaleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.errors.map(e => e.message).join('\n'));
  const { error } = await supabase.from('sales').update({
    product_id: parsed.data.product_id,
    material_id: parsed.data.material_id,
    sale_price: parsed.data.sale_price,
    shipping_qr_code: parsed.data.shipping_qr_code,
    status: parsed.data.status,
    customer_name: parsed.data.customer_name,
    customer_cep: parsed.data.customer_cep,
    customer_street: parsed.data.customer_street,
    customer_number: parsed.data.customer_number,
    customer_complement: parsed.data.customer_complement || null,
  }).eq('id', id);
  if (error) throw error;
  revalidatePath('/sales');
}

export async function deleteSale(id: string) {
  const { error } = await supabase.from('sales').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/sales');
}
