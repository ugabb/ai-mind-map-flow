'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Lightbulb, Share2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useFlashCard } from './useFlashCard'

type FlashCard = {
  _id: string
  question: string
  answer: string
  hint: string
  explanation: string
  is_starred: boolean
}

export function FlashCardTab() {
  const {
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
  } = useFlashCard()

  if (!currentCard) {
    return (
      <div className="m-0 flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No flashcards available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="m-0 flex h-full flex-1 flex-col">
      {/* Header with back button and progress */}
      <div className="flex items-center justify-between border-b p-4">
        <Button className="p-2" size="sm" variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="mx-4 flex flex-1 items-center gap-2">
          <span className="font-medium text-sm">{currentIndex + 1}</span>
          <Progress className="h-2 flex-1" value={progress} />
          <span className="font-medium text-sm">{flashcards.length}</span>
        </div>
        <Button className="p-2" size="sm" variant="ghost">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col p-4">
        {/* Flashcard */}
        <motion.div
          className="flex-1"
          style={{ perspective: '1000px' }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ rotateY: showAnswer ? 180 : 0 }}
            className="h-full"
            key={currentCard?._id}
            style={{ transformStyle: 'preserve-3d' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Front side - Question */}
            <motion.div
              className="h-full"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Card
                className="flex h-full flex-1 cursor-pointer flex-col border-dashed transition-shadow hover:shadow-md"
                onClick={handleShowAnswer}
              >
                <CardContent className="relative flex flex-1 flex-col p-8">
                  {/* Hint button inside card at top left */}
                  <Button
                    className="absolute top-4 left-4 flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleHint()
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Hint
                  </Button>

                  {/* Star button inside card at top right */}
                  <Button
                    className="absolute top-4 right-4 p-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStar()
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        currentCard.is_starred
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </Button>

                  <div className="flex flex-1 flex-col justify-center text-center">
                    <div>
                      <h2 className="mb-4 font-semibold text-xl">Question</h2>
                      <p className="mb-4 text-lg leading-relaxed">
                        {currentCard.question}
                      </p>

                      {/* Hint display below question */}
                      {showHint && (
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 rounded-lg p-3"
                          initial={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                        >
                          <p className="text-muted-foreground text-sm">
                            {currentCard.hint}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Back side - Answer */}
            <motion.div
              className="absolute inset-0 h-full"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <Card
                className="flex h-full flex-1 cursor-pointer flex-col border-dashed transition-shadow hover:shadow-md"
                onClick={handleShowAnswer}
              >
                <CardContent className="relative flex flex-1 flex-col p-8">
                  {/* Hint button inside card at top left */}
                  <Button
                    className="absolute top-4 left-4 flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleHint()
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Hint
                  </Button>

                  {/* Star button inside card at top right */}
                  <Button
                    className="absolute top-4 right-4 p-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStar()
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        currentCard.is_starred
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </Button>

                  <div className="flex flex-1 flex-col justify-center text-center">
                    <div>
                      <h2 className="mb-4 font-semibold text-xl">Answer</h2>
                      <p className="mb-4 text-lg leading-relaxed">
                        {currentCard.answer}
                      </p>
                      <div className="text-muted-foreground text-sm">
                        <p className="mb-2 font-medium">Explanation:</p>
                        <p>{currentCard.explanation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Action buttons */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            className="flex items-center gap-2"
            disabled={currentIndex === 0}
            onClick={handlePreviousCard}
            size={'icon'}
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          {showAnswer ? (
            <Button className="mx-4 flex-1" onClick={handleNextCard}>
              Next Card
            </Button>
          ) : (
            <Button className="mx-4 flex-1" onClick={handleShowAnswer}>
              Tap to show answer
            </Button>
          )}

          <Button
            className="flex items-center gap-2"
            disabled={currentIndex === flashcards.length - 1}
            onClick={handleNextCard}
            size={'icon'}
            variant="outline"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
