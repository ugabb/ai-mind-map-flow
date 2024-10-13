import * as T from "@radix-ui/react-toolbar";
import { Node, ReactFlowInstance, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { GenerateMindMapModal } from "./GenerateMindMapModal";
import { useNodeStore } from "@/store/NodeStore";
import { useAuthContext } from "@/app/context/useAuth";
import { saveMindMap, SaveMindRequest } from "@/services/saveMindMap";
import { SaveMindMapModal } from "./SaveMindMapModal";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { getMindMap } from "@/services/getMindMap";
import { useParams } from "next/navigation";
import { USERID } from "@/app/home/page";

interface MenuBarProps {
  rfInstance: ReactFlowInstance | null;
}

export const ActionsBar = (props: MenuBarProps) => {
  const { rfInstance } = props;
  const { addNodes, screenToFlowPosition, setViewport, setEdges, setNodes, viewportInitialized } = useReactFlow();
  const { activeIsCreatingNode, disableIsCreatingNode, isCreatingNode } =
    useNodeStore();

  const { currentUser } = useAuthContext();

  const params = useParams();

  const {data: mindMapData} = useQuery({
    queryKey: ["mindmaps", params.mindMapId],
    queryFn: () => getMindMap(USERID,params.mindMapId as string),
  })

  const handleClickToCreate = (event: any) => {
    if (isCreatingNode) {
      const { clientX, clientY } = event;
      console.log(clientX, clientY, event);
      const nodePosition = screenToFlowPosition({ x: clientX, y: clientY });

      const node: Node = {
        id: crypto.randomUUID(),
        position: { x: nodePosition.x, y: nodePosition.y },
        data: { label: "" },
        type: "square",
        width: 200,
        height: 200,
        selected: true,
      };

      addNodes(node);
      disableIsCreatingNode();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickToCreate);

    return () => {
      document.removeEventListener("click", handleClickToCreate);
    };
  }, [isCreatingNode]);

  const onSave = useCallback(
    async (title: string) => {
      if (rfInstance) {
        const mindMapObj: SaveMindRequest = {
          title,
          mindMap: rfInstance.toObject(),
        };

        console.log("[MIND MAP OBJE]", mindMapObj);

        // await saveMindMap(mindMapObj);
      }
    },
    [rfInstance]
  );

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      if (!mindMapData?.mindMap) return;
  
      console.log("[MIND MAP]", mindMapData?.mindMap);
      const flow = mindMapData.mindMap;
  
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
  
    restoreFlow();
  }, [mindMapData?.mindMap, setNodes, setEdges, setViewport]);
  

  useEffect(() => {
    if (mindMapData?.mindMap && viewportInitialized) {
      onRestore();
    }
  }, [mindMapData, onRestore]);
  


  return (
    <T.Root className="flex items-center w-full h-20 max-w-[1024px] rounded-lg border border-zinc-200 z-50 bg-white fixed bottom-20 left-1/2 -translate-x-1/2 drop-shadow-md overflow-hidden">
      <T.Button />
      <T.Separator />
      <T.Link />
      <T.ToggleGroup type="single" className="flex items-center gap-5 px-2 ">
        <T.ToggleItem
          onClick={() => activeIsCreatingNode()}
          value="Teste"
          className="w-24 h-24 translate-y-8 bg-indigo-500 rounded-md hover:translate-y-5 transition-transform"
        />

        <T.ToggleItem asChild value="generate-mind-map">
          <GenerateMindMapModal />
        </T.ToggleItem>

        <T.ToggleItem value="user">
          <p>{currentUser?.name}</p>
        </T.ToggleItem>
        <T.ToggleItem asChild value="save-mind-map">
            <SaveMindMapModal onSave={onSave} />
        </T.ToggleItem>
        <T.ToggleItem value="restore-mind-map" onClick={onRestore}>
          Restore
        </T.ToggleItem>
      </T.ToggleGroup>
    </T.Root>
  );
};
