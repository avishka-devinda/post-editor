import {z} from 'zod';

export const PostValidator = z.object({
    title:z.string().min(3, {message: 'Tittle must be longer than 3 characters'})
    .max(128, {message: 'Title must be at least 128 characters'}),
    postId: z.string().optional(),
    content:z.any().optional(),
})

export type PostCreationRequest = z.infer<typeof PostValidator>



export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})
