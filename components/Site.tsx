"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
const Instagram = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg>
);
import { STORE_CONFIG as S } from "@/lib/config";
import { useCart } from "./CartProvider";
export function AnnouncementBar() {
  return <div className="bg-black py-2 text-center text-xs font-bold tracking-widest text-paper">FREE SHIPPING ABOVE ₹{S.freeShippingAbove}</div>;
}
export function Navbar() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-black bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-4 md:h-16 md:px-8">
        <Link href="/" className="font-display text-2xl tracking-wider md:text-3xl">{S.brandName}</Link>
        <div className="flex items-center gap-4 text-xs font-bold tracking-widest md:gap-8 md:text-sm">
          <Link href="/shop" className="hover:text-acc">SHOP</Link><Link href="/custom" className="hover:text-acc">CUSTOM</Link><Link href="/about" className="hover:text-acc">ABOUT</Link>
          <a href={S.instagramUrl} aria-label="Instagram" className="hidden md:block"><Instagram size={20} /></a>
          <button onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`} className="relative"><ShoppingBag size={22} />{count > 0 && <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-acc text-[10px] text-white">{count}</span>}</button>
        </div>
      </nav>
    </header>
  );
}
export function Marquee({ dark = false }: { dark?: boolean }) {
  const t = "NEW DROP • OVERSIZED • PRINTED • MADE FOR YOU • ";
  return (
    <div className={`overflow-hidden border-y border-black py-3 ${dark ? "bg-black text-paper" : "bg-acc text-white"}`} aria-hidden>
      <div className="mq flex w-max whitespace-nowrap font-display text-3xl tracking-wide md:text-5xl">{[0, 1, 2, 3].map((i) => <span key={i} className="pr-6">{t.repeat(3)}</span>)}</div>
    </div>
  );
}
export function Footer() {
  const l = [["SHOP", "/shop"], ["CUSTOM PRINT", "/custom"], ["ABOUT", "/about"], ["CONTACT", "/about"], ["INSTAGRAM", S.instagramUrl]];
  return (
    <footer className="bg-black px-4 pb-24 pt-16 text-paper md:px-8 md:pb-10">
      <p className="font-display text-[22vw] leading-[.85] md:text-[16vw]">{S.brandName}</p>
      <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <p className="font-display text-3xl text-acc">{S.tagline}</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-bold tracking-widest">{l.map(([n, h]) => <li key={n}><Link href={h} className="hover:text-acc">{n}</Link></li>)}</ul>
      </div>
      <p className="mt-10 text-xs opacity-60">© 2026 {S.brandName}</p>
    </footer>
  );
}
