import { authClient } from '#/lib/auth-client';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { LogOut, User, ShieldCheck, Zap, Globe } from 'lucide-react';
import { getSession } from '#/server/functions/auth';

export const Route = createFileRoute('/_protected/dashboard/')({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: '/login' });
    }
    return { session };
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { session } = Route.useRouteContext();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    await router.invalidate();
    router.navigate({ to: '/login' });
  };

  const stats = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      label: 'Auth Status',
      value: 'Authenticated',
      accent: 'emerald',
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      label: 'Session Type',
      value: 'Cookie Cache',
      accent: 'blue',
    },
    {
      icon: <Globe className="w-5 h-5 text-indigo-500" />,
      label: 'App Mode',
      value: 'SSR (TanStack)',
      accent: 'indigo',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 gap-4">
          <div>
            <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold mb-2">
              Dashboard
            </p>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Hello, {session?.user?.name || 'there'} 👋
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              {session?.user?.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center md:justify-start gap-2 px-4 py-2.5 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-700 hover:text-red-600 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm group w-full md:w-auto mt-2 md:mt-0"
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Sign Out
          </button>
        </div>

        {/* User card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 flex items-center gap-5 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-inner flex-shrink-0">
            <User className="w-8 h-8 text-white mix-blend-overlay" />
          </div>
          <div>
            <h2 className="text-slate-900 font-bold text-xl">
              {session?.user?.name || 'User'}
            </h2>
            <p className="text-slate-500 text-sm mt-0.5">
              {session?.user?.email}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="text-emerald-600 text-xs font-semibold tracking-wide">
                Active session
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-${stat.accent}-50`}>
                  {stat.icon}
                </div>
                <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <p className="text-slate-900 font-bold text-lg">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Session details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-5 tracking-tight border-b border-slate-100 pb-4">
            Session Details
          </h3>
          <div className="space-y-4">
            {[
              { key: 'User ID', value: session?.user?.id },
              { key: 'Session ID', value: session?.session?.id },
              {
                key: 'Expires',
                value: new Date(
                  session?.session?.expiresAt || '',
                ).toLocaleString(),
              },
            ].map(({ key, value }) => (
              <div
                key={key}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              >
                <span className="text-slate-500 text-sm w-28 flex-shrink-0 font-medium">
                  {key}
                </span>
                <code className="text-blue-700 text-xs font-mono bg-blue-50/50 border border-blue-100 px-3 py-1.5 rounded-lg break-all">
                  {value}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
