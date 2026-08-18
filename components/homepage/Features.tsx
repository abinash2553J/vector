import Image from "next/image";

export function Features() {
  return (
    <div className="w-full">
      {/* Feature Section 1: Manage Your Job Search With Ease */}
      <section className="py-20 sm:py-28 border-t border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold tracking-tight text-text-primary leading-[1.2]">
                Manage Your Job
                <br />
                Search With Ease
              </h2>

              <div className="space-y-6">
                {/* Active/Highlighted Feature Item */}
                <div className="border-l-2 border-accent pl-6 py-1">
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    Find jobs that actually fit
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-text-secondary leading-relaxed">
                    Search by title and location or paste a job link. Get matched roles you can quickly scan.
                  </p>
                </div>

                {/* Feature Item 2 */}
                <div className="border-l-2 border-transparent pl-6 py-1">
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    Know the Company Before You Apply
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-text-secondary leading-relaxed">
                    Stop guessing what a company is about. JobPilot browses their site and gives you everything you need to apply with confidence.
                  </p>
                </div>

                {/* Feature Item 3 */}
                <div className="border-l-2 border-transparent pl-6 py-1">
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    Keep track of every application
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-text-secondary leading-relaxed">
                    Keep a clear view of every job you&apos;ve found, tailored. Your activity and progress all stay in one simple place.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-lg border border-border bg-surface">
                <Image
                  src="/images/jobs-lists.png"
                  alt="Job Matching and Discovery List"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Apply With More Confidence, Every Time */}
      <section className="py-20 sm:py-28 border-t border-border bg-surface-secondary/40 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Visual Image (Agent Log Terminal) */}
            <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-xl border border-border bg-surface">
                <Image
                  src="/images/agnet-log.png"
                  alt="AI Agent Log Activity Terminal"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold tracking-tight text-text-primary leading-[1.2]">
                Apply With More
                <br />
                Confidence, Every Time
              </h2>

              <div className="space-y-6 divide-y divide-border/60">
                {/* Item 1 */}
                <div className="pt-2 first:pt-0">
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    Understand your match score
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-text-secondary leading-relaxed">
                    See how your profile lines up with each role before you apply. Get a clear breakdown of what fits and what&apos;s missing.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="pt-5">
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    AI-Powered Job Matching
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-text-secondary leading-relaxed">
                    Stop guessing which jobs are worth applying to. JobPilot scores every role against your actual skills so you focus on the ones that matter.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="pt-5">
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                    Focus on the right roles
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-text-secondary leading-relaxed">
                    Filter out low fit jobs and stay on the ones that actually matter. Spend less time sorting and more time applying.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
