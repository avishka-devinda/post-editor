"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostCreationRequest,
  PostValidator,
  postPatchSchema,
} from "@lib/validators/post";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import type EditorJS from "@editorjs/editorjs";
import { useToast } from "@components/ui/use-toast";
import { useMutation } from "react-query";
import axios from "axios";
import Link from "next/link";
import { Icons } from "@components/Icon";
import { Button, buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import {
  CheckCircle,
  CheckCircle2,
  ChevronLeft,
  CircleSlash,
  ShieldAlert,
} from "lucide-react";
import type { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import CustomOperations from "./custom-operations";
import { Badge } from "@components/ui/badge";
import React from "react";

interface EditorProps {
  post: Pick<
    Post,
    | "id"
    | "title"
    | "content"
    | "description"
    | "image"
    | "hasImage"
    | "hasDescription"
    | "published"
  >;
}

function deepEqual(obj1: any, obj2: any) {
  // Check if the objects are of the same type
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2;
  }

  // Get the keys of the objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all properties are deep equal
  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

const Editor: FC<EditorProps> = ({ post }: EditorProps) => {
  const { toast } = useToast();
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationRequest>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: post.title,
      postId: post.id,
      content: post.content,
      published: false,
    },
  });

  const _titleRef = useRef<HTMLTextAreaElement>(null);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    const body = postPatchSchema.parse(post);

  

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const CLOUDINARY_URL =
                    process.env.NEXT_PUBLIC_CLOUDINARY_URL!;

                  const CLOUDINARY_UPLOAD_PRESET =
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // Replace with your Cloudinary upload preset

                  try {
                    const response = await fetch(CLOUDINARY_URL, {
                      method: "POST",
                      body: formData,
                    });

                    if (response.ok) {
                      const data = await response.json();
                      // Use the response data from Cloudinary here, like the URL of the uploaded image
                      const imageUrl = data.secure_url;
                      // You can return this URL or use it as needed within your EditorJS instance
                      return {
                        success: 1,
                        file: {
                          url: imageUrl, // Return the uploaded image URL
                        },
                      };
                    } else {
                      // Handle error cases
                      return {
                        success: 0,
                        file: {
                          url: null,
                        },
                      };
                    }
                  } catch (error) {
                    // Handle fetch error
                    console.error("Error uploading to Cloudinary", error);
                    return {
                      success: 0,
                      file: {
                        url: null,
                      },
                    };
                  }
                },
              },
            },
          },
        },
       
      });
    }
  }, [post]);

  React.useEffect(() => {
    router.refresh();
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save();

    //check if have image
    let image;
    if (!post.hasImage) {
      image =
        blocks?.blocks[0]?.data?.file?.url ||
        blocks?.blocks[1]?.data?.file?.url ||
        "no-image";
    }

    //check description
    let description;
    if (!post.hasDescription) {
      description =
        blocks?.blocks[0]?.data.text ||
        blocks?.blocks[1]?.data.text ||
        "no-description";
    }
    console.log("description", description);

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      postId: post.id,
      description: description,
      image: image,
      published: true,
    };

    console.log("payload: ", payload);

    try {
      const response = await axios.patch(`/api/post/${post.id}`, payload);

      if (response.status === 200) {
        router.refresh();

        return toast({
          description: "Your post has been saved.",
        });
      } else {
        return toast({
          title: "Something went wrong.",
          description: "Your post was not saved. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving post:", error);
      // Handle the error as needed
      return toast({
        title: "Error",
        description:
          "An error occurred while saving your post. Please try again.",
        variant: "destructive",
      });
    }
  }


  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </>
            </Link>
            <div className="text-sm text-muted-foreground">
              {post.published ? (
                <p className="text-sm text-muted-foreground flex">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                  Published
                </p>
              ) : (
                <p className="text-sm text-muted-foreground flex">
                  <CircleSlash className="w-5 h-5 mr-2 text-red-500" />
                  draft
                </p>
              )}
            </div>

           
          </div>
        </div>
        <div className="flex">
          
        
          <button
            type="submit"
            form="post-form"
            className={cn(buttonVariants())}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
      </div>
      <form id="post-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full gap-10">
          <div className="flex w-full items-center justify-between"></div>
          <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
            <TextareaAutosize
              autoFocus
              id="title"
              defaultValue={post.title}
              placeholder="Post title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
              {...register("title")}
            />
            <div id="editor" className="min-h-[500px]" />
            <p className="text-sm text-gray-500">
              Use{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Editor;