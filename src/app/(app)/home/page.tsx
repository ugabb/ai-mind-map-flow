import { HeroSection } from '@/components/HeroSection'
import { RecentsGridClient } from './recents-grid-client'

export default async function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="mt-8">
        <RecentsGridClient />
      </div>
      {/* <MindMapList currentUser={currentUser} /> */}
    </div>
  )
}
