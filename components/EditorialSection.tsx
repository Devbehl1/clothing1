import Image from "next/image";
import { products } from "@/lib/products";
export default function EditorialSection() {
  return (
    <section className="overflow-hidden bg-black px-4 py-20 text-paper md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-12">
        <h2 className="font-display text-[26vw] leading-[.82] md:col-span-7 md:text-[14vw]">NOT<br />JUST<br />A TEE.</h2>
        <div className="relative md:col-span-5">
          <div className="relative ml-auto aspect-[4/5] w-4/5 md:w-3/4"><Image src={products[3].images[0]} alt="After Hours Oversized tee" fill sizes="40vw" className="object-cover" /></div>
          <div className="relative -mt-24 aspect-square w-1/2 border-4 border-black"><Image src={products[5].images[2]} alt="Chaos Club tee detail" fill sizes="25vw" className="object-cover" /></div>
          <p className="mt-6 max-w-xs text-lg font-semibold md:absolute md:bottom-0 md:right-0">Your clothes should say something before you do.</p>
        </div>
      </div>
    </section>
  );
}
