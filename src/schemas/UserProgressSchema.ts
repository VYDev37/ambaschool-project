import { z } from 'zod'

export const UserProgressSchema = z.object({
  savedPojList: z.array(z.string()).default([]),
  completedLessonIds: z.array(z.number().int()).default([]),
  streak: z.number().int().default(0),
  totalDays: z.number().int().default(0),
  lastVisit: z.string().nullable().default(null),
  weeklyProgress: z.array(z.number()).default([0, 0, 0, 0, 0, 0, 0])
})

export type UserProgress = z.infer<typeof UserProgressSchema>
