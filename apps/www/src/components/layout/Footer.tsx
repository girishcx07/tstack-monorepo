import { Link } from '@tanstack/react-router';
import { Github, Sparkles } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-[rgba(247,243,236,0.75)]">
      <div className="container mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700">
            <Sparkles className="h-3.5 w-3.5" />
            Modern posting workspace
          </div>
          <p className="font-display text-2xl font-semibold text-slate-900">
            Publish faster with a cleaner workflow.
          </p>
          <p className="mt-3 max-w-md text-sm text-slate-600">
            PostCraft gives teams a focused place to draft, review, and manage
            posts without UI noise.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Product
          </h3>
          <div className="flex flex-col gap-2 text-sm text-slate-700">
            <Link to="/" className="transition-colors hover:text-slate-900">
              Home
            </Link>
            <Link
              to="/posts"
              className="transition-colors hover:text-slate-900"
            >
              Posts
            </Link>
            <Link
              to="/dashboard"
              className="transition-colors hover:text-slate-900"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Account
          </h3>
          <div className="flex flex-col gap-2 text-sm text-slate-700">
            <Link
              to="/login"
              className="transition-colors hover:text-slate-900"
            >
              Sign in
            </Link>
            <Link
              to="/login"
              search={{ tab: 'signup' }}
              className="transition-colors hover:text-slate-900"
            >
              Create account
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-slate-900"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 px-6 py-4">
        <p className="mx-auto max-w-7xl text-xs text-slate-500">
          Copyright {currentYear} PostCraft. Built with TanStack Start and
          Better Auth.
        </p>
      </div>
    </footer>
  );
}
