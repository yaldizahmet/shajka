import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-sajka-burgundy flex flex-col items-center justify-center relative overflow-hidden">
      {/* Arka plan efekti */}
      <div className="absolute inset-0 opacity-10">
        <Image 
          src="/hero_banner.png" 
          alt="Background" 
          fill 
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 fade-in">
        {/* Logo */}
        <div className="mb-12">
          <Image 
            src="/logo.png" 
            alt="Šajka Logo" 
            width={500} 
            height={500} 
            className="object-contain drop-shadow-2xl"
          />
        </div>

        {/* Text in 3 Languages */}
        <div className="space-y-6 text-sajka-gold font-sajka-serif tracking-widest uppercase">
          <h1 className="text-3xl md:text-5xl drop-shadow-md">Наскоро</h1>
          <h2 className="text-2xl md:text-4xl drop-shadow-md opacity-90">Coming Soon</h2>
          <h3 className="text-2xl md:text-4xl drop-shadow-md opacity-80">Çok Yakında</h3>
        </div>

        <div className="mt-16 w-24 h-1 bg-sajka-gold rounded-full opacity-50"></div>
      </div>

      <style>{`
        .fade-in {
          animation: fadeIn 2.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
