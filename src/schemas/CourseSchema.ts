import { z } from 'zod'

export const DialogueLineSchema = z.object({
  speaker: z.string(),
  role: z.string(),
  hanji: z.string(),
  poj: z.string(),
  indo: z.string()
})

export const VocabGlossarySchema = z.object({
  hanji: z.string(),
  poj: z.string(),
  indo: z.string()
})

export const CourseQuizSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).min(2),
  correct: z.number().int().min(0),
  explanation: z.string()
})

export const CourseModuleSchema = z.object({
  id: z.number().int().positive(),
  level: z.string(),
  category: z.string(),
  track: z.string(),
  title: z.string(),
  subtitle: z.string(),
  duration: z.string(),
  badge: z.string(),
  culturalNote: z.string(),
  dialogue: z.array(DialogueLineSchema),
  vocab: z.array(VocabGlossarySchema),
  quiz: CourseQuizSchema
})

export const CourseListSchema = z.array(CourseModuleSchema)

export type DialogueLine = z.infer<typeof DialogueLineSchema>
export type VocabGlossary = z.infer<typeof VocabGlossarySchema>
export type CourseQuiz = z.infer<typeof CourseQuizSchema>
export type CourseModule = z.infer<typeof CourseModuleSchema>
export type CourseList = z.infer<typeof CourseListSchema>
