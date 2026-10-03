import type { Metadata } from "next";
import { Anton, Manrope } from "next/font/google";
import "./globals.css";
import { STORE_CONFIG as S } from "@/lib/config";
import CartProvider from "@/components/CartProvider";
import CartDrawer, { StickyBag } from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import { AnnouncementBar, Navbar, Footer } from "@/components/Site";
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const desc = "Affordable streetwear. Loud ideas. Printed for you.";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://threadr.vercel.app"),
  title: { default: `${S.brandName} — ${S.tagline}`, template: `%s — ${S.brandName}` },
  description: desc,
  openGraph: { title: `${S.brandName} — ${S.tagline}`, description: desc, type: "website", siteName: S.brandName },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${manrope.variable}`}>
      <body>
        <CartProvider>
          <AnnouncementBar /><Navbar />
          <main>{children}</main>
          <Footer /><CartDrawer /><CheckoutModal /><StickyBag />
        </CartProvider>
      </body>
    </html>
  );
}
