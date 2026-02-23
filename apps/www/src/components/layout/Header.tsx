import { Button } from '@repo/ui/components/button';
import { Link, useRouter } from '@tanstack/react-router';
import {
  BookText,
  LayoutDashboard,
  LogOut,
  Menu,
  UserCircle2,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { authClient } from '#/lib/auth-client';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const closeMenu = () => setIsOpen(false);

  const handleSignOut = async () => {
    console.log('[Header] Sign out clicked');
    try {
      await authClient.signOut();
      console.log('[Header] Sign out success');
      closeMenu();
      await router.invalidate();
      await router.navigate({ to: '/login' });
    } catch (error) {
      console.error('[Header] Sign out failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[rgba(251,249,246,0.86)] backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="group inline-flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-black/10 bg-white/80 shadow-sm">
              <BookText className="h-4 w-4 text-slate-700" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
              PostCraft
            </span>
          </Link>

          {session && (
            <nav className="hidden items-center gap-5 md:flex">
              <Link
                to="/posts"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Posts
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Dashboard
              </Link>
            </nav>
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isPending ? (
            <div className="h-9 w-40 animate-pulse rounded-lg bg-slate-200/70" />
          ) : session ? (
            <>
              <div className="mr-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5">
                <UserCircle2 className="h-4 w-4 text-slate-600" />
                <span className="max-w-32 truncate text-xs font-medium text-slate-700">
                  {session.user.name || session.user.email}
                </span>
              </div>
              <Link to="/posts">
                <Button variant="ghost" className="font-medium">
                  Posts
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" className="font-medium">
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="font-medium">
                  Sign in
                </Button>
              </Link>
              <Link to="/login" search={{ tab: 'signup' }}>
                <Button className="px-4 font-semibold">Create account</Button>
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-2 text-slate-600 transition-colors hover:text-slate-900 md:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-black/10 bg-[rgba(251,249,246,0.98)] px-6 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {isPending ? (
              <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200/70" />
            ) : session ? (
              <>
                <div className="mb-2 rounded-xl border border-black/10 bg-white/90 p-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {session.user.name || 'Logged in'}
                  </p>
                  <p className="text-xs text-slate-600">{session.user.email}</p>
                </div>
                <Link to="/posts" onClick={closeMenu}>
                  <Button
                    variant="ghost"
                    className="h-11 w-full justify-start font-medium"
                  >
                    Posts
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={closeMenu}>
                  <Button
                    variant="ghost"
                    className="h-11 w-full justify-start font-medium"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="mt-2 h-11 w-full justify-start"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu}>
                  <Button
                    variant="ghost"
                    className="h-11 w-full justify-start font-medium"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link
                  to="/login"
                  search={{ tab: 'signup' }}
                  onClick={closeMenu}
                >
                  <Button className="h-11 w-full justify-start font-semibold">
                    Create account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
