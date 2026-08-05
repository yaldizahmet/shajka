import { supabase } from "@/lib/supabase";
import Image from "next/image";
import ProductClient from "./ProductClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', slug)
    .single();
    
  if (!product) return { title: 'Ürün Bulunamadı' };
  return { title: `${product.name} - Šajka Neotenic Boutique`, description: product.description };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !product) {
    return notFound();
  }

  const { data: variants } = await supabase
    .from('product_variants')
    .select('*')
    .eq('product_id', product.id)
    .order('size', { ascending: true }); 

  return (
    <div className="min-h-[calc(100vh-100px)] bg-sajka-light py-20 px-8 flex items-center">
      <div className="max-w-6xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100 min-h-[600px]">
        
        {/* Sol Taraf - Resim */}
        <div className="w-full md:w-1/2 relative bg-gray-50 min-h-[400px] md:min-h-full">
          <Image 
            src={product.image_url} 
            alt={product.name} 
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Sağ Taraf - Detaylar (Client Component) */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <ProductClient product={product} variants={variants || []} />
        </div>
      </div>
    </div>
  );
}
