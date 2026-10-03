"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
export default function Buy({ p }: { p: Product }) {
  const { add, setOpen, setCheckout } = useCart();
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState(false);
  const go = (then: () => void) => { if (!size) return setWarn(true); add({ slug: p.slug, name: p.name, image: p.images[0], size, qty, price: p.price }); then(); };
  return (
    <div className="space-y-6">
      <p className="text-sm font-bold">Colour: <span className="font-normal">{p.colors.join(", ")}</span></p>
      <div>
        <p className={`mb-2 text-sm font-bold ${warn ? "text-red-600" : ""}`}>{warn ? "Pick a size to continue" : "Size"}</p>
        <div className="flex flex-wrap gap-2">{p.sizes.map((s) => <button key={s} onClick={() => { setSize(s); setWarn(false); }} aria-pressed={size === s} className={`h-12 min-w-14 border border-black px-3 font-bold transition ${size === s ? "bg-black text-paper" : "hover:bg-black/10"}`}>{s}</button>)}</div>
        <details className="mt-3 text-sm"><summary className="cursor-pointer font-bold underline">Size guide</summary>
          <table className="mt-2 w-full max-w-xs text-left"><thead><tr><th>Size</th><th>Chest (in)</th><th>Length (in)</th></tr></thead><tbody>{[["S", 40, 27], ["M", 42, 28], ["L", 44, 29], ["XL", 46, 30], ["XXL", 48, 31]].map(([s, c, l]) => <tr key={s}><td>{s}</td><td>{c}</td><td>{l}</td></tr>)}</tbody></table></details>
      </div>
      <div className="flex items-center gap-4"><span className="text-sm font-bold">Qty</span><div className="flex items-center border border-black"><button className="p-3" aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button><span className="w-8 text-center font-bold">{qty}</span><button className="p-3" aria-label="Increase" onClick={() => setQty(Math.min(10, qty + 1))}><Plus size={16} /></button></div></div>
      <div className="grid gap-3">
        <button onClick={() => go(() => setOpen(true))} className="bg-black py-4 font-bold tracking-wider text-paper transition active:scale-[.98] hover:bg-acc">ADD TO BAG</button>
        <button onClick={() => go(() => setCheckout(true))} className="border border-black py-4 font-bold tracking-wider transition active:scale-[.98] hover:bg-black hover:text-paper">ORDER ON WHATSAPP</button>
      </div>
      <p className="text-sm font-semibold">Printed with care in India.</p>
    </div>
  );
}
