import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { authClient } from '#/clients/authClient';

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: (search.tab as 'signin' | 'signup') || 'signin',
    };
  },
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
  const { tab: initialTab } = Route.useSearch();
  const [tab, setTab] = useState<Tab>(initialTab);
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-background p-4 md:p-8">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 sm:p-8">
        <div className="flex flex-col space-y-1.5 text-center mb-6">
          <h3 className="font-semibold tracking-tight text-2xl">
            {tab === 'signin' ? 'Welcome back' : 'Create an account'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {tab === 'signin'
              ? 'Enter your email below to login to your account'
              : 'Enter your information to create an account'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-muted rounded-lg">
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setError('');
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              tab === 'signin'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setError('');
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              tab === 'signup'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="m@example.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {tab === 'signin' && (
                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? 'Please wait...'
              : tab === 'signin'
                ? 'Sign In'
                : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
