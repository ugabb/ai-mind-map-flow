"use client";

import { CardActions } from "@/components/CardActions";
import { CardMindMap } from "@/components/CardMindMap";
import { GenerateMindMapModal } from "@/components/GenerateMindMapModal";
import { Sidebar } from "@/components/Sidebar";
import { fetchMindMap } from "@/services/mind-map/fetchMindMaps";
import { MindMapResponse } from "@/types/mind-map";
import { useQuery } from "@tanstack/react-query";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiMonitorArrowUp, PiPlusCircle, PiShareNetwork } from "react-icons/pi";
import { CardMindMapSkeleton } from "./CardMindMapSkeleton";

interface MindMapListProps {
  currentUser: User | undefined;
}

export const MindMapList = (props: MindMapListProps) => {
  const { currentUser } = props;
  const [openGenerateMindMap, setOpenGenerateMindMap] = useState(false);
  const router = useRouter();

  const { data: mindMaps, isLoading: isLoadingMindMaps } = useQuery<MindMapResponse[]>({
    queryKey: ["mindmaps", currentUser?.id],
    queryFn: () => fetchMindMap(currentUser?.id as string),
    enabled: !!currentUser?.id,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return (
    <div className="flex border-t border-zinc-100">
      <Sidebar playlists={[]} />
      <div className="flex flex-col px-10 py-5 gap-10 w-full">
        <h1 className="text-xl font-bold">Mind Maps</h1>

        <div className="flex gap-5 items-center w-full">
          <CardActions
            onClick={() => router.push("/mind-map/unsaved")}
            icon={PiPlusCircle}
            text="Create Mind Map"
          />
          <CardActions
            onClick={() => setOpenGenerateMindMap(true)}
            icon={PiMonitorArrowUp}
            text="Generate Mind Map by video"
          />
          {/* <CardActions icon={PiShareNetwork} text="Share Mind Map" /> */}
          {openGenerateMindMap && (
            <GenerateMindMapModal
              open={openGenerateMindMap}
              onClose={() => setOpenGenerateMindMap(false)}
              currentUser={currentUser}
            />
          )}
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 w-full gap-5">
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
  );
};
