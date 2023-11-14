
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { PostValidator } from "@lib/validators/post";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})


export async function PATCH(
    req: Request,
    context: z.infer<typeof routeContextSchema>
  ) {
    try {
      // Validate route params.
      const { params } = routeContextSchema.parse(context)
  

  
      // Get the request body and validate it.
      const json = await req.json()
      const body = PostValidator.parse(json)


      console.log('desc',body.description)
      // Update the post.
      // TODO: Implement sanitization for content.
      await db.post.update({
        where: {
          id: params.postId,
        },
        data: {
          title: body.title,
          content: body.content,
          image:body.image,
          description:body.description,
          hasImage: body.hasImage,
          hasDescription: body.hasDescription
        },
      })
  
      return new Response(null, { status: 200 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues), { status: 422 })
      }
  
      return new Response(null, { status: 500 })
    }
  }
  

  
export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

   
    // Delete the post.
    await db.post.delete({
      where: {
        id: params.postId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
