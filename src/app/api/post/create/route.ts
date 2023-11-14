import { db } from "@/lib/db";
import { PostValidator } from "@lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const { postId, title, content } = PostValidator.parse(body);

  try {
    const newPost = await db.post.create({
      data: {
        title: title,
        content: content,
        authorId: "author3455",
      },
    });


    return new Response(JSON.stringify(newPost))

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not post at this time. Please try later", {
      status: 500,
    });
  }
}
