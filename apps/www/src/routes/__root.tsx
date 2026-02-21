import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { RouterContext } from '../router';
import { authClient } from '../lib/auth-client';

import appCss from '../styles.css?url';

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: RootComponent,
});

function RootComponent() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <RootDocument>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            <h1 className="font-bold">www App</h1>
            <div>
              {isPending ? (
                'Loading...'
              ) : session ? (
                <span>Welcome, {session.user.name ?? session.user.email}</span>
              ) : (
                <button
                  onClick={() =>
                    authClient.signIn.email({
                      email: 'test@example.com',
                      password: 'password',
                    })
                  }
                >
                  Sign In Test
                </button>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
