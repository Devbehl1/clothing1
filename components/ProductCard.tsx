"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { discount, type Product } from "@/lib/products";
import { inr } from "@/lib/whatsapp";
import { useCart } from "./CartProvider";
export default function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const { add, setOpen } = useCart();
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
        <Link href={`/product/${p.slug}`} aria-label={p.name}>
          <Image src={p.images[0]} alt={p.name} fill priority={priority} sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <Image src={p.images[1]} alt="" fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover opacity-0 transition duration-500 group-hover:opacity-100" />
        </Link>
        {p.badge && <span className="absolute left-0 top-3 bg-black px-2 py-1 text-[11px] font-bold tracking-widest text-paper">{p.badge}</span>}
        <button onClick={() => { add({ slug: p.slug, name: p.name, image: p.images[0], size: "M", qty: 1, price: p.price }); setOpen(true); }} aria-label={`Quick add ${p.name}, size M`} className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center bg-paper transition hover:bg-acc hover:text-white active:scale-90"><Plus /></button>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="text-sm font-extrabold uppercase leading-tight md:text-base">{p.name}</h3>
        <p className="shrink-0 text-right text-sm font-bold">{inr(p.price)} <s className="block font-normal opacity-50">{inr(p.mrp)}</s></p>
      </div>
      <p className="text-xs opacity-60">{discount(p)}% off · Quick add picks size M</p>
    </article>
  );
}
