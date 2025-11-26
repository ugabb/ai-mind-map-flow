'use client'

import { HeroSection } from '@/components/HeroSection'
import { RecentsGrid } from '@/components/RecentsGrid'

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="mt-8">
        <RecentsGrid
          onItemClick={(_item) => {}}
          onItemDelete={(_item) => {}}
          onItemEdit={(_item) => {}}
          onItemShare={(_item) => {}}
          onViewAll={() => {}}
        />
      </div>
      {/* <MindMapList currentUser={currentUser} /> */}
    </div>
  )
}
