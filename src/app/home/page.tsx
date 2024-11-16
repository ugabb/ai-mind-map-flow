import { HomeHeader } from "@/components/HomeHeader";
import { MindMapList } from "@/components/MindMapList";
import { getCurrentUser } from "@/lib/authjs/getCurrentUser";

export default async function Home() {
  const { currentUser } = await getCurrentUser();

  return (
    <div className="flex flex-col bg-background h-screen">
      <HomeHeader currentUser={currentUser} />
      <MindMapList currentUser={currentUser} />
    </div>
  );
}
