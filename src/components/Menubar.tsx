import * as T from "@radix-ui/react-toolbar";
import { Node, ReactFlowInstance, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { GenerateMindMapModal } from "./GenerateMindMapModal";
import { useNodeStore } from "@/store/NodeStore";
import { LuSave } from "react-icons/lu";
import { Button } from "./ui/button";

const flowKey = "flow_key";

interface MenuBarProps {
  rfInstance: ReactFlowInstance | null;
}

export const ActionsBar = (props: MenuBarProps) => {
  const { rfInstance } = props;
  const { addNodes, screenToFlowPosition, setViewport } = useReactFlow();
  const { activeIsCreatingNode, disableIsCreatingNode, isCreatingNode } =
    useNodeStore();


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

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(JSON.stringify(flow))
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }else{
      console.error("rfInstance is null")
    }
  }, [rfInstance]);

  return (
    <T.Root className="flex items-center w-96 h-20 rounded-lg border border-zinc-200 z-50 bg-white fixed bottom-20 left-1/2 -translate-x-1/2 drop-shadow-md overflow-hidden">
      <T.Button />
      <T.Separator />
      <T.Link />
      <T.ToggleGroup type="single" className="flex items-center gap-5 px-2 ">
        <T.ToggleItem
          onClick={() => activeIsCreatingNode()}
          value="Teste"
          className="w-24 h-24 translate-y-8 bg-indigo-500 rounded-md hover:translate-y-5 transition-transform"
        />

        <T.ToggleItem value="generate-mind-map">
          <GenerateMindMapModal />
        </T.ToggleItem>
        <T.ToggleItem value="save-mind-map">
          <Button onClick={onSave}>
            <LuSave />
          </Button>
        </T.ToggleItem>
      </T.ToggleGroup>
    </T.Root>
  );
};
