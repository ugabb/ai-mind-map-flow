"use client";

import { HeroSection } from "@/components/HeroSection";
import { RecentsGrid } from "@/components/RecentsGrid";
import { MindMapList } from "@/components/MindMapList";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="mt-8">
        <RecentsGrid
          onItemClick={(item) => console.log("Clicked:", item)}
          onItemDelete={(item) => console.log("Delete:", item)}
          onItemEdit={(item) => console.log("Edit:", item)}
          onItemShare={(item) => console.log("Share:", item)}
          onViewAll={() => console.log("View all")}
        />
      </div>
      {/* <MindMapList currentUser={currentUser} /> */}
    </div>
  );
}
