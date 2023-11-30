import PostCard from "@components/dashboard/post-card";
import { PostCreateButton } from "@components/dashboard/post-create-button";
import { Badge } from "@components/ui/badge";
import { Button, buttonVariants } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import db from "@lib/db";
import axios from "axios";
import { CheckCircle2, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { cache } from "react"


const getPostsForUser = cache(async () => {
  return await db.post.findMany({
    where: {
      published: true
    },
    select: {
      id: true,
      title: true,
      image:true,
      authorId: true,
      hasDescription: true,
      hasImage: true,
      createdAt: true,
      updatedAt: true,
    },
  });
})

export default async function DashboardPage() {

  const posts = await getPostsForUser()

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Published Posts</h3>
            <p className="text-sm text-muted-foreground">
              your can see your all published posts
            </p>
          </div>
       
          <PostCreateButton>new post</PostCreateButton>
        </div>

        <div className="w-full h-20 ">
          {posts?.map((post: any, index: number) => (
            <PostCard
              key={index}
              id={post.id}
              title={post.title}
              image={post.image}
              published="published"
              date={post.updatedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

