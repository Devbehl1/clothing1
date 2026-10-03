export type Category = "tees" | "oversized" | "hoodies" | "custom";
export type Product = { id: string; name: string; slug: string; price: number; mrp: number; category: Category; description: string; images: string[]; sizes: string[]; colors: string[]; badge?: string };
// Replace picsum URLs with real product photos (or load this from an API later).
const img = (s: string) => [1, 2, 3].map((i) => `https://picsum.photos/seed/${s}${i}/900/1125`);
const mk = (name: string, price: number, mrp: number, category: Category, colors: string[], description: string, badge?: string): Product => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return { id: slug, name, slug, price, mrp, category, description, images: img(slug), sizes: ["S", "M", "L", "XL", "XXL"], colors, badge };
};
export const products: Product[] = [
  mk("No Signal Oversized Tee", 699, 999, "oversized", ["Black"], "Drop-shoulder oversized tee with a glitched-out signal print on the back.", "NEW"),
  mk("Offline Club Tee", 649, 899, "tees", ["Off-white"], "Boxy everyday tee. Membership is strictly offline.", "BESTSELLER"),
  mk("404 Mood Not Found", 699, 999, "tees", ["Black"], "Error-page typography across the chest. Relatable, unfortunately.", "NEW"),
  mk("After Hours Oversized", 749, 1099, "oversized", ["Washed Grey"], "Heavyweight oversized fit for people who come alive at 1 AM."),
  mk("No Plans Today", 599, 799, "tees", ["White"], "Our softest tee. Small print, big commitment to doing nothing."),
  mk("Chaos Club Tee", 699, 999, "tees", ["Black"], "Hand-drawn chaos graphic, screen printed to last.", "BESTSELLER"),
  mk("Low Battery Social Club", 649, 899, "oversized", ["Off-white"], "Oversized tee for when you're at 12% and done with people."),
  mk("Stay Weird Hoodie", 1099, 1599, "hoodies", ["Black"], "Fleece-lined hoodie with a puff-style front print.", "NEW"),
  mk("Your Design Tee", 799, 999, "custom", ["Any"], "Send us your artwork and we print it on a premium tee.", "CUSTOM"),
];
export const bySlug = (s: string) => products.find((p) => p.slug === s);
export const discount = (p: Product) => Math.round((1 - p.price / p.mrp) * 100);
