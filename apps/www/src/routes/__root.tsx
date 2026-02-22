import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import type { RouterContext } from '../router';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { getSeoMeta } from '../lib/seo';
import { getSession } from '../lib/session';

import appCss from '../styles.css?url';

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const session = await getSession();
    return { session };
  },
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
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = router.options.context.queryClient;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-black selection:text-white">
        <QueryClientProvider client={queryClient}>
          <div className="app-shell flex min-h-screen flex-col">
            <Header />
            <main className="relative flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  );
}
