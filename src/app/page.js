import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-10">
      <section className="flex flex-col items-center py-20 text-center md:py-32">
        <h1 className="mb-6 max-w-4xl text-[48px] font-bold leading-[1.2] tracking-[-0.02em] text-primary">
          Master AI with the World&apos;s Best Prompts
        </h1>
        <p className="mb-12 max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
          Discover, share, and monetize high-performance AI prompts for ChatGPT,
          Midjourney, and more. Fuel your creativity with organic precision.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-lg bg-primary-container px-8 py-3 text-[14px] font-medium text-on-primary transition-colors hover:bg-primary"
          >
            Start Creating
          </Link>
          <Link
            href="/prompts"
            className="rounded-lg border border-secondary bg-transparent px-8 py-3 text-[14px] font-medium text-secondary transition-colors hover:bg-secondary/5"
          >
            Explore All
          </Link>
        </div>
      </section>
    </div>
  );
}
