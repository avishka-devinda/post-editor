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





export default async function DashboardPage() {

  
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      image:true,
      published: true,
      authorId: true,
      hasDescription: true,
      hasImage: true,
      createdAt: true,
      updatedAt: true,
    }
  })




  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Posts</h3>
            <p className="text-sm text-muted-foreground">
              Create and manage posts.
            </p>
          </div>
          {/* <Link href="/edior/1234" className={`${buttonVariants()}`}>
            <Plus className="w-4 h-4 mr-2" />
            new post
          </Link> */}
          <PostCreateButton>new post</PostCreateButton>
        </div>

        <div className="w-full h-20 ">
          {posts?.map((post: any, index: number) => (
            <PostCard
              key={index}
              id={post.id}
              title={post.title}
              image={post.image}
              published={post.published}
              date={post.updatedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

