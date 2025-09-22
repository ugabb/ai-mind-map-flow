"use client";

import { createContext, useContext, ReactNode } from "react";
import { Content } from "@/types/content";

interface ContentContextType {
  contentId: string;
  rawTranscription: string;
  content: Content;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: ReactNode;
  contentId: string;
  rawTranscription: string;
  content: Content;
}

export function ContentProvider({
  children,
  contentId,
  rawTranscription,
  content,
}: ContentProviderProps) {
  return (
    <ContentContext.Provider value={{ contentId, rawTranscription, content }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContentContext must be used within a ContentProvider");
  }
  return context;
}
