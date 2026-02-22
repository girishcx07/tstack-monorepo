import { Button } from '@repo/ui/components/button';
import { Link, useRouter } from '@tanstack/react-router';
import { Menu, X, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useState } from 'react';
import { authClient } from '#/clients/authClient';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsOpen(false);
    await router.invalidate();
    router.navigate({ to: '/login' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <span className="text-white font-bold text-lg tracking-tighter">
                T
              </span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">
              TStack
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Documentation
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Right: Auth & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            {!isPending &&
              (session ? (
                <>
                  <Link to="/dashboard">
                    <Button
                      variant="ghost"
                      className="text-slate-300 hover:text-white hover:bg-white/5 gap-2"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                    title="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="text-slate-300 hover:text-white hover:bg-white/5"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all">
                      Get Started
                    </Button>
                  </Link>
                </>
              ))}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm md:hidden px-6 py-4">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-semibold text-lg text-white">TStack</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-white"
            >
              Features
            </Link>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-white"
            >
              Documentation
            </Link>

            <div className="h-px bg-white/10 my-4" />

            {!isPending &&
              (session ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {session.user.name}
                      </p>
                      <p className="text-sm text-slate-400">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-start bg-white/5 hover:bg-white/10 text-white mb-2">
                      <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-white/10 text-white hover:bg-white/5"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ))}
          </nav>
        </div>
      )}
    </header>
  );
}
