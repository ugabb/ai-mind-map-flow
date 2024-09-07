import { useNodeStore } from "@/store/NodeStore";
import * as Toolbar from "@radix-ui/react-toolbar";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { useEffect } from "react";

export const ActionsBar = () => {
  const { addNodes } = useReactFlow();
  const { activeIsCreatingNode, disableIsCreatingNode, isCreatingNode } = useNodeStore();

  const handleClickToCreate = (event: any) => {
    if (isCreatingNode) {
      const { offsetX, offSetY } = event;

      const node: Node = {
        id: crypto.randomUUID(),
        position :{ x: offsetX, y: offSetY},
        data: {label: ""},
        type: "square",
        width: 200,
        height: 200,
        selected: true
      }

      addNodes(node)
      disableIsCreatingNode()
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickToCreate)

    return() => {
        document.removeEventListener('click', handleClickToCreate)
    }
  },[isCreatingNode])

  return (
    <Toolbar.Root className="w-96 h-20 rounded-lg border border-zinc-200 z-50 bg-white fixed bottom-20 left-1/2 -translate-x-1/2 drop-shadow-md overflow-hidden">
      <Toolbar.Button />
      <Toolbar.Separator />
      <Toolbar.Link />
      <Toolbar.ToggleGroup
        type="single"
        className="flex items-center gap-5 px-2 "
      >
        <Toolbar.ToggleItem
          onClick={() => activeIsCreatingNode()}
          value="Teste"
          className="w-24 h-24 bg-indigo-500 rounded-md hover:-translate-y-3 transition-transform"
        />
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};
