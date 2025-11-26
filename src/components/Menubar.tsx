import * as T from "@radix-ui/react-toolbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Node, type ReactFlowInstance, useReactFlow } from "@xyflow/react";
import { useParams, usePathname } from "next/navigation";
import { memo, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/authClient";
import { getMindMap } from "@/services/mind-map/getMindMap";
import {
  type SaveMindRequest,
  saveMindMap,
} from "@/services/mind-map/saveMindMap";
import {
  type UpdateMindMapRequest,
  updateMindMap,
} from "@/services/mind-map/updateMindMap";
import { useNodeStore } from "@/store/NodeStore";
import Export from "./Export";
import { SaveMindMapModal } from "./SaveMindMapModal";

type MenuBarProps = {
  rfInstance: ReactFlowInstance | null;
};

export const Menubar_ = ({ rfInstance }: MenuBarProps) => {
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
    setMindMapToGenerate,
  } = useNodeStore();

  const params = useParams();
  const { data: session } = authClient.useSession();
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
    if (!isCreatingNode) {
      return;
    }
    document.addEventListener("click", handleClickToCreate);
    return () => document.removeEventListener("click", handleClickToCreate);
  }, [handleClickToCreate, isCreatingNode]);

  const pathname = usePathname();

  const onSave = useCallback(
    async (title: string) => {
      if (!rfInstance) {
        return;
      }

      const mindMapId = mindMapData?.id;
      const mindMapObject = rfInstance.toObject();

      if (mindMapId) {
        await updateMindMapFn.mutateAsync({
          userId: session?.user?.id as string,
          mindMapId,
          title,
          mindMap: mindMapObject,
        });
      }

      if (pathname.includes("/unsaved")) {
        console.log("unsaved", mindMapObject);
        await saveMindMapFn.mutateAsync({
          userId: session?.user?.id as string,
          title,
          mindMap: mindMapObject,
        });
      }
    },
    [
      rfInstance,
      mindMapData?.id,
      updateMindMapFn,
      session?.user?.id,
      pathname,
      saveMindMapFn.mutateAsync,
    ]
  );

  const onRestore = useCallback(() => {
    if (!mindMapData?.mindMap) {
      return;
    }

    const {
      nodes = [],
      edges = [],
      viewport = { x: 0, y: 0, zoom: 1 },
    } = mindMapData.mindMap;
    setNodes(nodes);
    setEdges(edges);
    setViewport(viewport);
    if (typeof mindMapData.mindMap === "string") {
      setMindMapToGenerate(mindMapData.mindMap);
    }
  }, [mindMapData, setEdges, setMindMapToGenerate, setNodes, setViewport]);

  useEffect(() => {
    if (mindMapData?.mindMap) {
      onRestore();
    }
  }, [mindMapData, onRestore]);

  useEffect(() => {
    if (mindMapData) {
      setCurrentMindMap(mindMapData);
    }
  }, [mindMapData, setCurrentMindMap]);

  return (
    <T.Root className="-translate-x-1/2 fixed absolute bottom-20 left-1/2 z-50 flex h-20 w-full max-w-[425px] items-center overflow-hidden rounded-lg border border-border bg-background drop-shadow-md">
      <T.Button />
      <T.Separator />
      <T.Link />
      <T.ToggleGroup
        className="flex w-full items-center justify-between gap-5 px-2"
        type="single"
      >
        <T.ToggleItem
          className="h-24 w-24 translate-y-8 rounded-md bg-primary transition-transform hover:translate-y-5"
          onClick={activeIsCreatingNode}
          value="create-node"
        />
        <Export />
        <SaveMindMapModal
          isPending={saveMindMapFn.isPending || updateMindMapFn.isPending}
          onSave={onSave}
          title={mindMapData?.title}
        />
      </T.ToggleGroup>
    </T.Root>
  );
};

export const Menubar = memo(Menubar_);
