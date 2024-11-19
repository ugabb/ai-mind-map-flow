import * as T from "@radix-ui/react-toolbar";
import { Node, ReactFlowInstance, useReactFlow } from "@xyflow/react";
import { memo, useCallback, useEffect } from "react";
import { useNodeStore } from "@/store/NodeStore";
import { saveMindMap, SaveMindRequest } from "@/services/mind-map/saveMindMap";
import { SaveMindMapModal } from "./SaveMindMapModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMindMap } from "@/services/mind-map/getMindMap";
import { useParams } from "next/navigation";
import {
  updateMindMap,
  UpdateMindMapRequest,
} from "@/services/mind-map/updateMindMap";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Export from "./Export";

interface MenuBarProps {
  rfInstance: ReactFlowInstance | null;
}

export const _Menubar = ({ rfInstance }: MenuBarProps) => {
  const {
    addNodes,
    screenToFlowPosition,
    setViewport,
    setEdges,
    setNodes,
    viewportInitialized,
  } = useReactFlow();

  const {
    activeIsCreatingNode,
    disableIsCreatingNode,
    isCreatingNode,
    setCurrentMindMap,
  } = useNodeStore();

  const params = useParams();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: mindMapData, isPending } = useQuery({
    queryKey: ["mindmaps", params.mindMapId, session?.user?.id],
    queryFn: () =>
      getMindMap(session?.user?.id as string, params.mindMapId as string),
    enabled: !!params.mindMapId,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const saveMindMapFn = useMutation({
    mutationKey: ["save-mindMap", session?.user?.id],
    mutationFn: (data: SaveMindRequest) => saveMindMap(data),
    onError: () => toast.error("Error while saving Mind Map"),
    onSuccess: () => {
      toast.success("Mind Map saved successfully");
      queryClient.invalidateQueries({
        queryKey: ["mindmaps", params.mindMapId, session?.user?.id],
      });
    },
  });

  const updateMindMapFn = useMutation({
    mutationKey: ["update-mindMap", session?.user?.id, params.mindMapId],
    mutationFn: (data: UpdateMindMapRequest) => updateMindMap(data),
    onError: () => toast.error("Error while updating Mind Map"),
    onSuccess: () => {
      toast.success("Mind Map updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["mindmaps", params.mindMapId, session?.user?.id],
      });
    },
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
        width: 300,
        height: 300,
        selected: true,
      };

      addNodes(node);
      disableIsCreatingNode();
    },
    [screenToFlowPosition, addNodes, disableIsCreatingNode]
  );

  useEffect(() => {
    if (!isCreatingNode) return;
    document.addEventListener("click", handleClickToCreate);
    return () => document.removeEventListener("click", handleClickToCreate);
  }, [handleClickToCreate, isCreatingNode]);

  const onSave = useCallback(
    async (title: string) => {
      if (!rfInstance) return;

      const mindMapId = mindMapData?.id;
      const isNewMindMap = mindMapId === "unsaved";
      const mindMapObject = rfInstance.toObject();

      if (!isNewMindMap && mindMapId) {
        await updateMindMapFn.mutateAsync({
          userId: session?.user?.id as string,
          mindMapId,
          title,
          mindMap: mindMapObject,
        });
      } else {
        await saveMindMapFn.mutateAsync({
          userId: session?.user?.id as string,
          title,
          mindMap: mindMapObject,
        });
      }
    },
    [rfInstance, mindMapData?.id, updateMindMapFn, saveMindMapFn]
  );

  const onRestore = useCallback(() => {
    if (!mindMapData?.mindMap) return;

    const {
      nodes = [],
      edges = [],
      viewport = { x: 0, y: 0, zoom: 1 },
    } = mindMapData.mindMap;
    setNodes(nodes);
    setEdges(edges);
    setViewport(viewport);
  }, [mindMapData, setNodes, setEdges, setViewport]);

  useEffect(() => {
    if (mindMapData?.mindMap) {
      onRestore();
    }
  }, [mindMapData, viewportInitialized, onRestore]);

  useEffect(() => {
    if (mindMapData) {
      setCurrentMindMap(mindMapData);
    }
  }, [mindMapData, setCurrentMindMap]);

  return (
    <T.Root className="flex items-center w-full h-20 max-w-[425px] rounded-lg border border-zinc-200 z-50 bg-white fixed bottom-20 left-1/2 -translate-x-1/2 drop-shadow-md overflow-hidden">
      <T.Button />
      <T.Separator />
      <T.Link />
      <T.ToggleGroup
        type="single"
        className="flex items-center justify-between w-full gap-5 px-2"
      >
        <T.ToggleItem
          onClick={activeIsCreatingNode}
          value="create-node"
          className="w-24 h-24 translate-y-8 bg-indigo-500 rounded-md hover:translate-y-5 transition-transform"
        />
        <T.ToggleItem value="export">
          <Export />
        </T.ToggleItem>
          <SaveMindMapModal
            onSave={onSave}
            isPending={saveMindMapFn.isPending || updateMindMapFn.isPending}
            title={mindMapData?.title}
          />
      </T.ToggleGroup>
    </T.Root>
  );
};

export const Menubar = memo(_Menubar);
