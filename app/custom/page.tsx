import type { Metadata } from "next";
import CustomPrintSection from "@/components/CustomPrintSection";
export const metadata: Metadata = { title: "Custom Print", description: "Send us your idea and we'll print it on a tee or hoodie." };
export default function Custom() { return <CustomPrintSection />; }
