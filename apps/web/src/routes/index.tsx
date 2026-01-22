import {
  CodeIcon,
  GitHubLogoIcon,
  LightningBoltIcon,
  LockClosedIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import { createFileRoute, Link } from '@tanstack/react-router';
import { authClient } from '@/clients/authClient';
import { env } from '@/env';
import urlJoin from 'url-join';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-20 pb-32 text-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-slate-950">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]" />
          <div className="absolute bottom-auto left-0 right-auto top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(108,56,255,0.5)] opacity-50 blur-[80px]" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            🚀 The Ultimate React Monorepo
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 pb-2">
            Build Faster. Scale Better.
            <br className="hidden sm:inline" />
            <span className="text-foreground"> With RT Stack.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            A production-ready monorepo starter kit powered by TanStack Router,
            React 19, Tailwind CSS v4, and a type-safe API.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {session?.user ? (
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link to="/posts">Go to Dashboard</Link>
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-12 px-8 text-base">
                  <Link to="/login">Get Started</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base"
                >
                  <Link to="/register">Create Account</Link>
                </Button>
              </div>
            )}
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="h-12 px-8 text-base"
            >
              <a
                href="https://github.com/nktnet1/rt-stack"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                <GitHubLogoIcon className="h-5 w-5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 md:px-6 py-24 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-16">
          Everything you need to ship
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<LightningBoltIcon className="h-10 w-10 text-yellow-500" />}
            title="Blazing Fast"
            description="Powered by Vite and Tailwind CSS v4 for instant feedback loops and minimal bundle sizes."
          />
          <FeatureCard
            icon={<CodeIcon className="h-10 w-10 text-blue-500" />}
            title="Type-Safe API"
            description="End-to-end type safety with Hono and Zod, ensuring your frontend and backend are always in sync."
          />
          <FeatureCard
            icon={<RocketIcon className="h-10 w-10 text-pink-500" />}
            title="TanStack Router"
            description="The most powerful router for React. File-based routing, nested layouts, and built-in search param handling."
          />
          <FeatureCard
            icon={<LockClosedIcon className="h-10 w-10 text-green-500" />}
            title="Authentication"
            description="Secure authentication baked in. Ready to scale with your user base."
          />
          <FeatureCard
            icon={<GitHubLogoIcon className="h-10 w-10 text-gray-500" />}
            title="Monorepo Ready"
            description="Built with Turborepo for efficient workspace management and shared packages."
          />
          <FeatureCard
            icon={<CodeIcon className="h-10 w-10 text-violet-500" />}
            title="Documentation"
            description="Integrated OpenAPI documentation with Scalar for easy API testing and discovery."
            link={urlJoin(env.PUBLIC_SERVER_URL, env.PUBLIC_SERVER_API_PATH)}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t py-12 bg-gray-50 dark:bg-slate-900/50">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} RT Stack. Released under MIT License.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/nktnet1/rt-stack"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
            >
              <GitHubLogoIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}) {
  const content = (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 dark:bg-slate-900/40">
      <div className="mb-4 rounded-full bg-slate-100 dark:bg-slate-800 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
