import { ActionsSection } from '@/components/ContentPage/ActionsSection'
import { ContentProvider } from '@/components/ContentPage/ContentContext'
import { ContentSection } from '@/components/ContentPage/ContentSection'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { getContentById } from '@/services/content/get-content-by-id'

export default async function ContentPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const { content } = await getContentById(id as string)
  const rawTranscription = content.transcription.chunks
    .map((chunk) => chunk.text)
    .join(' ')
  return (
    <ContentProvider
      content={content}
      contentId={id}
      rawTranscription={rawTranscription}
    >
      <div className="h-full w-full py-6">
        <ResizablePanelGroup className="h-full" direction="horizontal">
          <ResizablePanel minSize={30}>
            <ContentSection content={content} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={30}>
            <ActionsSection />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </ContentProvider>
  )
}
