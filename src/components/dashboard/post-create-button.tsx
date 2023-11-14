"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@components/Icon";
import { useMutation } from "react-query";
import { PostCreationRequest } from "@lib/validators/post";
import axios from "axios";

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { mutate: createPost } = useMutation({
    mutationFn: async ({ title,published }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, published };
      const { data } = await axios.post("/api/post/create", payload);
      return data;
    },

    onError: () => {
      setIsLoading(false);
      toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      console.log("data", data);
      router.refresh();

      router.push(`/editor/${data.id}`);
      setIsLoading(false);
    },
  });

  async function onClick() {
    setIsLoading(true);

    const payload: PostCreationRequest = {
      title: "Untitled Post",
      published: false
    };

    createPost(payload);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New post
    </button>
  );
}
