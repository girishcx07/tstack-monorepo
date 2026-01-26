import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/docs/')({
  component: DocsIndex,
});

function DocsIndex() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Documentation</h1>
      <p>Welcome to the docs!</p>
    </div>
  );
}
