import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ContentSection } from "@/components/ContentPage/ContentSection";
import { ActionsSection } from "@/components/ContentPage/ActionsSection";
import { getContentById } from "@/services/content/get-content-by-id";

export default async function ContentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { content } = await getContentById(id as string);
  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel minSize={30}>
          <ContentSection content={content} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={30}>
          <ActionsSection />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
