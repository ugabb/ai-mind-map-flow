export type TranscriptChunk = {
  id: string
  lang: string
  text: string
  offset: number
  duration: number
}

export type Transcription = {
  id: string
  lang: string
  availabeLangs: string[]
  createdAt: string
  updatedAt: string
  contentId: string
  transcriptChunks: TranscriptChunk[]
}

export type Study = {
  id: string
  title: string
  content: string
  sourceContent: string
  sourceUrl: string
  createdAt: string
  updatedAt: string
  userId: string

  transcript: Transcription
}
