import { createFileRoute } from '@tanstack/react-router';
import {
  Zap,
  Server,
  Route as RouteIcon,
  Shield,
  Waves,
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { Section } from '../components/layout/Section';
import { getSeoMeta } from '../lib/seo';

// --- Schema Markup for SEO ---
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What exactly is TanStack Start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TanStack Start is a full-stack framework powered by TanStack Router for React. It seamlessly combines server capability with top-tier client routing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why use this instead of Next.js or Remix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It provides extreme type-safety out of the box, better flexibility for single-page and multi-page hybrid applications, without being tied to a specific infrastructure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it completely type-safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Search parameters, paths, API responses, and server functions are typed end-to-end, catching errors before they reach production.',
      },
    },
  ],
};

// Route Configuration
export const Route = createFileRoute('/')({
  component: App,
  head: () => {
    const seo = getSeoMeta({
      title: 'Enterprise React Framework | Build Scalable SaaS Fast',
      description:
        'The ultimate full-stack React framework powered by TanStack Router. Build modern, type-safe, and SEO-optimized AI applications with powerful server functions.',
      schema: faqSchema,
    });

    return {
      meta: seo.meta,
      links: seo.links,
      scripts: seo.scripts,
    };
  },
});

// --- UI Components for the Page ---

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl bg-slate-900/50 backdrop-blur-sm overflow-hidden mb-4 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg text-slate-200">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-0 text-slate-400 leading-relaxed">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-cyan-400" />,
      title: 'Powerful Server Functions',
      description:
        'Write server-side code seamlessly alongside client components. Type-safe, secure, and incredibly simple.',
    },
    {
      icon: <Server className="w-8 h-8 text-blue-400" />,
      title: 'Flexible SSR & Streaming',
      description:
        'Full-document SSR, selective streaming, and progressive enhancement. Control what renders, where, and when.',
    },
    {
      icon: <RouteIcon className="w-8 h-8 text-indigo-400" />,
      title: 'Type-Safe API Routes',
      description:
        'Build native API endpoints natively within your React app structure. No secondary backend required.',
    },
    {
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      title: 'End-to-End Type Safety',
      description:
        'Strong typing extends from database to client UI. Catch breaking changes directly inside your IDE.',
    },
    {
      icon: <Waves className="w-8 h-8 text-blue-400" />,
      title: 'AI Native Architecture',
      description:
        'Stream massive datasets and conversational AI responses progressively to the client with zero jitter.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-indigo-400" />,
      title: 'Deploy Anywhere',
      description:
        'Cloudflare, Vercel, Node.js, or Docker. Built for the modern edge and stateless execution environments.',
    },
  ];

  return (
    <>
      <div className="relative overflow-hidden bg-slate-950">
        {/* Abstract Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />

        {/* --- Hero Section --- */}
        <Section className="relative pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>TanStack Start 1.0 is here</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white max-w-5xl leading-[1.1] mb-8">
            The Ultimate React Framework for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
              Scalable SaaS
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-12 font-light leading-relaxed">
            Ship enterprise-grade applications faster with robust server
            functions, streaming SSR, and unparalleled type-safety. No
            compromises.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-base bg-white text-slate-950 hover:bg-slate-200 font-semibold shadow-xl shadow-cyan-500/10"
            >
              Start Building Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 text-base border-white/20 text-white hover:bg-white/5 font-semibold"
            >
              <Code2 className="mr-2 w-5 h-5" />
              Read Documentation
            </Button>
          </div>
        </Section>

        {/* --- Social Proof --- */}
        <Section className="py-12 border-y border-white/5 bg-slate-900/30">
          <p className="text-center text-sm font-medium text-slate-500 mb-8 uppercase tracking-widest">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            <div className="text-xl font-bold font-sans">Vercel</div>
            <div className="text-xl font-bold font-sans">Cloudflare</div>
            <div className="text-xl font-bold font-sans">Stripe</div>
            <div className="text-xl font-bold font-sans">Linear</div>
          </div>
        </Section>

        {/* --- Value Proposition Grid --- */}
        <Section id="features" className="py-24 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Everything you need to scale
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              We abstracted the hard parts of full-stack engineering so you can
              focus on building features. Built on the proven primitives of
              TanStack Router.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="bg-slate-900/50 border-white/10 p-8 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-6 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-200 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {/* --- Deep Dive / Comparison Section --- */}
        <Section className="py-24 bg-slate-900/30 border-y border-white/5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Stop fighting your framework
              </h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Legacy React architectures introduce extreme complexity with
                waterfall data requests and disjointed state. TStack unifies
                your client and server contexts beautifully.
              </p>
              <ul className="space-y-4">
                {[
                  'No more complex state synchronization',
                  'Eliminate runtime undefined errors',
                  'Built-in caching and refetching',
                  'Lightning fast sub-50ms SSR rendering',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-300 font-medium">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fake Code Block Visual */}
            <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-slate-500 font-mono">
                  server-function.ts
                </span>
              </div>
              <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
                <code>
                  <span className="text-purple-400">export const</span> getUser
                  = <span className="text-blue-400">createServerFn</span>(){' '}
                  <br />
                  &nbsp;&nbsp;.<span className="text-blue-400">validator</span>
                  (z.string()) <br />
                  &nbsp;&nbsp;.<span className="text-blue-400">handler</span>(
                  <span className="text-purple-400">async</span> (&#123; data:
                  userId &#125;) <span className="text-purple-400">=&gt;</span>{' '}
                  &#123; <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-slate-500">
                    // Fully typed server context
                  </span>{' '}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-purple-400">const</span> user ={' '}
                  <span className="text-purple-400">await</span> db.user.
                  <span className="text-blue-400">findUnique</span>(&#123;{' '}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where: &#123; id: userId
                  &#125; <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;); <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-purple-400">return</span> user; <br />
                  &nbsp;&nbsp;&#125;);
                </code>
              </pre>
            </div>
          </div>
        </Section>

        {/* --- FAQ Section --- */}
        <Section className="py-24 relative max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-400">
              Everything you need to know about scaling with our architectural
              boilerplate.
            </p>
          </div>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, idx) => (
              <FAQItem
                key={idx}
                question={item.name}
                answer={item.acceptedAnswer.text}
              />
            ))}
          </div>
        </Section>

        {/* --- Final CTA --- */}
        <Section className="py-24 text-center">
          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-3xl p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 blur-[100px] rounded-full" />

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 relative z-10">
              Ready to modernize your stack?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 relative z-10 font-light">
              Join thousands of developers building fast, type-safe, scalable
              applications with TanStack Start.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Button
                size="lg"
                className="h-14 px-10 text-base bg-cyan-500 hover:bg-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/25"
              >
                Start Building Free
              </Button>
              <span className="text-slate-400 text-sm mt-4 sm:mt-0 sm:ml-4">
                No credit card required.
              </span>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
