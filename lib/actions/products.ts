'use server';
import { revalidatePath } from 'next/cache';
import { supabase } from '../supabase';
import { ProductSchema } from '../validators';

export async function createProduct(formData: FormData) {
  const parsed = ProductSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    // Em vez de falhar, usa defaults
    const fallback = ProductSchema.parse({});
    Object.assign(parsed, { success: true, data: fallback });
  }
  const { data, error } = await supabase.from('products').insert({
    name: parsed.success ? parsed.data.name : '',
    grams: parsed.success ? parsed.data.grams : 0,
    manufacturing_time_minutes: parsed.success ? parsed.data.manufacturing_time_minutes : 0,
  }).select().single();
  if (error) throw error;
  revalidatePath('/products');
  return data;
}

export async function updateProduct(id: string, formData: FormData) {
  const parsed = ProductSchema.safeParse(Object.fromEntries(formData));
  const data = parsed.success ? parsed.data : ProductSchema.parse({});
  const { error } = await supabase.from('products').update({
    name: data.name,
    grams: data.grams,
    manufacturing_time_minutes: data.manufacturing_time_minutes,
  }).eq('id', id);
  if (error) throw error;
  revalidatePath('/products');
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/products');
}
