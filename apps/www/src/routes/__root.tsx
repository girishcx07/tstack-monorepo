import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { getSeoMeta } from '../lib/seo';
import type { RouterContext } from '../router';

import appCss from '../styles.css?url';

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => {
    const defaultSeo = getSeoMeta();

    return {
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        ...defaultSeo.meta,
      ],
      links: [
        {
          rel: 'stylesheet',
          href: appCss,
        },
        ...defaultSeo.links,
      ],
      scripts: [...defaultSeo.scripts],
    };
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased selection:bg-cyan-500/30">
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
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
