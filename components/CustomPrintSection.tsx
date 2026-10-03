import { customOrderUrl } from "@/lib/whatsapp";
export default function CustomPrintSection() {
  return (
    <section id="custom" className="bg-acc px-4 py-20 text-white md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1.6fr_1fr] md:items-end">
        <h2 className="font-display text-[15vw] leading-[.88] md:text-[9vw]">YOU BRING THE IDEA.<br />WE PRINT IT.</h2>
        <div>
          <p className="mb-8 max-w-sm text-lg font-semibold">Have your own design, artwork, meme, illustration or idea? Send it to us and we&apos;ll turn it into something you can wear.</p>
          <a href={customOrderUrl()} target="_blank" rel="noopener" className="inline-block bg-black px-8 py-4 font-bold tracking-wider transition active:scale-[.97] hover:bg-paper hover:text-black">START A CUSTOM ORDER</a>
        </div>
      </div>
    </section>
  );
}
