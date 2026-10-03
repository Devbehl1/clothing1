import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { Marquee } from "@/components/Site";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import EditorialSection from "@/components/EditorialSection";
import CustomPrintSection from "@/components/CustomPrintSection";
const why = [["PREMIUM PRINTS", "Quality printing designed to last."], ["GEN-Z PRICES", "Good clothes shouldn't destroy your wallet."], ["MADE FOR YOU", "From ready-to-wear drops to custom designs."], ["NO BORING BASICS", "Every drop has a personality."]];
export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-[1500px] gap-6 px-4 pb-12 pt-8 md:grid-cols-12 md:px-8 md:pt-12">
        <div className="md:col-span-7">
          <h1 className="font-display text-[27vw] leading-[.8] md:text-[15vw]">
            <span className="line"><span>WEAR</span></span><span className="line"><span style={{ "--d": ".1s" } as React.CSSProperties}>YOUR</span></span><span className="line"><span style={{ "--d": ".2s" } as React.CSSProperties}>MOOD.</span></span>
          </h1>
          <p className="mt-6 max-w-md text-lg font-bold md:text-xl">Affordable streetwear. Loud ideas. Printed for you.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop" className="bg-black px-7 py-4 font-bold tracking-wider text-paper transition active:scale-[.97] hover:bg-acc">SHOP THE DROP</Link>
            <Link href="/custom" className="border border-black px-7 py-4 font-bold tracking-wider transition active:scale-[.97] hover:bg-black hover:text-paper">MAKE IT CUSTOM</Link>
          </div>
        </div>
        <div className="relative min-h-[420px] md:col-span-5 md:min-h-[640px]">
          <div className="absolute right-0 top-0 aspect-[4/5] w-[78%] -rotate-2 overflow-hidden"><Image src={products[0].images[0]} alt="No Signal Oversized Tee" fill priority sizes="40vw" className="object-cover" /></div>
          <div className="absolute bottom-0 left-0 aspect-square w-[46%] rotate-3 border-4 border-paper overflow-hidden"><Image src={products[5].images[1]} alt="Chaos Club Tee" fill priority sizes="22vw" className="object-cover" /></div>
          <div className="absolute bottom-6 right-2 grid h-28 w-28 rotate-12 place-items-center rounded-full bg-acc text-center font-display text-2xl leading-none text-white">TEES<br />FROM<br />₹599</div>
        </div>
      </section>
      <Marquee />
      <section className="mx-auto max-w-[1500px] px-4 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-4"><div><h2 className="font-display text-7xl md:text-[9vw] md:leading-none">DROP 01</h2><p className="mt-2 text-lg font-bold">Your next favourite tee.</p></div><Link href="/shop" className="text-sm font-bold underline">See all</Link></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {products.slice(0, 4).map((p, i) => <div key={p.id} className={i % 2 ? "md:mt-16" : ""}><ProductCard p={p} /></div>)}
        </div>
      </section>
      <EditorialSection />
      <CustomPrintSection />
      <section className="mx-auto max-w-[1500px] px-4 py-20 md:px-8 md:py-28">
        <h2 className="mb-10 font-display text-6xl md:text-8xl">WHY {`THREADR`}</h2>
        {why.map(([t, d]) => (
          <div key={t} className="grid gap-2 border-t border-black py-6 md:grid-cols-2 md:items-end md:py-8">
            <h3 className="font-display text-5xl md:text-7xl">{t}</h3><p className="text-lg font-semibold md:max-w-sm">{d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-[1500px] px-4 pb-20 md:px-8"><h2 className="mb-8 font-display text-6xl md:text-8xl">THE COLLECTION</h2><ProductGrid /></section>
      <section className="bg-black px-4 py-20 text-paper md:px-8">
        <h2 className="mx-auto mb-8 max-w-[1500px] font-display text-6xl md:text-[8vw] md:leading-none">SEEN ON THE FEED.</h2>
        <div className="mx-auto grid max-w-[1500px] grid-cols-3 gap-1 md:grid-cols-6">
          {products.flatMap((p) => p.images.slice(0, 1)).concat(products[0].images[2], products[2].images[2], products[7].images[1]).slice(0, 12).map((src, i) => (
            <div key={i} className={`relative aspect-square overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}><Image src={src} alt="Lifestyle shot" fill loading="lazy" sizes="(min-width:768px) 17vw, 33vw" className="object-cover transition duration-700 hover:scale-110" /></div>
          ))}
        </div>
      </section>
      <section className="px-4 py-24 text-center md:px-8 md:py-36">
        <h2 className="font-display text-[22vw] leading-[.85] md:text-[13vw]">READY TO<br />WEAR IT?</h2>
        <Link href="/shop" className="mt-10 inline-block bg-black px-10 py-5 font-bold tracking-wider text-paper transition active:scale-[.97] hover:bg-acc">SHOP THE DROP</Link>
      </section>
    </>
  );
}
