import { STORE_CONFIG } from "./config";
export type Line = { key: string; slug: string; name: string; image: string; size: string; qty: number; price: number };
export type Details = { name: string; phone: string; address: string; note?: string };
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
export const waUrl = (text: string) => `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
export const customOrderUrl = () => waUrl(`Hey ${STORE_CONFIG.brandName} 👋\n\nI'd like a custom printed order.\n\nIdea / design:\nGarment (tee / oversized / hoodie):\nQuantity:\n\nI'll send the artwork here.`);
export function orderMessage(lines: Line[], d?: Details) {
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const items = lines.map((l, i) => `${i + 1}. ${l.name}\nSize: ${l.size}\nQty: ${l.qty}\nPrice: ${inr(l.price * l.qty)}`).join("\n\n");
  return `Hey ${STORE_CONFIG.brandName} 👋\n\nI'd like to place an order:\n\n${items}\n\nTotal: ${inr(total)}\n\nName: ${d?.name ?? ""}\nPhone: ${d?.phone ?? ""}\nAddress: ${d?.address ?? ""}${d?.note ? `\nNote: ${d.note}` : ""}\n\nPlease confirm my order.`;
}
