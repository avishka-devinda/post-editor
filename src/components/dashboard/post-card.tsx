import { Badge } from '@components/ui/badge'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link';
import React, { FC } from 'react'
import { PostOperations } from './post-operations';

interface PostCardProps {
    title: string;
    image: string;
    published: string;
    date: string;
    id: string;
}

const PostCard: FC<PostCardProps>  = ({
title,image,published,date,id
}) => {

    
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
    <div  className="  p-3 bg-zinc-50 dark:bg-zinc-900  mt-5 rounded-lg">
        <Link href={`/editor/${id}`} className="flex justify-between">
            <div>
              <p className="px-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                {title}
              </p>
              <Badge
                variant="outline"
                className="text-green-500 my-1 mx-4 py-1 px-3 bg-white dark:bg-zinc-800 "
              >
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                Published
              </Badge>
              <div className="mx-4 my-1">
                <Badge variant="secondary" className="text-sm font-normal">{formatDateTime(date)}</Badge>
              </div>
            </div>

            <div className="">

              <img
                src="https://images.unsplash.com/photo-1682688759350-050208b1211c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Post card image"
                className="rounded-lg  w-24 h-24"
              />
            </div>
    </Link>
    <div className="flex items-center justify-end pt-2">
    <PostOperations post={{ id: id, title: title }} />
</div>
    </div>

  )
}

export default PostCard