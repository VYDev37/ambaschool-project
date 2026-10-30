import { useEffect } from 'react'
import {
  useVocabularyStore,
  selectVocabularyItems,
  selectVocabularyLoading,
  selectVocabularyError
} from '../store/VocabularyStore'

export function useVocabulary() {
  const vocabulary = useVocabularyStore(selectVocabularyItems)
  const isLoading = useVocabularyStore(selectVocabularyLoading)
  const error = useVocabularyStore(selectVocabularyError)
  const fetchVocabulary = useVocabularyStore((state) => state.fetchVocabulary)

  useEffect(() => {
    fetchVocabulary()
  }, [fetchVocabulary])

  return {
    vocabulary,
    totalCount: vocabulary.length,
    isLoading,
    error,
    refetch: fetchVocabulary
  }
}

export default useVocabulary
