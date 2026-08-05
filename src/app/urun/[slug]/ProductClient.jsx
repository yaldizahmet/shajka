"use client";

import { useState } from "react";

export default function ProductClient({ product, variants }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const selectedVariant = variants.find(v => v.size === selectedSize);
  const isOutOfStock = selectedSize && selectedVariant?.stock === 0;

  return (
    <div className="fade-in">
      <h1 className="text-4xl md:text-5xl font-sajka-serif text-sajka-burgundy mb-4">
        {product.name}
      </h1>
      <p className="text-2xl font-sajka-sans font-bold text-sajka-gold mb-8">
        {product.price} MKD
      </p>
      
      <p className="text-gray-700 font-sajka-sans text-lg mb-10 leading-relaxed">
        {product.description}
      </p>

      {/* Beden Seçimi */}
      <div className="mb-10">
        <h3 className="text-lg font-sajka-sans font-semibold text-sajka-dark mb-4">
          Beden Seçin
        </h3>
        <div className="flex gap-4 flex-wrap">
          {variants.map((variant) => {
            const isSelected = selectedSize === variant.size;
            const isExhausted = variant.stock === 0;
            return (
              <button 
                key={variant.id}
                onClick={() => setSelectedSize(variant.size)}
                className={`
                  w-14 h-14 rounded-full flex items-center justify-center font-sajka-sans font-bold text-lg border-2 transition-all duration-300
                  ${isSelected ? "bg-sajka-burgundy text-sajka-gold border-sajka-burgundy shadow-lg scale-110" : "bg-transparent text-sajka-dark border-gray-300 hover:border-sajka-burgundy"}
                  ${isExhausted && !isSelected ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                {variant.size}
              </button>
            );
          })}
        </div>
        
        {/* Stok Durumu Mesajı */}
        {selectedSize && (
          <p className={`mt-4 font-sajka-sans font-medium text-sm ${isOutOfStock ? "text-red-500" : "text-green-600"}`}>
            {isOutOfStock ? "Üzgünüz, bu beden stoklarımızda tükenmiştir." : `Stokta ${selectedVariant.stock} adet var.`}
          </p>
        )}
      </div>

      {/* Sepete Ekle Butonu */}
      <button 
        disabled={!selectedSize || isOutOfStock}
        className={`
          w-full py-5 rounded-full font-sajka-sans font-bold text-xl transition-all duration-300 shadow-xl
          ${!selectedSize || isOutOfStock 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : "bg-sajka-gold text-sajka-burgundy hover:bg-sajka-burgundy hover:text-sajka-light"}
        `}
      >
        {!selectedSize ? "BEDEN SEÇİNİZ" : isOutOfStock ? "STOKTA YOK" : "SEPETE EKLE"}
      </button>

      <style>{`
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
