'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNodeStore } from '@/store/NodeStore'
import { FlashCardTab } from './FlashCard/FlashCard'
import { MindMapTab } from './MindMapTab/MindMapTab'
import { SummaryTab } from './SummaryTab/SummaryTab'

export function ActionsSection() {
  const { currentMindMap } = useNodeStore()

  return (
    <div className="h-full px-2">
      <Tabs className="flex h-full flex-col space-y-2" defaultValue="mindmap">
        <TabsList className="flex w-full gap-2">
          <TabsTrigger className="w-full" value="mindmap">
            Mind Map
          </TabsTrigger>
          <TabsTrigger className="w-full" value="chat">
            Chat
          </TabsTrigger>
          <TabsTrigger className="w-full" value="flashcard">
            Flashcard
          </TabsTrigger>
          <TabsTrigger className="w-full" value="summary">
            Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent className="m-0 flex-1" value="mindmap">
          <MindMapTab />
        </TabsContent>
        <TabsContent className="m-0 flex-1" value="flashcard">
          <FlashCardTab />
        </TabsContent>
        <TabsContent className="m-0 flex-1" value="summary">
          <SummaryTab data={undefined} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
