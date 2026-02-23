import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@repo/ui/components/tooltip';
import { useQuery } from '@tanstack/react-query';
import {
  createFileRoute,
  stripSearchParams,
  type SearchSchemaInput,
} from '@tanstack/react-router';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Search,
  Trash,
  TerminalSquare,
} from 'lucide-react';
import * as v from 'valibot';
import type { RouterOutput } from '@repo/api/client';
import CreatePostButton from './-components/create-post';
import DeletePostButton from './-components/delete-post';
import {
  postsSearchDefaults,
  postsSearchSchema,
  type PostSearchSchema,
} from './-validations/posts-link-options';
import { apiClient } from '#/clients/apiClient';

export const Route = createFileRoute('/dashboard/posts/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(apiClient.posts.all.queryOptions()),
  component: RouteComponent,
  validateSearch: (input: SearchSchemaInput) =>
    v.parse(postsSearchSchema, input),
  search: {
    middlewares: [stripSearchParams(postsSearchDefaults)],
  },
  errorComponent: ({ error }) => {
    return (
      <div className="flex flex-col items-center justify-center p-12 w-full gap-y-4 text-slate-500">
        <div className="p-4 bg-red-50 rounded-full text-red-500">
          <TerminalSquare className="w-8 h-8" />
        </div>
        <p className="font-semibold text-slate-800">Something went wrong</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  },
});

function PostItem({
  post,
  disabled,
}: Readonly<{
  post: RouterOutput['posts']['all'][number];
  disabled: boolean;
}>) {
  return (
    <Link
      to="/dashboard/posts/$postid"
      params={{ postid: post.id }}
      className="bg-card border border-border p-6 w-full flex items-center justify-between gap-4 rounded-xl hover:shadow-md transition-all shadow-sm group"
      disabled={disabled}
    >
      <div className="flex flex-col gap-y-1.5 flex-1 min-w-0">
        <div className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {post.title}
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>

      <div className="shrink-0 flex gap-2" onClick={(e) => e.preventDefault()}>
        <DeletePostButton postId={post.id}>
          <Trash className="w-4 h-4" />
        </DeletePostButton>
      </div>
    </Link>
  );
}

function RouteComponent() {
  const { data: posts, isPending } = useQuery(
    apiClient.posts.all.queryOptions(),
  );
  const navigate = useNavigate({ from: Route.fullPath });
  const search = Route.useSearch();

  const updateFilters = (name: keyof PostSearchSchema, value: unknown) => {
    navigate({ search: (prev) => ({ ...prev, [name]: value }) });
  };

  const lowercaseSearch = search.searchString.toLowerCase();
  const filteredPost = posts
    ?.filter((p) => p.title.toLowerCase().includes(lowercaseSearch))
    ?.sort((a, b) =>
      search.sortDirection === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] bg-background p-4 md:p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Posts
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all your published articles.
            </p>
          </div>
          <CreatePostButton />
        </div>

        {/* Toolbar */}
        <div className="bg-card border border-border p-2 pl-4 rounded-xl flex flex-col sm:flex-row justify-between items-center sm:gap-4 gap-2 shadow-sm mb-6">
          <div className="relative w-full sm:max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              value={search.searchString}
              onChange={(e) => updateFilters('searchString', e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-9 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-10 shadow-none"
            />
          </div>
          <div className="h-px w-full sm:w-px sm:h-8 bg-border hidden sm:block" />
          <TooltipProvider delay={0}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    className="w-full sm:w-auto h-10 text-muted-foreground hover:text-foreground hover:bg-muted gap-2 font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      updateFilters(
                        'sortDirection',
                        search.sortDirection === 'asc' ? 'desc' : 'asc',
                      );
                    }}
                  >
                    <span>
                      Sort{' '}
                      {search.sortDirection === 'asc' ? 'Oldest' : 'Newest'}
                    </span>
                    {search.sortDirection === 'asc' ? (
                      <ArrowUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </Button>
                }
              />
              <TooltipContent
                side="top"
                align="center"
                sideOffset={8}
                className="bg-slate-900 text-white rounded-lg px-3 py-1.5 text-xs font-semibold"
              >
                <span>Toggle date order</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* List */}
        <div className="flex flex-col gap-y-3">
          {filteredPost?.length ? (
            filteredPost.map((p) => (
              <PostItem key={p.id} post={p} disabled={isPending} />
            ))
          ) : (
            <div className="bg-card border border-border border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center mt-2 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 border border-border">
                <TerminalSquare className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                No posts found
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Get started by creating your first post using the button above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
