import { Link, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Home,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  LogIn,
  User,
} from 'lucide-react';
import { authClient } from '#/clients/authClient';

export default function Header() {
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
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 text-white sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-slate-700/60 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <Link to="/">
            <img
              src="/tanstack-word-logo-white.svg"
              alt="TanStack Logo"
              className="h-8"
            />
          </Link>
        </div>

        {/* Right side — session state */}
        <div className="flex items-center gap-2">
          {!isPending &&
            (session ? (
              <>
                <span className="hidden sm:flex items-center gap-2 text-sm text-slate-300 mr-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {session.user.name || session.user.email}
                </span>
                <Link
                  to="/dashboard"
                  className="p-2 hover:bg-slate-700/60 rounded-lg transition-colors text-slate-300 hover:text-white"
                  title="Dashboard"
                >
                  <LayoutDashboard size={18} />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-slate-400 hover:text-red-400"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                <LogIn size={14} />
                Sign In
              </Link>
            ))}
        </div>
      </header>

      {/* Side drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-950 border-r border-slate-800 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-base font-semibold text-slate-200">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto space-y-1">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium"
            activeProps={{
              className:
                'flex items-center gap-3 px-3 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-medium',
            }}
          >
            <Home size={17} />
            Home
          </Link>

          {session && (
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium"
              activeProps={{
                className:
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-medium',
              }}
            >
              <LayoutDashboard size={17} />
              Dashboard
            </Link>
          )}

          {/* Additional nav links can be added here */}
        </nav>

        {/* Auth section at drawer bottom */}
        <div className="p-3 border-t border-slate-800">
          {session ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <User size={14} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {session.user.name}
                  </p>
                  <p className="text-slate-500 text-xs truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white transition-colors text-sm font-semibold"
            >
              <LogIn size={16} />
              Sign In
            </Link>
          )}
        </div>
      </aside>

      {/* Overlay when drawer open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
