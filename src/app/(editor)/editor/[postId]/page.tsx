import Editor from "@components/dashboard/editor";
import db from "@lib/db";
import { postPatchSchema } from "@lib/validators/post";
import React, { FC } from "react";
import type { Post, User } from "@prisma/client";
import { notFound } from "next/navigation";

interface EditorPageProps {
  params: { postId: string };
}

async function getPostForUser(postId: Post["id"]) {
  return await db.post.findUnique({
    where: {
      id: postId,
    },
  });
}

export default async function EditorPage({ params }: EditorPageProps) {

  // const posts = await db.post.findUnique({
  //   where: {
  //     id: params.postId,
  //   },
  // });

  const post = await getPostForUser(params.postId);

  if (!post) {
    notFound()
  }
  
  return (
    <div>
      <Editor
        post={{
          id: post.id,
          title: post.title,
          content: post.content,
          description: post.description,
          image: post.image,
          hasDescription: post.hasDescription,
          hasImage: post.hasImage,
          published: post.published
        }}
      />
    </div>
  );
}
