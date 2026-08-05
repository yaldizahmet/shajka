import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0; // Disable caching for demo purposes

export default async function Home() {
  const { data: mockProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });

  return (
    <div className="flex flex-col min-h-screen bg-sajka-light">
      {/* HERO BANNER */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/hero_banner.png" 
          alt="Šajka Neotenic Boutique Koleksiyonu" 
          fill 
          className="object-cover object-top brightness-[0.6]"
          priority
        />
        <div className="relative z-10 text-center flex flex-col items-center px-4 fade-in">
          <h1 className="text-5xl md:text-7xl font-sajka-serif text-sajka-gold drop-shadow-lg mb-6 tracking-wide">
            Zamansız Zarafet
          </h1>
          <p className="text-xl md:text-2xl font-sajka-sans text-sajka-light max-w-2xl drop-shadow-md mb-10">
            Neotenic dokunuşlarla şekillenen, özgün ve lüks parçaları keşfedin.
          </p>
          <a href="#koleksiyon" className="bg-sajka-gold text-sajka-burgundy px-10 py-4 rounded-full font-sajka-sans font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl">
            Koleksiyonu İncele
          </a>
        </div>
      </section>

      {/* ÖNE ÇIKAN ÜRÜNLER (GRID) */}
      <section id="koleksiyon" className="py-24 px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-sajka-serif text-sajka-burgundy mb-4">Öne Çıkan Ürünler</h2>
          <div className="w-24 h-1 bg-sajka-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {(mockProducts || []).map((product) => (
            <div key={product.id} className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                <Image 
                  src={product.image_url || '/product_blouse.png'} 
                  alt={product.name} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-sajka-burgundy/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href={`/urun/${product.slug}`} className="bg-sajka-light text-sajka-burgundy px-8 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-sajka-gold">
                    İncele
                  </Link>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-xl font-sajka-serif text-sajka-dark mb-2">{product.name}</h3>
                <p className="text-lg font-sajka-sans font-bold text-sajka-burgundy mb-6">{product.price}</p>
                <button className="mt-auto w-full bg-sajka-burgundy text-sajka-gold py-3 rounded-md font-sajka-sans font-semibold hover:bg-sajka-dark hover:shadow-lg transition-all duration-300">
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
