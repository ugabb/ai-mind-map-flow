"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNodeStore } from "@/store/NodeStore";
import {
  Lightbulb,
  Star,
  Share2,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useFlashCard } from "./useFlashCard";
import { motion, AnimatePresence } from "framer-motion";

interface FlashCard {
  _id: string;
  question: string;
  answer: string;
  hint: string;
  explanation: string;
  is_starred: boolean;
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
  } = useFlashCard();

  if (!currentCard) {
    return (
      <div className="flex-1 m-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No flashcards available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 m-0 flex flex-col h-full">
      {/* Header with back button and progress */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="sm" className="p-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2 flex-1 mx-4">
          <span className="text-sm font-medium">{currentIndex + 1}</span>
          <Progress value={progress} className="flex-1 h-2" />
          <span className="text-sm font-medium">{flashcards.length}</span>
        </div>
        <Button variant="ghost" size="sm" className="p-2">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col p-4">
        {/* Flashcard */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            key={currentCard?._id}
            animate={{ rotateY: showAnswer ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="h-full"
          >
            {/* Front side - Question */}
            <motion.div
              style={{ backfaceVisibility: "hidden" }}
              className="h-full"
            >
              <Card
                className="flex-1 flex flex-col cursor-pointer hover:shadow-md transition-shadow border-dashed h-full"
                onClick={handleShowAnswer}
              >
                <CardContent className="flex-1 flex flex-col p-8 relative">
                  {/* Hint button inside card at top left */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleHint();
                    }}
                    className="absolute top-4 left-4 flex items-center gap-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Hint
                  </Button>

                  {/* Star button inside card at top right */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar();
                    }}
                    className="absolute top-4 right-4 p-2"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        currentCard.is_starred
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>

                  <div className="text-center flex-1 flex flex-col justify-center">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Question</h2>
                      <p className="text-lg leading-relaxed mb-4">
                        {currentCard.question}
                      </p>

                      {/* Hint display below question */}
                      {showHint && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="mt-4 p-3 rounded-lg"
                        >
                          <p className="text-sm text-muted-foreground">
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
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
              className="absolute inset-0 h-full"
            >
              <Card
                className="flex-1 flex flex-col cursor-pointer hover:shadow-md transition-shadow border-dashed h-full"
                onClick={handleShowAnswer}
              >
                <CardContent className="flex-1 flex flex-col p-8 relative">
                  {/* Hint button inside card at top left */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleHint();
                    }}
                    className="absolute top-4 left-4 flex items-center gap-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Hint
                  </Button>

                  {/* Star button inside card at top right */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar();
                    }}
                    className="absolute top-4 right-4 p-2"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        currentCard.is_starred
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>

                  <div className="text-center flex-1 flex flex-col justify-center">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Answer</h2>
                      <p className="text-lg leading-relaxed mb-4">
                        {currentCard.answer}
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium mb-2">Explanation:</p>
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
            variant="outline"
            onClick={handlePreviousCard}
            disabled={currentIndex === 0}
            className="flex items-center gap-2"
            size={"icon"}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          {!showAnswer ? (
            <Button onClick={handleShowAnswer} className="flex-1 mx-4">
              Tap to show answer
            </Button>
          ) : (
            <Button onClick={handleNextCard} className="flex-1 mx-4">
              Next Card
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleNextCard}
            disabled={currentIndex === flashcards.length - 1}
            className="flex items-center gap-2"
            size={"icon"}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
