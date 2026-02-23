import { Button } from '@repo/ui/components/button';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@repo/ui/components/tooltip';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, RefreshCw, User, Calendar, FileText } from 'lucide-react';
import { postsLinkOptions } from '../-validations/posts-link-options';
import { apiClient } from '#/clients/apiClient';

export const Route = createFileRoute('/dashboard/posts/$postid/')({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(
      apiClient.posts.one.queryOptions({ input: { id: params.postid } }),
    ),
  component: RouteComponent,
  errorComponent: ({ error, reset }) => {
    return (
      <div className="flex flex-col items-center justify-center p-12 w-full gap-y-4 text-slate-500 bg-slate-50 min-h-[50vh]">
        <div className="p-4 bg-red-50 rounded-full text-red-500">
          <FileText className="w-8 h-8" />
        </div>
        <p className="font-semibold text-slate-800 text-lg">
          Failed to load post
        </p>
        <p className="text-sm">{error.message}</p>
        <div className="flex gap-3 mt-4">
          <Button
            render={<Link {...postsLinkOptions} />}
            variant="outline"
            className="w-full bg-white border-slate-200"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Go Back
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              // Reset the router error boundary
              reset();
            }}
            className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            Retry <RefreshCw className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  },
});

function RouteComponent() {
  const post = Route.useLoaderData();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl relative">
        <TooltipProvider delay={0}>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  className="absolute -left-16 top-0 hidden xl:flex h-10 w-10 p-0 rounded-full border-slate-200 bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-900 shadow-sm transition-all"
                />
              }
            >
              <Link
                {...postsLinkOptions}
                className="flex items-center justify-center w-full h-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              align="center"
              sideOffset={8}
              className="bg-slate-900 text-white rounded-lg px-3 py-1.5 text-xs font-semibold"
            >
              <span>Back to posts</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Mobile Back Button */}
        <Link
          {...postsLinkOptions}
          className="xl:hidden inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to posts
        </Link>

        {/* Post Header */}
        <div className="bg-white rounded-t-3xl border border-slate-200 border-b-0 p-8 md:p-12 pb-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-slate-700">{post.author.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="bg-white rounded-b-3xl border border-slate-200 p-8 md:p-12 pt-8 shadow-sm min-h-[400px]">
          <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-700 prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 font-sans text-lg">
            {post.content ? (
              <p className="whitespace-pre-wrap">{post.content}</p>
            ) : (
              <p className="italic text-slate-400">No content available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
