'use server';
import { revalidatePath } from 'next/cache';
import { supabase } from '../supabase';
import { MaterialSchema } from '../validators';

export async function createMaterial(formData: FormData) {
  const parsed = MaterialSchema.safeParse(Object.fromEntries(formData));
  const data = parsed.success ? parsed.data : MaterialSchema.parse({});
  const { error } = await supabase.from('materials').insert({
    name: data.name,
    price_per_kg: data.price_per_kg,
  });
  if (error) throw error;
  revalidatePath('/materials');
}

export async function updateMaterial(id: string, formData: FormData) {
  const parsed = MaterialSchema.safeParse(Object.fromEntries(formData));
  const data = parsed.success ? parsed.data : MaterialSchema.parse({});
  const { error } = await supabase.from('materials').update({
    name: data.name,
    price_per_kg: data.price_per_kg,
  }).eq('id', id);
  if (error) throw error;
  revalidatePath('/materials');
}

export async function deleteMaterial(id: string) {
  const { error } = await supabase.from('materials').delete().eq('id', id);
  if (error) throw error;
  revalidatePath('/materials');
}
