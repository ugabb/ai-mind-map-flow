import { ReactFlowProvider } from "@xyflow/react";
import Image from "next/image";
import { SaveRestore } from "./ReactFlowCanvas";

export default function Home() {
  return (
   <main className="h-screen w-screen">
      <ReactFlowProvider>
        <SaveRestore />
      </ReactFlowProvider>
   </main>
  );
}
