# Fashion Supabase Update

You do not need a new table for fashion. The existing `products.category` column is `text`, so it already accepts new fashion category slugs.

Run this optional SQL once to document the accepted slugs inside Supabase and refresh the API schema cache:

```sql
comment on column products.category is
'NexDeal category slug. Examples: earbuds, headphones, mobiles, laptops, smartwatches, gaming, men-shirts, men-tshirts, men-jeans, men-shoes, men-watches, women-dresses, women-kurtis, women-tops, women-footwear, women-bags.';

notify pgrst, 'reload schema';
```

Optional sample fashion product insert:

```sql
insert into products (
  name,
  description,
  price,
  original_price,
  discount,
  image,
  category,
  store,
  affiliate_link,
  rating,
  reviews,
  is_new,
  is_featured
) values (
  'Oxford Cotton Slim Fit Shirt',
  'Breathable cotton shirt for office and weekend styling',
  1299,
  2499,
  48,
  'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=700&fit=crop',
  'men-shirts',
  'myntra',
  'https://www.myntra.com/shirts?utm_source=nexdeal',
  4.3,
  2870,
  true,
  true
);
```

For normal maintenance, add products from `/admin` instead of SQL.
