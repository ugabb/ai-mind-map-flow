import type { Study, Transcription } from '@/types/content'
import { ContentSectionClient } from './ContentSectionClient'

type ContentSectionProps = {
  study: Study
}

export function ContentSection(props: ContentSectionProps) {
  const { study } = props

  return <ContentSectionClient study={study} />
}
