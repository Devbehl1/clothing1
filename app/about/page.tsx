import type { Metadata } from "next";
import { STORE_CONFIG as S } from "@/lib/config";
export const metadata: Metadata = { title: "About", description: `The story behind ${S.brandName}.` };
export default function About() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-16 md:px-8">
      <h1 className="font-display text-[20vw] leading-[.85] md:text-[11vw]">ABOUT</h1>
      <p className="mt-10 max-w-xl text-xl font-semibold">{S.brandName} is streetwear for people who'd rather wear their mood than explain it. Good prints, honest prices, printed with care in India. Questions? Message us on Instagram {S.instagram}.</p>
    </div>
  );
}
