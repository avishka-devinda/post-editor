"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast, useToast } from "@/components/ui/use-toast";
import { Icons } from "@components/Icon";
import { Button, buttonVariants } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import axios from "axios";
import { PostCreationRequest } from "@lib/validators/post";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Progress } from "@components/ui/progress";

interface PostOperationsProps {
  post: Pick<
    Post,
    "id" | "title" | "description" | "image" | "hasImage" | "hasDescription"
  >;
}

const CustomOperations = ({ post }: PostOperationsProps) => {
  const router = useRouter();
  const [showDelete, setShowDelete] = React.useState<boolean>(false);
  const [showCustomImage, setCustomImage] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<String>(""); // Declare the file variable with the File type

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null); // Declare the file variable with the File type
  const [progress, setProgress] = useState(0);

  async function addDescription({ postId, title }: PostCreationRequest) {
    console.log(description);
    const payload: PostCreationRequest = { title, postId, description, hasDescription:true };

    console.log(payload);
    const data = await axios.patch(`/api/post/${postId}`, payload);

    if (data.status === 200) {
      toast({
        title: "description saved",
      });
    } else {
      toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      });
    }
    router.refresh();
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target;
    if (inputElement.files && inputElement.files[0]) {
      // Access the first file from the input element's files array
      const file = inputElement.files[0];

      // Create a new FormData object
      const formData = new FormData();

      formData.append("file", file);

      try {
        const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL!


        const CLOUDINARY_UPLOAD_PRESET =
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

        const response = await axios.post(CLOUDINARY_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            upload_preset: CLOUDINARY_UPLOAD_PRESET,
          },
          onUploadProgress: (progressEvent: any) => {
            const percentage =
              (progressEvent.loaded * 100) / progressEvent.total;
            setProgress(+percentage.toFixed(2));
          },
        });
        console.log(response.data);

        if (response.data) {
          // If the response is successful, parse the JSON response
          const data = response.data;

          console.log("File uploaded successfully:", data);
          console.log("imageurl", data.secure_url, data.url);
          // Assuming `data.url` contains the URL of the uploaded file
          // Set the image URL in your component's state or wherever needed
          setImageUrl(`${data.secure_url}`);
          console.log(data.url);
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  const onSubmit = async () => {
    const postId = post.id;
    const image = `${imageUrl}`;
    const title = post.title;
    console.log(image, "img");
    const payload: PostCreationRequest = { title, postId, description, image,hasImage:true };
    console.log(payload);
    const data = await axios.patch(`/api/post/${postId}`, payload);

    console.log("data", data);

    if (data.status === 200) {
      toast({
        title: "image saved",
      });
    } else {
      toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      });
    }
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-2 flex h-10 w-10 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onSelect={() => setShowDelete(true)}
          >
            custom description
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onSelect={() => setCustomImage(true)}
          >
            custom Image
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Custom description</DialogTitle>
            <DialogDescription>
              Make changes to your decription here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message-2" className="sr-only">
              Your Message
            </Label>
            <Textarea
              placeholder="Type your description here."
              defaultValue={
                post.description === "no-description"
                  ? ""
                  : post.description || ""
              }
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Your message will be copied to the support team.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() =>
                addDescription({ postId: post.id, title: post.title })
              }
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCustomImage} onOpenChange={setCustomImage}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload custom image</DialogTitle>
            <DialogDescription>
              Make changes to your image here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div>
            {post.image && post.image !== "no-image" && progress < 100 && (
              <Image
                src={`${post.image}`}
                width={300}
                height={300}
                className="w-46 h-46 rounded-md mx-auto mb-4"
                alt="Profile Image"
              />
            )}
            {imageUrl ? (
              <Image
                src={`${imageUrl}`}
                width={400}
                height={400}
                className="w-46 h-46 rounded-md mx-auto mb-4"
                alt="Profile Image"
              />
            ) : (
              <div className="p-16 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-center">
                {progress > 0 ? (
                  <div>
                    <div className="mt-5 center flex justify-center">
                      <Progress value={100} className="w-[60%]" />
                    </div>
                    <div className="mt-2 text-sm"> {progress}%</div>
                  </div>
                ) : (
                  <label
                    htmlFor="uploadImg"
                    className={`${buttonVariants()} rounded-full font-semibold text-md `}
                  >
                    <UploadCloud className="mr-2 h-4 w-4" />
                    <input
                      id="uploadImg"
                      type="file"
                      onChange={handleFileChange}
                      hidden
                    />
                    upload profile image
                  </label>
                )}

                <p className="mt-5 text-sm font-light text-zinc-800 dark:text-zinc-200">
                  Max image size: 2MB, supports JPG and PNG formats
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={onSubmit} className=" w-24">
              Save{" "}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomOperations;
