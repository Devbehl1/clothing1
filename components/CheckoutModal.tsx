"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useCart } from "./CartProvider";
import { inr, orderMessage, waUrl } from "@/lib/whatsapp";
const field = "w-full border border-black bg-transparent px-4 py-3 outline-none focus:border-acc focus:ring-2 focus:ring-acc/30";
export default function CheckoutModal() {
  const { lines, total, checkout, setCheckout } = useCart();
  const [err, setErr] = useState<Record<string, string>>({});
  if (!checkout) return null;
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const d = { name: String(f.get("name")).trim(), phone: String(f.get("phone")).replace(/[\s+-]/g, "").replace(/^91(?=\d{10}$)/, ""), address: String(f.get("address")).trim(), note: String(f.get("note")).trim() };
    const er: Record<string, string> = {};
    if (d.name.length < 2) er.name = "Enter your full name.";
    if (!/^[6-9]\d{9}$/.test(d.phone)) er.phone = "Enter a valid 10-digit mobile number.";
    if (d.address.length < 10) er.address = "Enter your full delivery address.";
    setErr(er);
    if (Object.keys(er).length) return;
    window.open(waUrl(orderMessage(lines, d)), "_blank", "noopener");
    setCheckout(false);
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 md:items-center md:p-6" role="dialog" aria-modal="true" aria-label="Checkout">
      <form onSubmit={submit} noValidate className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto bg-paper md:grid md:grid-cols-2">
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between"><h2 className="font-display text-4xl">DELIVERY</h2><button type="button" onClick={() => setCheckout(false)} aria-label="Close"><X /></button></div>
          {[["name", "Full name", "text"], ["phone", "Phone number", "tel"]].map(([n, l, t]) => (
            <label key={n} className="block text-sm font-bold">{l}<input name={n} type={t} className={`${field} mt-1 font-normal`} />{err[n] && <span className="text-xs font-normal text-red-600">{err[n]}</span>}</label>
          ))}
          <label className="block text-sm font-bold">Address<textarea name="address" rows={3} className={`${field} mt-1 font-normal`} />{err.address && <span className="text-xs font-normal text-red-600">{err.address}</span>}</label>
          <label className="block text-sm font-bold">Note (optional)<input name="note" className={`${field} mt-1 font-normal`} /></label>
        </div>
        <div className="flex flex-col bg-black p-6 text-paper">
          <h3 className="font-display text-4xl">YOUR ORDER</h3>
          <ul className="my-4 flex-1 space-y-3 text-sm">{lines.map((l) => <li key={l.key} className="flex justify-between gap-3"><span>{l.name} · {l.size} × {l.qty}</span><span>{inr(l.price * l.qty)}</span></li>)}</ul>
          <div className="mb-4 flex justify-between border-t border-paper/30 pt-4 text-xl font-bold"><span>Total</span><span>{inr(total)}</span></div>
          <button className="bg-acc py-4 font-bold tracking-wider text-white transition active:scale-[.98]">CONTINUE TO WHATSAPP</button>
        </div>
      </form>
    </div>
  );
}
