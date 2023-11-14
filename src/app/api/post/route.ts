import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const posts = await db.post.findMany({
      select: {
        id: true,
        title: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
