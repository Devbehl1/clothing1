import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { bySlug, discount, products } from "@/lib/products";
import { inr } from "@/lib/whatsapp";
import Buy from "./Buy";
type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return p ? { title: p.name, description: p.description, openGraph: { title: p.name, description: p.description, images: [p.images[0]] } } : {};
}
export default async function ProductPage({ params }: Props) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  const acc = [["Description", p.description], ["Fit & size", "Oversized and boxy cuts run roomy. Between sizes? Size down for a regular fit. Check the size guide."], ["Print details", "Water-based screen print. Soft feel, strong colour, built to survive repeated washes."], ["Care", "Machine wash cold, inside out. Do not bleach. Dry in shade. Iron on reverse."]];
  const ld = { "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, image: p.images, offers: { "@type": "Offer", priceCurrency: "INR", price: p.price, availability: "https://schema.org/InStock" } };
  return (
    <div className="mx-auto grid max-w-[1500px] gap-8 px-0 py-0 md:grid-cols-[1.3fr_1fr] md:px-8 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-2 md:gap-3 md:overflow-visible">
        {p.images.map((src, i) => <div key={src} className={`relative aspect-[4/5] w-full shrink-0 snap-center bg-black/5 ${i === 0 ? "md:col-span-2" : ""}`}><Image src={src} alt={`${p.name} view ${i + 1}`} fill priority={i === 0} sizes="(min-width:768px) 45vw, 100vw" className="object-cover" /></div>)}
      </div>
      <div className="px-4 pb-24 md:sticky md:top-24 md:self-start md:px-0 md:pb-0">
        <h1 className="font-display text-5xl uppercase leading-none md:text-7xl">{p.name}</h1>
        <p className="mt-4 flex items-baseline gap-3 text-2xl font-extrabold">{inr(p.price)} <s className="text-base font-normal opacity-50">{inr(p.mrp)}</s> <span className="bg-acc px-2 py-0.5 text-sm text-white">{discount(p)}% OFF</span></p>
        <p className="my-5 max-w-md">{p.description}</p>
        <Buy p={p} />
        <div className="mt-8 border-t border-black">{acc.map(([t, d]) => <details key={t} className="group border-b border-black py-4"><summary className="flex cursor-pointer list-none justify-between font-bold uppercase tracking-widest">{t}<span className="transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-md text-sm">{d}</p></details>)}</div>
      </div>
    </div>
  );
}
