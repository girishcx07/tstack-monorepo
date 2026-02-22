import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from '@tanstack/react-router';
import { useState } from 'react';
import { authClient } from '#/clients/authClient';

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    // Redirect already-authenticated users
    if (context.session) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: LoginPage,
});

type Tab = 'signin' | 'signup';

function LoginPage() {
  const [tab, setTab] = useState<Tab>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tab === 'signin') {
        const { error } = await authClient.signIn.email({ email, password });
        if (error) throw new Error(error.message ?? 'Sign in failed');
      } else {
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
        });
        if (error) throw new Error(error.message ?? 'Sign up failed');
      }
      await router.invalidate();
      router.navigate({ to: '/dashboard' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-3xl font-sans mix-blend-overlay">
                T
              </span>
            </div>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {tab === 'signin' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
            {tab === 'signin'
              ? 'Sign in to continue to TStack'
              : 'Get started with TStack today'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50 p-8 md:p-10">
          {/* Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-8 gap-1">
            {(['signin', 'signup'] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setError('');
                }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  tab === t
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {t === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field — only for signup */}
            {tab === 'signup' && (
              <div className="animate-in slide-in-from-top-2 fade-in duration-200">
                <label className="block text-xs font-semibold text-slate-700 mb-2 font-sans tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Jane Smith"
                  className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 md:py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 font-sans tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 md:py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 font-sans tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="••••••••"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 md:py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3 animate-in fade-in duration-200 font-sans">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center p-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 text-sm shadow-[0_0_15px_rgba(37,99,235,0.2)]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {tab === 'signin' ? 'Signing in…' : 'Creating account…'}
                </span>
              ) : tab === 'signin' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-8 font-sans">
          By continuing, you agree to our{' '}
          <span className="text-slate-700 font-medium hover:text-blue-600 cursor-pointer transition-colors">
            Terms
          </span>{' '}
          &amp;{' '}
          <span className="text-slate-700 font-medium hover:text-blue-600 cursor-pointer transition-colors">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}
