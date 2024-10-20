
import { HomeHeader } from "@/components/HomeHeader";
import { MindMapList } from "@/components/MindMapList";

export const USERID = "66f944142879239540d23bdd";

export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      <HomeHeader />
      <MindMapList />
    </div>
  );
}
