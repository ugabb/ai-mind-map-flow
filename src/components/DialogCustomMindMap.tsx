import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useNodeStore } from "@/store/NodeStore";
import toast from "react-hot-toast";

function DialogCustomMindMap() {
  const [mindMapData, setMindMapData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { setMindMapToGenerate } = useNodeStore();

  const handleSubmit = () => {
    if (!mindMapData.trim()) {
      toast.error("Please enter mind map data");
      return;
    }

    try {
      // Validate JSON format
      const data = JSON.parse(mindMapData);
      setMindMapToGenerate(data);
      setIsOpen(false);
      setMindMapData("");
      toast.success("Mind map data applied successfully!");
    } catch (error) {
      toast.error("Invalid JSON format. Please check your input.");
    }
  };

  const exampleData = {
    name: "Root Topic",
    children: [
      {
        name: "Subtopic 1",
        children: [{ name: "Detail 1.1" }, { name: "Detail 1.2" }],
      },
      {
        name: "Subtopic 2",
        children: [{ name: "Detail 2.1" }, { name: "Detail 2.2" }],
      },
    ],
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Custom Mind Map</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Custom Mind Map Data</h2>
            <p className="text-sm text-muted-foreground">
              Enter your mind map data in JSON format
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="mindMapData" className="text-sm font-medium">
              Mind Map JSON:
            </label>
            <textarea
              id="mindMapData"
              value={mindMapData}
              onChange={(e) => setMindMapData(e.target.value)}
              placeholder={`Example format:\n${JSON.stringify(
                exampleData,
                null,
                2
              )}`}
              className="w-full h-64 p-3 border border-gray-300 rounded-md resize-none font-mono text-sm"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                setMindMapData("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Apply Mind Map</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogCustomMindMap;
