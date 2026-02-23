import { Button } from '@repo/ui/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui/components/tooltip';
import { cn } from '@repo/ui/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ReactNode } from 'react';
import { apiClient } from '#/clients/apiClient';

// Fallback Spinner
const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function DeletePostButton({
  children,
  className,
  postId,
}: Readonly<{
  children: ReactNode;
  className?: string;
  postId: string;
}>) {
  const { refetch } = useQuery(apiClient.posts.all.queryOptions());

  const deletePostMutation = useMutation(
    apiClient.posts.delete.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await refetch();
        toast.info('Post deleted successfully.');
      },
    }),
  );
  return (
    <TooltipProvider delay={0}>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              disabled={deletePostMutation.isPending}
              onClick={(e) => {
                e.preventDefault();
                deletePostMutation.mutate({ id: postId });
              }}
              variant="outline"
              className={cn(
                'h-10 w-10 p-0 border-slate-200 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-400 rounded-xl transition-all shadow-sm',
                className,
              )}
            >
              {deletePostMutation.isPending ? <Spinner /> : children}
            </Button>
          }
        />
        <TooltipContent
          side="left"
          align="center"
          sideOffset={4}
          className="bg-slate-900 text-white rounded-lg px-3 py-1.5 text-xs font-semibold"
        >
          <span>Delete Post</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
