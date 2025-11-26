'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { User } from 'next-auth'
import { useState } from 'react'
import { PiMonitorArrowUp, PiPlusCircle } from 'react-icons/pi'
import { CardActions } from '@/components/CardActions'
import { CardMindMap } from '@/components/CardMindMap'
import { GenerateMindMapModal } from '@/components/GenerateMindMapModal'
import { fetchMindMap } from '@/services/mind-map/fetchMindMaps'
import type { MindMapResponse } from '@/types/mind-map'
import { CardMindMapSkeleton } from './CardMindMapSkeleton'

type MindMapListProps = {
  currentUser: User | undefined
}

export const MindMapList = (props: MindMapListProps) => {
  const { currentUser } = props
  const [openGenerateMindMap, setOpenGenerateMindMap] = useState(false)
  const router = useRouter()

  const { data: mindMaps, isLoading: isLoadingMindMaps } = useQuery<
    MindMapResponse[]
  >({
    queryKey: ['mindmaps', currentUser?.id],
    queryFn: () => fetchMindMap(currentUser?.id as string),
    enabled: !!currentUser?.id,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  return (
    <div className="flex border-border border-t">
      <div className="flex w-full flex-col gap-10 px-10 py-5">
        <h1 className="font-bold text-xl">Mind Maps</h1>

        <div className="flex w-full items-center gap-5">
          <CardActions
            icon={PiPlusCircle}
            onClick={() => router.push('/mind-map/unsaved')}
            text="Create Mind Map"
          />
          <CardActions
            icon={PiMonitorArrowUp}
            onClick={() => setOpenGenerateMindMap(true)}
            text="Generate Mind Map by video"
          />
          {/* <CardActions icon={PiShareNetwork} text="Share Mind Map" /> */}
          {openGenerateMindMap && (
            <GenerateMindMapModal
              currentUser={currentUser}
              onClose={() => setOpenGenerateMindMap(false)}
              open={openGenerateMindMap}
            />
          )}
        </div>

        <div className="flex w-full flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-5">
          {isLoadingMindMaps
            ? Array.from({ length: 10 }).map((_, index) => (
                <CardMindMapSkeleton key={index} />
              ))
            : mindMaps?.map((mindMap) => (
                <CardMindMap key={mindMap.id} mindMap={mindMap} />
              ))}
        </div>
      </div>
    </div>
  )
}
