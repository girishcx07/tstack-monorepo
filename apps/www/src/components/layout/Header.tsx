import { Button } from '@repo/ui/components/button';
import { Link, useRouter } from '@tanstack/react-router';
import { Menu, X, LogOut, LayoutDashboard, User, FileText } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
              <span className="text-white font-bold text-lg tracking-tighter mix-blend-overlay">
                T
              </span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-slate-900">
              TStack
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Documentation
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
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
                  <Link to="/posts">
                    <Button
                      variant="ghost"
                      className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 gap-2 font-medium"
                    >
                      <FileText className="h-4 w-4" />
                      Posts
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button
                      variant="ghost"
                      className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 gap-2 font-medium"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="text-slate-500 hover:text-red-600 hover:bg-red-50"
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
                      className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 font-medium"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all">
                      Get Started
                    </Button>
                  </Link>
                </>
              ))}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md md:hidden px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg mix-blend-overlay">
                  T
                </span>
              </div>
              <span className="font-semibold text-lg text-slate-900">
                TStack
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-700 hover:text-blue-600 px-4 py-3 rounded-lg hover:bg-slate-50"
            >
              Features
            </Link>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-700 hover:text-blue-600 px-4 py-3 rounded-lg hover:bg-slate-50"
            >
              Documentation
            </Link>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-700 hover:text-blue-600 px-4 py-3 rounded-lg hover:bg-slate-50"
            >
              Pricing
            </Link>

            <div className="h-px bg-slate-200 my-4 mx-4" />

            {!isPending &&
              (session ? (
                <>
                  <div className="flex items-center gap-4 px-4 py-3 mb-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-medium">
                        {session.user.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {session.user.email}
                      </p>
                    </div>
                  </div>

                  <Link to="/posts" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-700 hover:bg-blue-50 hover:text-blue-600 h-12"
                    >
                      <FileText className="h-5 w-5 mr-3 text-slate-400" /> Posts
                    </Button>
                  </Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-700 hover:bg-blue-50 hover:text-blue-600 h-12"
                    >
                      <LayoutDashboard className="h-5 w-5 mr-3 text-slate-400" />{' '}
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 h-12 mt-2"
                  >
                    <LogOut className="h-5 w-5 mr-3" /> Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4 px-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 h-12"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12">
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
