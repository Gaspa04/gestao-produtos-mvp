'use server';
import { revalidatePath } from 'next/cache';
import { supabase } from '../supabase';
import { ProductSchema } from '../validators';

export async function createProduct(formData: FormData) {
  const parsed = ProductSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.errors.map(e => e.message).join('\n'));
  }
  const { data, error } = await supabase.from('products').insert({
    name: parsed.data.name,
    grams: parsed.data.grams,
    manufacturing_time_minutes: parsed.data.manufacturing_time_minutes,
  }).select().single();
  if (error) throw error;
  revalidatePath('/products');
  return data;
}

export async function updateProduct(id: string, formData: FormData) {
  const parsed = ProductSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.errors.map(e => e.message).join('\n'));
  const { error } = await supabase.from('products').update({
    name: parsed.data.name,
    grams: parsed.data.grams,
    manufacturing_time_minutes: parsed.data.manufacturing_time_minutes,
  }).eq('id', id);
  if (error) throw error;
  revalidatePath('/products');
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/products');
}
