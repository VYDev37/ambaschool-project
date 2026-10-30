import { apiClient } from '../lib/ApiClient'
import { VocabularyItem, VocabularyListSchema } from '../schemas/VocabularySchema'
import { CourseModule, CourseListSchema } from '../schemas/CourseSchema'

// In-memory cache to prevent repeated downloads of large datasets
interface CacheStore {
  vocabulary: VocabularyItem[] | null
  medan: VocabularyItem[] | null
  courses: CourseModule[] | null
  practice: unknown[] | null
}

const cache: CacheStore = {
  vocabulary: null,
  medan: null,
  courses: null,
  practice: null
}

// In-flight promise tracker to deduplicate concurrent requests
const pendingRequests: Record<string, Promise<unknown>> = {}

/**
 * Fetch the master vocabulary list (13,200 entries).
 */
export async function fetchVocabulary(minified = true): Promise<VocabularyItem[]> {
  if (cache.vocabulary) {
    return cache.vocabulary
  }

  const endpoint = minified ? '/vocabulary.min.json' : '/vocabulary.json'

  if (!pendingRequests[endpoint]) {
    pendingRequests[endpoint] = apiClient
      .get(endpoint)
      .then((res) => {
        const parsed = VocabularyListSchema.safeParse(res.data)
        const data = parsed.success ? parsed.data : (res.data as VocabularyItem[])
        cache.vocabulary = data
        delete pendingRequests[endpoint]
        return data
      })
      .catch((err) => {
        delete pendingRequests[endpoint]
        throw err
      })
  }

  return pendingRequests[endpoint] as Promise<VocabularyItem[]>
}

export async function fetchMedanVocabulary(): Promise<VocabularyItem[]> {
  if (cache.medan) return cache.medan

  const endpoint = '/medan-vocabulary.json'
  if (!pendingRequests[endpoint]) {
    pendingRequests[endpoint] = apiClient
      .get(endpoint)
      .then((res) => {
        const parsed = VocabularyListSchema.safeParse(res.data)
        const data = parsed.success ? parsed.data : (res.data as VocabularyItem[])
        cache.medan = data
        delete pendingRequests[endpoint]
        return data
      })
      .catch((err) => {
        delete pendingRequests[endpoint]
        throw err
      })
  }

  return pendingRequests[endpoint] as Promise<VocabularyItem[]>
}

export async function fetchCourses(): Promise<CourseModule[]> {
  if (cache.courses) return cache.courses

  const endpoint = '/courses.json'
  if (!pendingRequests[endpoint]) {
    pendingRequests[endpoint] = apiClient
      .get(endpoint)
      .then((res) => {
        const parsed = CourseListSchema.safeParse(res.data)
        const data = parsed.success ? parsed.data : (res.data as CourseModule[])
        cache.courses = data
        delete pendingRequests[endpoint]
        return data
      })
      .catch((err) => {
        delete pendingRequests[endpoint]
        throw err
      })
  }

  return pendingRequests[endpoint] as Promise<CourseModule[]>
}

export async function fetchPractice(): Promise<unknown[]> {
  if (cache.practice) return cache.practice

  const endpoint = '/practice.json'
  if (!pendingRequests[endpoint]) {
    pendingRequests[endpoint] = apiClient
      .get(endpoint)
      .then((res) => {
        cache.practice = res.data as unknown[]
        delete pendingRequests[endpoint]
        return res.data
      })
      .catch((err) => {
        delete pendingRequests[endpoint]
        throw err
      })
  }

  return pendingRequests[endpoint] as Promise<unknown[]>
}
