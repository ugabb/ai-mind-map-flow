import { useEffect, useState } from 'react'
import { useNodeStore } from '@/store/NodeStore'

type FlashCard = {
  _id: string
  question: string
  answer: string
  hint: string
  explanation: string
  is_starred: boolean
}

export function useFlashCard() {
  const { currentMindMap } = useNodeStore()
  const [flashcards, setFlashcards] = useState<FlashCard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Load flashcards from the example data or current mind map
  useEffect(() => {
    // For now, using the example data. In a real app, this would come from the current mind map
    const exampleFlashcards = [
      {
        _id: 'cfc-1f892f07-e09c-44ff-8317-dcf66d77e538',
        question: 'What does the speaker say is rarer than a moment of focus?',
        answer: 'Few things in his life are rarer than a moment of focus',
        hint: 'Rarity comparison',
        explanation:
          'He states that few things in life are rarer than a moment of focus.',
        is_starred: false,
      },
      {
        _id: 'cfc-c5f66fa1-1db9-487d-a917-d77cbeb32544',
        question: 'What moment is the author chasing in life?',
        answer: 'the moment where I know what I have to',
        hint: 'A moment of certainty about action.',
        explanation:
          'The author states they live their life chasing that moment of knowing what they have to do.',
        is_starred: false,
      },
      {
        _id: 'cfc-b3455171-36b8-4225-a63b-4e88ea97ec2a',
        question: 'What does the speaker say about his ability to stay still?',
        answer: "He can't stay still for a second",
        hint: 'Restlessness',
        explanation:
          'He describes himself as unable to stay still for even a moment.',
        is_starred: false,
      },
    ]
    setFlashcards(exampleFlashcards)
  }, [])

  const currentCard = flashcards[currentIndex]
  const progress = ((currentIndex + 1) / flashcards.length) * 100

  const handleShowAnswer = () => {
    setShowAnswer(true)
  }

  const handleNextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
      setShowHint(false)
    }
  }

  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
      setShowHint(false)
    }
  }

  const toggleStar = () => {
    setFlashcards((prev) =>
      prev.map((card, index) =>
        index === currentIndex
          ? { ...card, is_starred: !card.is_starred }
          : card
      )
    )
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  return {
    currentCard,
    progress,
    handleShowAnswer,
    handleNextCard,
    handlePreviousCard,
    toggleStar,
    toggleHint,
    currentIndex,
    flashcards,
    showHint,
    showAnswer,
  }
}
