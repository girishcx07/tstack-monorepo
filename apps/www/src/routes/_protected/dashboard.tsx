import { createFileRoute, useRouter } from '@tanstack/react-router';
import { authClient } from '#/clients/authClient';
import { LogOut, User, ShieldCheck, Zap, Globe } from 'lucide-react';

export const Route = createFileRoute('/_protected/dashboard')({
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
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      label: 'Auth Status',
      value: 'Authenticated',
      accent: 'emerald',
    },
    {
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      label: 'Session Type',
      value: 'Cookie Cache',
      accent: 'cyan',
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      label: 'App Mode',
      value: 'SSR (TanStack)',
      accent: 'blue',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header row */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-slate-400 text-sm uppercase tracking-widest font-medium mb-1">
              Dashboard
            </p>
            <h1 className="text-3xl font-bold text-white">
              Hello, {session.user.name || 'there'} 👋
            </h1>
            <p className="text-slate-400 mt-1.5 text-sm">
              {session.user.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/40 text-slate-300 hover:text-red-400 rounded-xl text-sm font-medium transition-all duration-200 group"
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Sign Out
          </button>
        </div>

        {/* User card */}
        <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 mb-6 flex items-center gap-5 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">
              {session.user.name || 'User'}
            </h2>
            <p className="text-slate-400 text-sm">{session.user.email}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-medium">
                Active session
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 backdrop-blur-sm hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-3">
                {stat.icon}
                <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
              <p className="text-white font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Session details */}
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-6">
          <h3 className="text-slate-300 font-semibold mb-4 text-sm uppercase tracking-widest">
            Session Details
          </h3>
          <div className="space-y-3">
            {[
              { key: 'User ID', value: session.user.id },
              { key: 'Session ID', value: session.session.id },
              {
                key: 'Expires',
                value: new Date(session.session.expiresAt).toLocaleString(),
              },
            ].map(({ key, value }) => (
              <div key={key} className="flex items-start gap-4">
                <span className="text-slate-500 text-xs w-24 flex-shrink-0 pt-0.5 font-medium">
                  {key}
                </span>
                <code className="text-cyan-400 text-xs font-mono bg-slate-900/50 px-2.5 py-1 rounded-lg break-all">
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
