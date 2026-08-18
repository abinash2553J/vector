import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16">
      {/* Soft atmospheric gradient backdrop */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-70 blur-3xl"
        aria-hidden="true"
      >
        <div className="mx-auto h-full max-w-7xl bg-radial from-accent-light via-info-lightest/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-text-primary leading-[1.12] max-w-4xl mx-auto">
          Job hunting is hard.
          <br />
          Your tools shouldn&apos;t be.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Stop applying blind. JobPilot finds the jobs, researches the companies, and gives you everything you need to stand out.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-text-darkest hover:bg-text-black text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all hover:scale-[1.01]"
          >
            <span>Get Started</span>
            <Play className="w-3 h-3 fill-white text-white" />
          </Link>
          <Link
            href="/find-jobs"
            className="inline-flex items-center justify-center bg-surface hover:bg-surface-secondary text-text-primary border border-border text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all hover:scale-[1.01]"
          >
            Find Your First Match
          </Link>
        </div>

        {/* Dashboard Preview Screenshot */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/80 bg-surface">
            <Image
              src="/images/dashboard-demo.png"
              alt="JobPilot Dashboard Preview"
              width={1200}
              height={675}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
