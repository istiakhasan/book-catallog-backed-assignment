import { z } from 'zod';

export const bookZodValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({ required_error: 'author is required' }),
    genre: z.string({ required_error: 'Genre is required' }),
    price: z.number({ required_error: 'price is required' }),
    publicationDate: z.string({
      required_error: 'Publication date is required',
    }),
    categoryId: z.string({ required_error: 'Category id is required' }),
  }),
});
