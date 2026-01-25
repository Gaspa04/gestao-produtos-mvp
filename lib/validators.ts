import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  grams: z.coerce.number().int().positive('Gramas deve ser > 0'),
  manufacturing_time_minutes: z.coerce.number().int().positive('Tempo de fabricação deve ser > 0'),
});

export const MaterialSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price_per_kg: z.coerce.number().nonnegative('Preço por KG deve ser >= 0'),
});

export const SaleSchema = z.object({
  product_id: z.string().uuid('Produto inválido'),
  material_id: z.string().uuid('Material inválido'),
  sale_price: z.coerce.number().nonnegative('Preço de venda deve ser >= 0'),
  shipping_qr_code: z.string().min(1, 'QR Code é obrigatório'),
  status: z.enum(['PENDING', 'DELIVERED']),
});

export type ProductInput = z.infer<typeof ProductSchema>;
export type MaterialInput = z.infer<typeof MaterialSchema>;
export type SaleInput = z.infer<typeof SaleSchema>;
