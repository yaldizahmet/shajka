import { Inter, Prata } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sajka-sans",
  subsets: ["latin"],
});

const prata = Prata({
  variable: "--font-sajka-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Šajka - Neotenic Boutique",
  description: "Makedonya'da hizmet veren şık ve modern butik",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} ${prata.variable} antialiased bg-sajka-light text-sajka-dark`}
      >
        <header className="bg-sajka-burgundy py-4 px-8 flex items-center justify-between shadow-lg border-b-4 border-sajka-gold/50">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Šajka Logo" className="h-16 w-auto object-contain" />
            <span className="text-sajka-gold text-2xl font-sajka-serif tracking-widest hidden sm:block">Šajka</span>
          </div>
          <nav>
            <ul className="flex gap-6 text-sajka-gold font-sajka-sans font-medium">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Ana Sayfa</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Koleksiyon</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">İletişim</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
