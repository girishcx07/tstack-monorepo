import { isDefinedError } from '@repo/api/client';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Textarea } from '@repo/ui/components/textarea';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import * as v from 'valibot';
import { apiClient } from '#/clients/apiClient';

// Fallback Spinner if not copied over
const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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

const FormFieldInfo = ({ field }: { field: any }) => {
  return (
    <div className="h-4 mt-1 text-xs">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="text-red-500">
          {field.state.meta.errors.join(', ')}
        </span>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </div>
  );
};

const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(3, 'Please enter at least 3 characters'),
    v.maxLength(256, 'Please enter no more than 256 characters'),
  ),
  content: v.pipe(
    v.string(),
    v.minLength(5, 'Please enter at least 5 characters'),
    v.maxLength(512, 'Please enter no more than 512 characters'),
  ),
});

export default function CreatePostButton() {
  const getAllPostsQuery = useQuery(apiClient.posts.all.queryOptions());
  const createPostMutation = useMutation(
    apiClient.posts.create.mutationOptions(),
  );

  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      await createPostMutation
        .mutateAsync(
          {
            title: value.title,
            content: value.content,
          },
          {
            onSuccess: async () => {
              setOpenDialog(false);
              await getAllPostsQuery.refetch();
              toast.success('Your post has been created!');
              formApi.reset();
            },
            onError: (error) => {
              if (isDefinedError(error)) {
                toast.error(error.message);
              } else {
                toast.error(`${error.name} | ${error.message}`);
              }
            },
          },
        )
        .catch(() => {
          /* Error already handled */
        });
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger
        render={
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 rounded-xl px-5 h-11" />
        }
      >
        <Plus className="w-4 h-4" />
        Create Post
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-slate-200 bg-white rounded-2xl shadow-xl shadow-slate-200/50">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight">
            Create Post
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Share something new with the community.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-y-1"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="title"
              children={(field) => {
                return (
                  <>
                    <Label
                      htmlFor={field.name}
                      className="text-slate-700 font-semibold mb-1 block"
                    >
                      Title
                    </Label>
                    <Input
                      className="mt-1 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-blue-500"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Give it a catchy title..."
                    />
                    <FormFieldInfo field={field} />
                  </>
                );
              }}
            />
          </div>
          <div className="mt-2">
            <form.Field
              name="content"
              children={(field) => {
                return (
                  <>
                    <Label
                      htmlFor={field.name}
                      className="text-slate-700 font-semibold mb-1 block"
                    >
                      Content
                    </Label>
                    <Textarea
                      className="mt-1 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-blue-500 resize-none"
                      rows={6}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="What's on your mind?"
                    />
                    <FormFieldInfo field={field} />
                  </>
                );
              }}
            />
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenDialog(false)}
              className="rounded-xl font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="rounded-xl px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md shadow-blue-500/20"
                >
                  {isSubmitting ? <Spinner /> : `Publish`}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
