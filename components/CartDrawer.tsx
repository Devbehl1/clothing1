"use client";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { inr } from "@/lib/whatsapp";
export default function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, total, setCheckout } = useCart();
  return (
    <>
      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-[70] bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside aria-label="Shopping bag" aria-hidden={!open} className={`fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-md flex-col bg-paper transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-black px-5 py-4">
          <h2 className="font-display text-3xl tracking-wide">YOUR BAG</h2>
          <button onClick={() => setOpen(false)} aria-label="Close bag"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          {lines.length === 0 ? <p className="py-16 text-lg font-semibold">Nothing here yet. Go pick a mood.</p> : lines.map((l) => (
            <div key={l.key} className="flex gap-4 border-b border-black/15 py-5">
              <div className="relative h-28 w-24 shrink-0 bg-black/5"><Image src={l.image} alt={l.name} fill sizes="96px" className="object-cover" /></div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-2"><div><p className="font-bold leading-tight">{l.name}</p><p className="text-sm">Size {l.size}</p></div><button onClick={() => remove(l.key)} className="self-start text-xs underline">Remove</button></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-black">
                    <button className="p-2" aria-label="Decrease" onClick={() => setQty(l.key, l.qty - 1)}><Minus size={14} /></button>
                    <span className="w-7 text-center text-sm font-bold">{l.qty}</span>
                    <button className="p-2" aria-label="Increase" onClick={() => setQty(l.key, l.qty + 1)}><Plus size={14} /></button>
                  </div>
                  <p className="font-bold">{inr(l.price * l.qty)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-black p-5">
            <div className="mb-4 flex justify-between text-lg font-bold"><span>Subtotal</span><span>{inr(total)}</span></div>
            <button onClick={() => { setOpen(false); setCheckout(true); }} className="w-full bg-black py-4 font-bold tracking-wider text-paper transition active:scale-[.98] hover:bg-acc">ORDER ON WHATSAPP</button>
          </div>
        )}
      </aside>
    </>
  );
}
export function StickyBag() {
  const { count, total, setOpen } = useCart();
  if (!count) return null;
  return <button onClick={() => setOpen(true)} className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-between bg-acc px-5 py-4 font-bold text-white md:hidden"><span>BAG ({count})</span><span>{inr(total)}</span></button>;
}
