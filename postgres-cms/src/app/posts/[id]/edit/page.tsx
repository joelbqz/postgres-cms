"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockPosts } from "@/data/posts";
import { use } from "react";

const postSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  content: z.string().min(1, "El contenido es requerido"),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function EditPostView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const post = mockPosts.find((p) => p.id === unwrappedParams.id);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: PostFormValues) => {
      console.log("Updated post data:", data);
      return Promise.resolve();
    },
    onSuccess: () => {
      console.log("Post updated successfully");
    },
  });

  if (!post) return <div>Post not found</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl text-center font-bold mb-5">Edit Post</h1>

      <div className="max-w-2xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
