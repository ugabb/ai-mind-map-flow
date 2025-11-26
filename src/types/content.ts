export type TranscriptChunk = {
  id: string
  lang: string
  text: string
  offset: number
  duration: number
  transcriptId: string
}

export type Transcription = {
  id: string
  lang: string
  availabeLangs: string[]
  createdAt: string
  updatedAt: string
  contentId: string
  chunks: TranscriptChunk[]
}

export type Content = {
  id: string
  title: string
  content: string
  sourceContent: string
  sourceUrl: string
  createdAt: string
  updatedAt: string
  userId: string

  transcription: Transcription
}
