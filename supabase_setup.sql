-- 1. Create Products Table
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  price numeric NOT NULL,
  description text,
  image_url text NOT NULL
);

-- 2. Create Product Variants Table (Sizes, Stock)
CREATE TABLE product_variants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  size text NOT NULL, -- e.g., 'S', 'M', 'L'
  stock integer NOT NULL DEFAULT 0,
  UNIQUE(product_id, size)
);

-- 3. Enable RLS (Row Level Security) so anon can read
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on product_variants" ON product_variants FOR SELECT USING (true);

-- 4. Insert Dummy Data (The 4 products from the homepage)
INSERT INTO products (id, name, slug, price, description, image_url) VALUES
('11111111-1111-1111-1111-111111111111', 'Neotenic İpek Bluz', 'neotenic-ipek-bluz', 3500, 'Zarif neotenic tasarıma sahip, dökümlü ve yumuşak dokulu ipek bluz.', '/product_blouse.png'),
('22222222-2222-2222-2222-222222222222', 'Klasik Mürdüm Elbise', 'klasik-murdum-elbise', 5200, 'Zamansız bir şıklık sunan, vücuda oturan lüks mürdüm rengi elbise.', '/product_blouse.png'),
('33333333-3333-3333-3333-333333333333', 'Zarif Altın Detaylı Ceket', 'zarif-altin-detayli-ceket', 7800, 'Altın rengi metal düğme ve detaylarla zenginleştirilmiş özel tasarım ceket.', '/product_blouse.png'),
('44444444-4444-4444-4444-444444444444', 'Premium Deri Çanta', 'premium-deri-canta', 8900, 'Günlük kullanım ve şık davetler için tasarlanmış gerçek deri çanta.', '/product_blouse.png');

-- 5. Insert Dummy Variants (Sizes and Stocks)
-- Product 1: Neotenic İpek Bluz (All in stock)
INSERT INTO product_variants (product_id, size, stock) VALUES
('11111111-1111-1111-1111-111111111111', 'S', 5),
('11111111-1111-1111-1111-111111111111', 'M', 10),
('11111111-1111-1111-1111-111111111111', 'L', 2);

-- Product 2: Klasik Mürdüm Elbise (Size M is out of stock!)
INSERT INTO product_variants (product_id, size, stock) VALUES
('22222222-2222-2222-2222-222222222222', 'S', 3),
('22222222-2222-2222-2222-222222222222', 'M', 0),
('22222222-2222-2222-2222-222222222222', 'L', 1);

-- Product 3: Zarif Altın Detaylı Ceket (Only Size M available)
INSERT INTO product_variants (product_id, size, stock) VALUES
('33333333-3333-3333-3333-333333333333', 'S', 0),
('33333333-3333-3333-3333-333333333333', 'M', 4),
('33333333-3333-3333-3333-333333333333', 'L', 0);

-- Product 4: Premium Deri Çanta (One size, in stock)
INSERT INTO product_variants (product_id, size, stock) VALUES
('44444444-4444-4444-4444-444444444444', 'Standart', 7);
