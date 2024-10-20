import * as T from "@radix-ui/react-toolbar";
import { Node, ReactFlowInstance, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useMemo } from "react";
import { GenerateMindMapModal } from "./GenerateMindMapModal";
import { useNodeStore } from "@/store/NodeStore";
import { useAuthContext } from "@/app/context/useAuth";
import { saveMindMap, SaveMindRequest } from "@/services/mind-map/saveMindMap";
import { SaveMindMapModal } from "./SaveMindMapModal";
import { Button } from "./ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMindMap } from "@/services/mind-map/getMindMap";
import { useParams } from "next/navigation";
import { USERID } from "@/app/home/page";
import { updateMindMap, UpdateMindMapRequest } from "@/services/mind-map/updateMindMap";
import { ImSpinner8 } from "react-icons/im";
import toast from "react-hot-toast";

interface MenuBarProps {
  rfInstance: ReactFlowInstance | null;
}

export const ActionsBar = ({ rfInstance }: MenuBarProps) => {
  const { 
    addNodes, 
    screenToFlowPosition, 
    setViewport, 
    setEdges, 
    setNodes, 
    viewportInitialized 
  } = useReactFlow();
  
  const { 
    activeIsCreatingNode, 
    disableIsCreatingNode, 
    isCreatingNode, 
    setCurrentMindMap 
  } = useNodeStore();

  const { currentUser } = useAuthContext();
  const params = useParams();

  const { data: mindMapData } = useQuery({
    queryKey: ["mindmaps", params.mindMapId],
    queryFn: () => getMindMap(USERID, params.mindMapId as string),
    enabled: !!params.mindMapId, // Only run if mindMapId exists,
  });

  const saveMindMapFn = useMutation({
    mutationKey: ["save-mindMap", USERID, params.mindMapId],
    mutationFn: (data: SaveMindRequest) => saveMindMap(data),
    onError: () => toast.error("Error while saving Mind Map"),
    onSuccess: () => toast.success("Mind Map saved successfully"),
  });

  const updateMindMapFn = useMutation({
    mutationKey: ["update-mindMap", USERID, params.mindMapId],
    mutationFn: (data: UpdateMindMapRequest) => updateMindMap(data),
    onError: () => toast.error("Error while updating Mind Map"),
    onSuccess: () => toast.success("Mind Map updated successfully"),
  });

  const handleClickToCreate = useCallback(
    (event: MouseEvent) => {

      const { clientX, clientY } = event;
      const nodePosition = screenToFlowPosition({ x: clientX, y: clientY });

      const node: Node = {
        id: crypto.randomUUID(),
        position: nodePosition,
        data: { label: "" },
        type: "square",
        width: 200,
        height: 200,
        selected: true,
      };

      addNodes(node);
      disableIsCreatingNode();
    },
    [isCreatingNode, screenToFlowPosition, addNodes, disableIsCreatingNode]
  );

  useEffect(() => {
    if (!isCreatingNode) return;
    document.addEventListener("click", handleClickToCreate);
    return () => document.removeEventListener("click", handleClickToCreate);
  }, [handleClickToCreate]);

  const onSave = useCallback(
    async (title: string) => {
      if (!rfInstance) return;

      const mindMapId = mindMapData?.id;
      const isNewMindMap = mindMapId === "unsaved";
      const mindMapObject = rfInstance.toObject();

      if (!isNewMindMap && mindMapId) {
        await updateMindMapFn.mutateAsync({
          userId: USERID,
          mindMapId,
          title,
          mindMap: mindMapObject,
        });
      } else {
        await saveMindMapFn.mutateAsync({
          userId: USERID,
          title,
          mindMap: mindMapObject,
        });
      }
    },
    [rfInstance, mindMapData?.id, updateMindMapFn, saveMindMapFn]
  );

  const onRestore = useCallback(() => {
    if (!mindMapData?.mindMap) return;

    const { nodes = [], edges = [], viewport = { x: 0, y: 0, zoom: 1 } } = mindMapData.mindMap;
    setNodes(nodes);
    setEdges(edges);
    setViewport(viewport);
  }, [mindMapData, setNodes, setEdges, setViewport, params.mindMapId]);

  useEffect(() => {
    if (mindMapData?.mindMap) {
      console.log("mindMapData", mindMapData);
      onRestore();
    }
  }, [mindMapData, viewportInitialized, onRestore]);

  useEffect(() => {
    if (mindMapData) {
      setCurrentMindMap(mindMapData);
    }
  }, [mindMapData, setCurrentMindMap]); 

  return (
    <T.Root className="flex items-center w-full h-20 max-w-[1024px] rounded-lg border border-zinc-200 z-50 bg-white fixed bottom-20 left-1/2 -translate-x-1/2 drop-shadow-md overflow-hidden">
      <T.Button />
      <T.Separator />
      <T.Link />
      {mindMapData?.title}
      <T.ToggleGroup type="single" className="flex items-center gap-5 px-2">
        <T.ToggleItem
          onClick={activeIsCreatingNode}
          value="create-node"
          className="w-24 h-24 translate-y-8 bg-indigo-500 rounded-md hover:translate-y-5 transition-transform"
        />
        <T.ToggleItem asChild value="generate-mind-map">
          <GenerateMindMapModal />
        </T.ToggleItem>
        <T.ToggleItem value="user">
          <p>{currentUser?.name}</p>
        </T.ToggleItem>
        <T.ToggleItem asChild value="save-mind-map">
          <SaveMindMapModal onSave={onSave} isPending={saveMindMapFn.isPending || updateMindMapFn.isPending} />
        </T.ToggleItem>
        <T.ToggleItem value="restore-mind-map" onClick={onRestore}>
          Restore
        </T.ToggleItem>
      </T.ToggleGroup>
    </T.Root>
  );
};
