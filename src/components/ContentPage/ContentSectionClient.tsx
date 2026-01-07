'use client'

import { useRef } from 'react'
import type { Study, Transcription } from '@/types/content'
import { TranscriptSection } from './TranscriptSection'
import type { YouTubePlayerRef } from './YouTubePlayer'
import { YouTubePlayer } from './YouTubePlayer'

type ContentSectionClientProps = {
  study: Study
}

export function ContentSectionClient({ study }: ContentSectionClientProps) {
  const youtubePlayerRef = useRef<YouTubePlayerRef>(null)

  return (
    <div className="flex h-full flex-col gap-6 px-2">
      {/* YouTube Video Section */}
      <YouTubePlayer
        ref={youtubePlayerRef}
        sourceUrl={study.sourceUrl}
        title={study.title}
      />

      {/* Transcription Section */}
      {study.transcript && (
      <TranscriptSection
          transcript={study.transcript}
          youtubePlayerRef={youtubePlayerRef}
        />
      )}
    </div>
  )
}
