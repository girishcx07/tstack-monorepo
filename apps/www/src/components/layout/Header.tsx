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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-bold text-lg tracking-tight text-foreground">
              TStack
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/posts"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Posts
            </Link>
          </nav>
        </div>

        {/* Right: Auth & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="h-9 w-24 animate-pulse bg-muted rounded-md" />
            ) : session ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="gap-2 font-medium">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="font-semibold">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-bold text-lg text-foreground">TStack</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground bg-secondary rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              to="/posts"
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground px-4 py-3 rounded-lg hover:bg-muted"
            >
              Posts
            </Link>

            <div className="h-px bg-border my-4 mx-4" />

            {isPending ? (
              <div className="h-12 m-4 animate-pulse bg-muted rounded-xl" />
            ) : session ? (
              <>
                <div className="flex items-center gap-4 px-4 py-3 mb-2 rounded-xl bg-muted/50 border border-border">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      {session.user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <Link to="/posts" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:bg-muted h-12"
                  >
                    <FileText className="h-5 w-5 mr-3 text-muted-foreground" />{' '}
                    Posts
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-foreground hover:bg-muted h-12"
                  >
                    <LayoutDashboard className="h-5 w-5 mr-3 text-muted-foreground" />{' '}
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start text-destructive hover:bg-destructive/10 h-12 mt-2"
                >
                  <LogOut className="h-5 w-5 mr-3" /> Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-4 px-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full h-12">
                    Sign In
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full font-semibold h-12">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
