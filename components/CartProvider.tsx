"use client";
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { Line } from "@/lib/whatsapp";
type Ctx = { lines: Line[]; add: (l: Omit<Line, "key">) => void; setQty: (k: string, q: number) => void; remove: (k: string) => void; total: number; count: number; open: boolean; setOpen: (b: boolean) => void; checkout: boolean; setCheckout: (b: boolean) => void };
const C = createContext<Ctx | null>(null);
export const useCart = () => { const c = useContext(C); if (!c) throw new Error("CartProvider missing"); return c; };
const KEY = "threadr-cart";
export default function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  useEffect(() => { try { setLines(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {} }, [lines, ready]);
  useEffect(() => { document.body.style.overflow = open || checkout ? "hidden" : ""; }, [open, checkout]);
  const v = useMemo<Ctx>(() => ({
    lines, open, setOpen, checkout, setCheckout,
    total: lines.reduce((s, l) => s + l.price * l.qty, 0),
    count: lines.reduce((s, l) => s + l.qty, 0),
    add: (l) => { const key = `${l.slug}-${l.size}`; setLines((p) => p.some((x) => x.key === key) ? p.map((x) => x.key === key ? { ...x, qty: x.qty + l.qty } : x) : [...p, { ...l, key }]); },
    setQty: (k, q) => setLines((p) => q < 1 ? p.filter((x) => x.key !== k) : p.map((x) => x.key === k ? { ...x, qty: Math.min(q, 10) } : x)),
    remove: (k) => setLines((p) => p.filter((x) => x.key !== k)),
  }), [lines, open, checkout]);
  return <C.Provider value={v}>{children}</C.Provider>;
}
