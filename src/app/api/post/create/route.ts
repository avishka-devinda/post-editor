import { db } from "@/lib/db";
import { PostValidator } from "@lib/validators/post";
import { z } from "zod";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"


export async function POST(req: Request) {
  const body = await req.json();

  const { postId, title, content,published } = PostValidator.parse(body);

  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const newPost:any = await db.post.create({
      data: {
        title: title,
        content: content,
        published:  published,
        authorId: user.id
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
