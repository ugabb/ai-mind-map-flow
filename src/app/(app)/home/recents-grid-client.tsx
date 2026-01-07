'use client'

import { RecentsGrid } from '@/components/RecentsGrid'
import { useFetchStudiesByUserId } from '@/hooks/study/use-fetch-studies-by-user-id'
import { useRouter } from 'next/router'

export function RecentsGridClient() {
  const { data: studiesData } = useFetchStudiesByUserId()

  return (
    <RecentsGrid
      items={studiesData?.studies.map((study) => ({
        id: study.id,
        title: study.title,
        subtitle: study.content ?? '',
        timestamp: study.createdAt,
        thumbnail: study.sourceUrl,
        type: study.sourceContent as 'video' | 'document',
      }))}
      onItemDelete={(_item) => {}}
      onItemEdit={(_item) => {}}
      onItemShare={(_item) => {}}
      onViewAll={() => {}}
    />
  )
}

