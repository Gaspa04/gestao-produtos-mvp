-- Exemplo de dados
with new_products as (
  insert into products (name, grams, manufacturing_time_minutes) values
  ('Produto A', 250, 120),
  ('Produto B', 500, 300),
  ('Produto C', 1000, 600)
  returning *
), new_materials as (
  insert into materials (name, price_per_kg) values
  ('PLA', 70.00),
  ('ABS', 85.50)
  returning *
)
insert into sales (product_id, material_id, sale_price, shipping_qr_code, status)
select p.id, m.id, s.sale_price, s.shipping_qr_code, s.status::sales_status
from (
  values
    ((select id from new_products where name = 'Produto A'), (select id from new_materials where name = 'PLA'), 120.00, 'QR123', 'DELIVERED'),
    ((select id from new_products where name = 'Produto B'), (select id from new_materials where name = 'ABS'), 250.00, 'QR456', 'PENDING'),
    ((select id from new_products where name = 'Produto C'), (select id from new_materials where name = 'PLA'), 500.00, 'QR789', 'PENDING')
) as s(product_id, material_id, sale_price, shipping_qr_code, status)
join new_products p on p.id = s.product_id
join new_materials m on m.id = s.material_id;
