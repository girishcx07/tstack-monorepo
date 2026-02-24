import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import TanStackQueryProvider, {
  RootContext,
} from '../integrations/tanstack-query/root-provider';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

import appCss from '../styles.css?url';
import { getSeoMeta } from '#/lib/seo';

export const Route = createRootRouteWithContext<RootContext>()({
  head: () => {
    const defaultSeo = getSeoMeta();

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ...defaultSeo.meta,
      ],
      links: [{ rel: 'stylesheet', href: appCss }, ...defaultSeo.links],
      scripts: [...defaultSeo.scripts],
    };
  },
  notFoundComponent: () => {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500 min-h-screen">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-lg">Page Not Found</p>
      </div>
    );
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        <TanStackQueryProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </TanStackQueryProvider>
        <Scripts />
      </body>
    </html>
  );
}
