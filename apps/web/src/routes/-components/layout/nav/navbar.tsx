import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import { Link } from '@tanstack/react-router';
import { useTheme } from 'next-themes';
import type { AuthSession } from '@/clients/authClient';
import NavContainer from '@/routes/-components/layout/nav/nav-container';
import UserAvatar from '@/routes/-components/layout/nav/user-avatar';
import { postsLinkOptions } from '@/routes/_protected/posts/-validations/posts-link-options';

const activeClassName = 'underline decoration-2 opacity-70';

export function Navbar({ session }: Readonly<{ session: AuthSession }>) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <NavContainer>
      <div className="flex gap-x-4">
        <Link
          to="/"
          activeProps={{ className: activeClassName }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        {session?.user ? (
          <Link
            {...postsLinkOptions}
            activeProps={{ className: activeClassName }}
          >
            Posts
          </Link>
        ) : null}
      </div>

      <div className="flex items-center gap-x-4">
        <Button
          className="w-8 h-8 rounded-full"
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {resolvedTheme === 'dark' ? (
            <MoonIcon className="text-yellow-300 w-4 h-4" />
          ) : (
            <SunIcon className="text-orange-500 w-4 h-4" />
          )}
        </Button>
        {session?.user ? (
          <UserAvatar user={session.user} />
        ) : (
          <div className="flex gap-x-2 justify-between">
            <Link
              to="/login"
              activeProps={{ className: activeClassName }}
              activeOptions={{ exact: true }}
            >
              Login
            </Link>
            <span>|</span>
            <Link
              to="/register"
              activeProps={{ className: activeClassName }}
              activeOptions={{ exact: true }}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </NavContainer>
  );
}
