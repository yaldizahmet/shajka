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
  title: "Šajka - Coming Soon",
  description: "Makedonya'da hizmet verecek olan şık ve modern butik. Çok yakında, Coming Soon, Наскоро.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} ${prata.variable} antialiased bg-sajka-burgundy text-sajka-light`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
