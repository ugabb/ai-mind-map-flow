import { NodeToolbar, Position } from "@xyflow/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  black,
  blue,
  cyan,
  gray,
  green,
  indigo,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  white,
  yellow,
} from "tailwindcss/colors";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { LuTrash, LuType } from "react-icons/lu";
import { fontSizes } from "@/constants/values";
import { memo } from "react";

const bgColors = [
  { color: "bg-blue-500", name: "Blue", value: blue[500] },
  { color: "bg-red-500", name: "Red", value: red[500] },
  { color: "bg-green-500", name: "Green", value: green[500] },
  { color: "bg-yellow-500", name: "Yellow", value: yellow[500] },
  { color: "bg-purple-500", name: "Purple", value: purple[500] },
  { color: "bg-pink-500", name: "Pink", value: pink[500] },
  { color: "bg-teal-500", name: "Teal", value: teal[500] },
  { color: "bg-orange-500", name: "Orange", value: orange[500] },
  { color: "bg-gray-500", name: "Gray", value: gray[500] },
  { color: "bg-indigo-500", name: "Indigo", value: indigo[500] },
  { color: "bg-cyan-500", name: "Cyan", value: cyan[500] },
  { color: "bg-lime-500", name: "Lime", value: lime[500] },
  { color: "bg-black", name: "Black", value: black },
  { color: "bg-white", name: "White", value: white },
];

interface ColorPickerProps {
  handleUpdateNodeColor: (color: string) => void;
  handleUpdateTextSize: (size: "sm" | "md" | "lg" | "xl") => void;
  handleDeleteNode: () => void;
  selected: boolean;
}

export const _Toolbar = (props: ColorPickerProps) => {
  const {
    handleUpdateNodeColor,
    handleUpdateTextSize,
    handleDeleteNode,
    selected,
  } = props;
  return (
    <NodeToolbar
      isVisible={selected}
      position={Position.Top}
      offset={50}
      className="flex items-center gap-3 bg-zinc-800 text-white text-xs px-5 py-2 rounded-lg"
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <span className="h-5 w-5 bg-blue-500 rounded-full"></span>
          <ChevronDownIcon className="size-3 text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col p-2">
          <DropdownMenuLabel>Select a Color</DropdownMenuLabel>
          <div className="flex flex-wrap items-center justify-center gap-1 max-w-40">
            {bgColors.map(({ color, name, value }) => (
              <DropdownMenuItem
                key={name}
                className={cn(`h-5 w-5 ${color} rounded-full cursor-pointer`)}
                onClick={() => handleUpdateNodeColor(value)}
                aria-label={name}
              ></DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <LuType className="size-5 cursor-pointer" />
          <ChevronDownIcon className="size-3 text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col p-2">
          <DropdownMenuLabel className="text-center">
            Font size
          </DropdownMenuLabel>
          <div className="flex flex-col items-center justify-center gap-1 max-w-40">
            {Object.keys(fontSizes).map((size) => (
              <DropdownMenuItem
                key={size}
                className="cursor-pointer"
                onClick={() =>
                  handleUpdateTextSize(size as "sm" | "md" | "lg" | "xl")
                }
                aria-label={size}
              >
                {size}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <LuTrash className="size-5 cursor-pointer" onClick={handleDeleteNode} />
    </NodeToolbar>
  );
};

export const Toolbar = memo(_Toolbar);
