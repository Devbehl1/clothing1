"use client";
import { useState } from "react";
import { products, type Category } from "@/lib/products";
import ProductCard from "./ProductCard";
const tabs: ("all" | Category)[] = ["all", "tees", "oversized", "hoodies", "custom"];
export default function ProductGrid() {
  const [c, setC] = useState<"all" | Category>("all");
  const list = products.filter((p) => c === "all" || p.category === c);
  return (
    <div>
      <div role="tablist" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
        {tabs.map((t) => <button key={t} role="tab" aria-selected={c === t} onClick={() => setC(t)} className={`shrink-0 border border-black px-5 py-2 text-sm font-bold uppercase tracking-widest transition ${c === t ? "bg-black text-paper" : "hover:bg-black/10"}`}>{t}</button>)}
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </div>
  );
}
