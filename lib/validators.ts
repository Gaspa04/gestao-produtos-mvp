import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().trim().optional().default(''),
  grams: z.coerce.number().int().min(0).optional().default(0),
  manufacturing_time_minutes: z.coerce.number().int().min(0).optional().default(0),
});

export const MaterialSchema = z.object({
  name: z.string().trim().optional().default(''),
  price_per_kg: z.coerce.number().min(0).optional().default(0),
});

export const SaleSchema = z.object({
  product_id: z.string().uuid('Produto inválido'),
  material_id: z.string().uuid('Material inválido'),
  sale_price: z.coerce.number().min(0).optional().default(0),
  shipping_qr_code: z.string().trim().optional().default(''),
  status: z.enum(['PENDING', 'DELIVERED']).optional().default('PENDING'),
  customer_name: z.string().trim().optional().default(''),
  customer_cep: z.string().trim().optional().default(''),
  customer_street: z.string().trim().optional().default(''),
  customer_number: z.string().trim().optional().default(''),
  customer_complement: z.string().optional().default(''),
});

export type ProductInput = z.infer<typeof ProductSchema>;
export type MaterialInput = z.infer<typeof MaterialSchema>;
export type SaleInput = z.infer<typeof SaleSchema>;
