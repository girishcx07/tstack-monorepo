import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/router-devtools';

import type { RouterContext } from '../router';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { getSeoMeta } from '../lib/seo';

import appCss from '../styles.css?url';

export const Route = createRootRouteWithContext<RouterContext>()({
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
      {/* 
        SaaS Aesthetic: Clean architecture approach
      */}
      <body className="min-h-screen font-sans bg-background text-foreground antialiased selection:bg-black selection:text-white">
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
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
