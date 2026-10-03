import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
export const metadata: Metadata = { title: "Shop", description: "Oversized tees, printed tees and hoodies. Affordable streetwear, printed in India." };
export default function Shop() {
  return <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-8"><h1 className="mb-8 font-display text-[22vw] leading-[.85] md:text-[11vw]">SHOP</h1><ProductGrid /></div>;
}
