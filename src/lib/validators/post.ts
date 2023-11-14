import {z} from 'zod';

export const PostValidator = z.object({
    title:z.string().min(3, {message: 'Tittle must be longer than 3 characters'})
    .max(128, {message: 'Title must be at least 128 characters'}),
    postId: z.string().optional(),
    content:z.any().optional(),
    image:z.string().optional(),
    description:z.string().optional(),
    hasImage: z.boolean().optional(),
    hasDescription: z.boolean().optional(),
    published: z.boolean()

})

export type PostCreationRequest = z.infer<typeof PostValidator>



export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
//  published: z.boolean(),
  content: z.any().optional(),
})
