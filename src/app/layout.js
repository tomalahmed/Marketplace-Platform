import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Providers from "@/components/providers/Providers";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata = {
  title: "PromptGrowth - AI Prompt Marketplace",
  description:
    "Discover, share, and monetize high-performance AI prompts for ChatGPT, Midjourney, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface text-on-surface">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
