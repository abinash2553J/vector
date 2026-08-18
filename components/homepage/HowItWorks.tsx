import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export function HowItWorks() {
  return (
    <div className="w-full">
      {/* Testimonial Section */}
      <section className="py-24 sm:py-32 border-t border-border bg-surface text-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-6 inline-block">
            SUCCESS STORIES
          </span>

          <blockquote className="text-2xl sm:text-3xl md:text-[28px] font-medium text-text-primary leading-snug tracking-tight max-w-3xl mx-auto">
            &ldquo;I used to spend my evenings copy-pasting resumes. Now I open my dashboard to see interviews waiting. It feels like cheating. Had 3 offers on the table simultaneously.&rdquo;
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-3.5">
            <Image
              src="/images/user-icon.png"
              alt="Tom Wilson"
              width={48}
              height={48}
              className="w-12 h-12 rounded-xl object-cover shadow-sm border border-border"
            />
            <div className="text-left">
              <div className="text-sm font-semibold text-text-primary">
                Tom Wilson
              </div>
              <div className="text-xs text-text-secondary">
                Junior Developer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-24 sm:py-32 border-t border-border relative overflow-hidden bg-background text-center">
        {/* Atmospheric Glow */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-full opacity-60 blur-3xl"
          aria-hidden="true"
        >
          <div className="mx-auto h-full max-w-7xl bg-radial from-accent-light via-info-lightest/30 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-text-primary leading-[1.15] max-w-2xl mx-auto">
            Your next job search can feel a
            <br />
            lot less overwhelming
          </h2>

          <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Set up your profile, upload your resume, and start finding matches in minutes.
          </p>

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
        </div>
      </section>
    </div>
  );
}
