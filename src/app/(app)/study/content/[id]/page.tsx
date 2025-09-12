import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContentSection } from "@/components/ContentPage/ContentSection";
import { ActionsSection } from "@/components/ContentPage/ActionsSection";

export default function ContentPage() {
  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel minSize={30}>
          <ContentSection />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={30}>
          <ActionsSection />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
