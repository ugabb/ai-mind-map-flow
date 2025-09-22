"use client";

import { useNodeStore } from "@/store/NodeStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlashCardTab } from "./FlashCard/FlashCard";
import { SummaryTab } from "./SummaryTab/SummaryTab";
import { MindMapTab } from "./MindMapTab/MindMapTab";

export function ActionsSection() {
  const { currentMindMap } = useNodeStore();

  return (
    <div className="h-full px-2">
      <Tabs defaultValue="mindmap" className="h-full flex flex-col space-y-2">
        <TabsList className="flex gap-2 w-full">
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

        <TabsContent value="mindmap" className="flex-1 m-0">
          <MindMapTab />
        </TabsContent>
        <TabsContent value="flashcard" className="flex-1 m-0">
          <FlashCardTab />
        </TabsContent>
        <TabsContent value="summary" className="flex-1 m-0">
          <SummaryTab data={undefined} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
