import Image from "next/image";
import Link from "next/link";

type Props = {
  activePath?: string;
};

export function Navbar({ activePath }: Props) {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="JobPilot Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors ${
              activePath === "/dashboard"
                ? "text-accent"
                : "text-text-dark hover:text-text-primary"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/find-jobs"
            className={`text-sm font-medium transition-colors ${
              activePath === "/find-jobs"
                ? "text-accent"
                : "text-text-dark hover:text-text-primary"
            }`}
          >
            Find Jobs
          </Link>
          <Link
            href="/profile"
            className={`text-sm font-medium transition-colors ${
              activePath === "/profile"
                ? "text-accent"
                : "text-text-dark hover:text-text-primary"
            }`}
          >
            Profile
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center bg-text-darkest hover:bg-text-black text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Start for free
          </Link>
        </div>
      </div>
    </header>
  );
}
