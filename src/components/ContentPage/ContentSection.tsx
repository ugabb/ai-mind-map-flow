import type { Content } from "@/types/content";
import { ContentSectionClient } from "./ContentSectionClient";

interface ContentSectionProps {
  content: Content;
}

export function ContentSection(props: ContentSectionProps) {
  const { content } = props;

  return <ContentSectionClient content={content} />;
}
