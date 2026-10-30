import { z } from 'zod'

export const VocabularyItemSchema = z.object({
  id: z.number().int().positive(),
  hanji: z.string().min(1),
  poj: z.string().min(1),
  tailo: z.string().optional().default(''),
  indo: z.string().min(1),
  category: z.string(),
  dialect: z.string(),
  example: z.string(),
  usage: z.string().optional().default(''),
  tone: z.string().optional().default(''),
  tags: z.array(z.string()).default([])
})

export const VocabularyListSchema = z.array(VocabularyItemSchema)

export type VocabularyItem = z.infer<typeof VocabularyItemSchema>
export type VocabularyList = z.infer<typeof VocabularyListSchema>
