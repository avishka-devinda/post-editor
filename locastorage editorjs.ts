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
import { buttonVariants } from "@components/ui/button";
import { cn } from "@lib/utils";
import { CheckCircle2, ChevronLeft, CircleSlash } from "lucide-react";
import type { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import CustomOperations from "./custom-operations";
import { Badge } from "@components/ui/badge";

// interface EditorProps {
//   postId: string | undefined;
// }

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "description" | "image">;
}



const Editor: FC<EditorProps> = ({ post }: EditorProps) => {
  const { toast } = useToast();
  const router = useRouter();

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
    },
  });

  // const {} = useForm<PostCreationRequest({
  //   resolver: zodResolver(PostValidator),
  //   defaultValuse: {
  //     postId
  //   }
  // })

  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
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

    console.log(body);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post ...",
        data: body.content,
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const CLOUDINARY_URL =
                    "https://api.cloudinary.com/v1_1/dk8arygtb/image/upload";

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
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
        async onChange(api, event) {
          const data = await api.saver.save();
          console.log(data)
          const jsonDataString = JSON.stringify(data);

          localStorage.setItem(post.id, jsonDataString);
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value;
        toast({
          title: "Something went wrong.",
          description: (value as { message: string }).message,
          variant: "destructive",
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    router.refresh();
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { mutate: savePost } = useMutation({
    mutationFn: async ({
      title,
      content,
      postId,
      image,
      description
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, content, postId, image,description };
      const { data } = await axios.patch(`/api/post/${post.id}`, payload);
      return data;
    },

    onError: () => {
      toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "Your post has been saved.",
      });

      router.refresh();
    },
  });

  async function onSubmit(data: PostCreationRequest) {
    const blocks = await ref.current?.save();

    //check if have image
    const image =
    blocks?.blocks[0]?.data?.file?.url || blocks?.blocks[1]?.data?.file?.url || "no-image";

    //check description
   const description = blocks?.blocks[0]?.data.text || blocks?.blocks[1]?.data.text || "no-description";

   

    console.log('description',description)

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      postId: post.id,
      description: description,
      image: image,
    };

    console.log("payload: ", payload);

   savePost(payload);
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
            {true ? (
              <p className="text-sm text-muted-foreground flex items-center justify-center text-green-500  dark:bg-zinc-900 bg-zinc-50 p-2 rounded-xl">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Published
              </p>
            ) : (
              <p className="text-sm text-muted-foreground flex items-center justify-center text-red-500  dark:bg-zinc-900 bg-zinc-50 p-2 rounded-xl">
                <CircleSlash className="w-5 h-5 mr-2 text-red-500" />
                draft
              </p>
            )}
          </div>
          <div className="flex justify-center items-center ">
            <div className="mx-3 flex">
            <p className="mx-1 text-xs font-medium text-muted-foreground flex items-center justify-center !text-green-500 dark:text-green-500 border border-green-500  dark:bg-zinc-900 bg-white p-2 rounded-xl">
                custom description
              </p>
              <p className="mx-1 text-xs font-medium text-muted-foreground flex items-center justify-center !text-green-500 dark:text-green-500 border border-green-500  dark:bg-zinc-900 bg-white p-2 rounded-xl">
                custom Image
              </p>

            </div>
          <CustomOperations post={{ id: post.id, title: post.title, description: post.description, image:post.image }}  />
          <button type="submit" className={cn(buttonVariants())}>
            {false && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            <span>Save</span>
          </button>
          </div>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            // defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
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
  );
};

export default Editor;
