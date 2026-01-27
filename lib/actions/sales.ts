'use server';
import { revalidatePath } from 'next/cache';
import { supabase } from '../supabase';
import { SaleSchema } from '../validators';

export async function createSale(formData: FormData) {
  const parsed = SaleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    // Ainda exigimos product_id e material_id; se faltar, abortamos silenciosamente.
    const pid = formData.get('product_id');
    const mid = formData.get('material_id');
    if (!pid || !mid) return; // evita erro
  }
  const data = parsed.success ? parsed.data : {
    product_id: String(formData.get('product_id')),
    material_id: String(formData.get('material_id')),
    sale_price: Number(formData.get('sale_price') ?? 0),
    shipping_qr_code: String(formData.get('shipping_qr_code') ?? ''),
    status: (formData.get('status') as any) || 'PENDING',
    customer_name: String(formData.get('customer_name') ?? ''),
    customer_cep: String(formData.get('customer_cep') ?? ''),
    customer_street: String(formData.get('customer_street') ?? ''),
    customer_number: String(formData.get('customer_number') ?? ''),
    customer_complement: String(formData.get('customer_complement') ?? ''),
  };

  const { error } = await supabase.from('sales').insert({
    product_id: data.product_id,
    material_id: data.material_id,
    sale_price: data.sale_price ?? 0,
    shipping_qr_code: data.shipping_qr_code ?? '',
    status: data.status ?? 'PENDING',
    customer_name: data.customer_name ?? '',
    customer_cep: data.customer_cep ?? '',
    customer_street: data.customer_street ?? '',
    customer_number: data.customer_number ?? '',
    customer_complement: data.customer_complement || null,
  });
  if (error) throw error;
  revalidatePath('/sales');
}

export async function updateSale(id: string, formData: FormData) {
  const parsed = SaleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const pid = formData.get('product_id');
    const mid = formData.get('material_id');
    if (!pid || !mid) return;
  }
  const data = parsed.success ? parsed.data : {
    product_id: String(formData.get('product_id')),
    material_id: String(formData.get('material_id')),
    sale_price: Number(formData.get('sale_price') ?? 0),
    shipping_qr_code: String(formData.get('shipping_qr_code') ?? ''),
    status: (formData.get('status') as any) || 'PENDING',
    customer_name: String(formData.get('customer_name') ?? ''),
    customer_cep: String(formData.get('customer_cep') ?? ''),
    customer_street: String(formData.get('customer_street') ?? ''),
    customer_number: String(formData.get('customer_number') ?? ''),
    customer_complement: String(formData.get('customer_complement') ?? ''),
  };

  const { error } = await supabase.from('sales').update({
    product_id: data.product_id,
    material_id: data.material_id,
    sale_price: data.sale_price ?? 0,
    shipping_qr_code: data.shipping_qr_code ?? '',
    status: data.status ?? 'PENDING',
    customer_name: data.customer_name ?? '',
    customer_cep: data.customer_cep ?? '',
    customer_street: data.customer_street ?? '',
    customer_number: data.customer_number ?? '',
    customer_complement: data.customer_complement || null,
  }).eq('id', id);
  if (error) throw error;
  revalidatePath('/sales');
}

export async function deleteSale(id: string) {
  const { error } = await supabase.from('sales').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/sales');
}
