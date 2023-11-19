import { Badge } from "@components/ui/badge";
import { CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { PostOperations } from "./post-operations";
import Image from "next/image";
import { Icons } from "@components/Icon";

interface PostCardProps {
  title: string;
  image: string;
  published: string;
  date: string;
  id: string;
  unsaved?: boolean
}

const PostCard: FC<PostCardProps> = ({ title, image, published, date,unsaved, id }) => {
  const formatDateTime = (datetimeString: string) => {
    const options = {
      weekday: "short", // or 'long' or 'narrow'
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const timeFormat: Intl.DateTimeFormatOptions = {
      weekday: "short", // or 'long' or 'narrow'
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(datetimeString).toLocaleString(undefined, timeFormat);
    // return new Date(datetimeString).toLocaleString(undefined, options);
  };
  return (
    <div className="  p-3 bg-zinc-50 dark:bg-zinc-900  mt-5 rounded-lg">
      <Link
        href={`/editor/${id}`}
        className="flex justify-between"
        as={`/editor/${id}`}
      >
        <div>
          <p className="px-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {title}
          </p>
           {unsaved && 
            <Badge
            variant="outline"
            className="bordertext-zinc-900 my-1 mx-4 py-1 px-3 bg-yellow-500 "
          >
            <ShieldAlert className="w-4 h-4 mr-2 text-zinc-900" />
            unsaved
          </Badge>
          }

          {!unsaved?
           published ? (
            <Badge
              variant="outline"
              className="text-green-500 my-1 mx-4 py-1 px-3 bg-white dark:bg-zinc-800 "
            >
              <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
              Published
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-yellow-500 my-1 mx-4 py-1 px-3 bg-white dark:bg-zinc-800 "
            >
              <ShieldAlert className="w-4 h-4 mr-2 text-yellow-500" />
              Unpublished
            </Badge>
          ):null }

         
          <div className="mx-4 my-1">
            <Badge variant="secondary" className="text-sm font-medium">
              <Clock className="w-4 h-4 mr-1" />
              {formatDateTime(date)}
            </Badge>
          </div>
        </div>

        <div className="">
          {image && image !== "no-image" && (
            <Image
              src={image}
              alt="Post card image"
              width={96} // Set your desired width
              height={96} // Set your desired height
              className="rounded-lg  w-24 h-24"
            />
          )}
        </div>
      </Link>
      <div className="flex items-center justify-end pt-2">
        <PostOperations post={{ id: id, title: title }} />
      </div>
    </div>
  );
};

export default PostCard;
