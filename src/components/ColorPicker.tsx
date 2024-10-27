import { Panel } from "@xyflow/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
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
  yellow,
} from "tailwindcss/colors";
import { cn } from "@/lib/utils";

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
];

interface ColorPickerProps {
  handleUpdateNodeColor: (color: string) => void;
}

export const ColorPicker = (props: ColorPickerProps) => {
    const { handleUpdateNodeColor } = props;
  return (
    <Panel className="bg-zinc-800 text-white text-xs absolute -top-24 px-5 py-2 rounded-lg">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-5 w-5 bg-blue-500 rounded-full"></DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col p-2">
          <DropdownMenuLabel>Select a Color</DropdownMenuLabel>
          <div className="flex flex-wrap items-center justify-center gap-1 max-w-40">
            {/* Adding different colors for the dropdown items */}
            {bgColors.map(({ color, name, value }) => (
              <DropdownMenuItem
                key={name}
                className={cn(`h-5 w-5 ${color} rounded-full cursor-pointer`)}
                onClick={() => handleUpdateNodeColor(value)}
                aria-label={name} // Adding aria-label for accessibility
              >
                {/* Optionally, you can add an icon or checkmark here if needed */}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </Panel>
  );
};
