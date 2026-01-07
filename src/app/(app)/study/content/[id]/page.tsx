import { ActionsSection } from '@/components/ContentPage/ActionsSection'
import { ContentProvider } from '@/components/ContentPage/ContentContext'
import { ContentSection } from '@/components/ContentPage/ContentSection'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { getContentById } from '@/services/content/get-content-by-id'
import { getStudyById } from '@/services/study/get-study-by-id'

export default async function ContentPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  // const { content } = await getContentById(id as string)
  const { study, transcript } = await getStudyById(id as string)
  console.log("study", study)
  console.log("transcript", transcript)
  const rawTranscription = study.content ?? ''
  return (
    <ContentProvider
      content={study}
      contentId={id}
      rawTranscription={rawTranscription}
    >
      <div className="h-full w-full py-6">
        <ResizablePanelGroup className="h-full" direction="horizontal">
          <ResizablePanel minSize={30}>
            <ContentSection study={study} />
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
