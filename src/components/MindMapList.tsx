"use client";

import { USERID } from "@/app/home/page";
import { CardActions } from "@/components/CardActions";
import { CardMindMap } from "@/components/CardMindMap";
import { GenerateMindMapModal } from "@/components/GenerateMindMapModal";
import { Sidebar } from "@/components/Sidebar";
import { fetchMindMap } from "@/services/mind-map/fetchMindMaps";
import { MindMapResponse } from "@/types/mind-map";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PiPlusCircle, PiShareNetwork } from "react-icons/pi";

export const MindMapList = () => {
  const [openGenerateMindMap, setOpenGenerateMindMap] = useState(false);

  const { data: mindMaps } = useQuery<MindMapResponse[]>({
    queryKey: ["mindmaps", USERID],
    queryFn: () => fetchMindMap(USERID),
  });
  return (
    <div className="flex border-t border-zinc-100">
      <Sidebar playlists={[]} />
      <div className="flex flex-col px-10 py-5 gap-10 w-full">
        <h1 className="text-xl font-bold">Mind Maps</h1>

        <div className="flex gap-5 items-center w-full">
          <CardActions
            onClick={() => {}}
            icon={PiPlusCircle}
            text="Create Mind Map"
          />
          <CardActions
            onClick={() => setOpenGenerateMindMap(true)}
            icon={PiPlusCircle}
            text="Generate Mind Map by video"
          />
          <CardActions icon={PiShareNetwork} text="Share Mind Map" />
          {openGenerateMindMap && (
            <GenerateMindMapModal
              open={openGenerateMindMap}
              onClose={() => setOpenGenerateMindMap(false)}
            />
          )}
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 w-full gap-5">
          {mindMaps &&
            mindMaps.map((mindMap, index) => (
              <CardMindMap key={mindMap.id} mindMap={mindMap} />
            ))}
        </div>
      </div>
    </div>
  );
};
