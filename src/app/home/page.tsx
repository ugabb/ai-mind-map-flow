"use client"

import { CardActions } from "@/components/CardActions";
import { CardMindMap } from "@/components/CardMindMap";
import { GenerateMindMapModal } from "@/components/GenerateMindMapModal";
import { Sidebar } from "@/components/Sidebar";
import { fetchMindMap } from "@/services/mind-map/fetchMindMaps";
import { MindMapResponse } from "@/types/mind-map";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PiPlusCircle, PiShare, PiShareNetwork } from "react-icons/pi";

export const USERID = "66f944142879239540d23bdd"

export default function Home() {
  const [openGenerateMindMap, setOpenGenerateMindMap] = useState(false);
  
  const {data: mindMaps} = useQuery<MindMapResponse[]>({
    queryKey: ["mindmaps", USERID],
    queryFn: () => fetchMindMap(USERID),
  });

  return (
    <div className="flex flex-col bg-background">
      <div className="hidden md:flex items-center justify-end gap-5 p-3 w-full">
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller bg-primary col-span-2 col-start-1 row-start-1 border-input"
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
      <div className="flex border-t border-zinc-100">
        <Sidebar playlists={[]} />
        <div className="flex flex-col px-10 py-5 gap-10 w-full">
          <h1 className="text-xl font-bold">Mind Maps</h1>

          <div className="flex gap-5 items-center w-full">
            <CardActions onClick={() => {}} icon={PiPlusCircle} text="Create Mind Map" />
            <CardActions onClick={() => setOpenGenerateMindMap(true)} icon={PiPlusCircle} text="Generate Mind Map by video" />
            <CardActions icon={PiShareNetwork} text="Share Mind Map" />
            {openGenerateMindMap && (
              <GenerateMindMapModal
                open={openGenerateMindMap}
                onClose={() => setOpenGenerateMindMap(false)}
              />
            )}
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 w-full gap-5">
            {mindMaps && mindMaps.map((mindMap, index) => (
              <CardMindMap
                key={mindMap.id}
                mindMap={mindMap}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
