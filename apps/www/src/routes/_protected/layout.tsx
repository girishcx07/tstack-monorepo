import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router';
import { authClient } from '#/lib/auth-client';
import Spinner from '#/components/layout/Spinner';

export const Route = createFileRoute('/_protected/layout')({
  component: Layout,
});

function Layout() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Spinner />;
  }

  if (!session?.user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
