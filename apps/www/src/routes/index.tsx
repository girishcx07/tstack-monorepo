import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  BookOpenText,
  ChartNoAxesCombined,
  LockKeyhole,
  PenLine,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { Section } from '../components/layout/Section';
import { authClient } from '#/clients/authClient';
import { getSeoMeta } from '../lib/seo';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is PostCraft?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PostCraft is a posts workspace where teams create, review, and manage articles with secure authentication and a clean UI.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I access posts without logging in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Posts are protected and only visible after sign in so your content stays private.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does PostCraft support account creation and sign in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can create an account from the login page and immediately start creating posts.',
      },
    },
  ],
};

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => {
    const seo = getSeoMeta({
      title: 'PostCraft | Elegant Post Management Workspace',
      description:
        'Create and manage posts with a polished interface, secure authentication, and focused workflows built for teams.',
      schema: faqSchema,
    });

    return {
      meta: seo.meta,
      links: seo.links,
      scripts: seo.scripts,
    };
  },
});

const featureCards = [
  {
    icon: <PenLine className="h-6 w-6 text-amber-600" />,
    title: 'Fast Drafting',
    description:
      'Start writing instantly with focused editing flows and a simple structure that stays out of your way.',
  },
  {
    icon: <Workflow className="h-6 w-6 text-blue-600" />,
    title: 'Clear Workflow',
    description:
      'Move from idea to published post with predictable navigation and consistent UI states.',
  },
  {
    icon: <LockKeyhole className="h-6 w-6 text-emerald-600" />,
    title: 'Protected Content',
    description:
      'Posts and dashboard routes are protected so only authenticated users can access private content.',
  },
  {
    icon: <ChartNoAxesCombined className="h-6 w-6 text-indigo-600" />,
    title: 'Operational Clarity',
    description:
      'The dashboard surfaces your active session state and account metadata for reliable operations.',
  },
];

export function HomePage() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(78rem_32rem_at_30%_-8%,rgba(217,185,121,0.26),transparent_56%),radial-gradient(52rem_28rem_at_85%_6%,rgba(95,141,185,0.22),transparent_58%)]" />

      <Section className="pt-16 md:pt-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-600" />
            Built for better publishing operations
          </div>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Elegant posts management for teams that ship content every week.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            This app keeps the flow simple: authenticate, write posts, and manage
            your workspace with predictable navigation and polished visuals.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {isPending ? (
              <div className="h-10 w-48 animate-pulse rounded-lg bg-slate-200/70" />
            ) : session ? (
              <>
                <Link to="/posts">
                  <Button className="h-10 px-5 font-semibold">
                    Open Posts
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="h-10 px-5 font-medium">
                    Open Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className="h-10 px-5 font-semibold">
                    Sign in to continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login" search={{ tab: 'signup' }}>
                  <Button variant="outline" className="h-10 px-5 font-medium">
                    Create account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section className="pt-6 md:pt-10">
        <div className="grid gap-5 md:grid-cols-2">
          {featureCards.map((feature) => (
            <Card
              key={feature.title}
              className="rounded-2xl border-black/10 bg-white/70 p-6 shadow-[0_18px_48px_-34px_rgba(10,20,32,0.42)] backdrop-blur"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white">
                {feature.icon}
              </div>
              <h2 className="font-display text-2xl font-semibold text-slate-900">
                {feature.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-8 md:pt-12">
        <div className="rounded-3xl border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(244,239,230,0.82))] p-8 shadow-[0_20px_60px_-38px_rgba(17,24,39,0.5)] md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Workflow Standard
          </p>
          <h3 className="mt-3 font-display text-3xl font-semibold text-slate-900 md:text-4xl">
            Keep your post lifecycle understandable.
          </h3>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/80 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                01
              </p>
              <h4 className="text-lg font-semibold text-slate-900">Authenticate</h4>
              <p className="mt-2 text-sm text-slate-600">
                Sign in or create an account. Header actions adapt immediately
                to your session state.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/80 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                02
              </p>
              <h4 className="text-lg font-semibold text-slate-900">Write Posts</h4>
              <p className="mt-2 text-sm text-slate-600">
                Open the posts area to create content, browse existing posts,
                and maintain clean editorial flow.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/80 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                03
              </p>
              <h4 className="text-lg font-semibold text-slate-900">Track Session</h4>
              <p className="mt-2 text-sm text-slate-600">
                Use the dashboard to verify session details and logout directly
                when your work is done.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600">
              <BookOpenText className="h-4 w-4" />
              Posts-first experience
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600">
              <LockKeyhole className="h-4 w-4" />
              Protected route access
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
