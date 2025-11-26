'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { getYouTubeEmbedUrl } from '@/utils/get-youtube-embed-url'

type YouTubePlayerProps = {
  sourceUrl: string
  title: string
}

export type YouTubePlayerRef = {
  jumpToTime: (timeInSeconds: number) => void
}

export const YouTubePlayer = forwardRef<YouTubePlayerRef, YouTubePlayerProps>(
  ({ sourceUrl, title }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [currentUrl, setCurrentUrl] = useState<string>('')

    // Convert YouTube URL to embed URL with initial parameters
    const getEmbedUrlWithTime = (timeInSeconds = 0) => {
      if (!sourceUrl) {
        return null
      }

      const baseEmbedUrl = getYouTubeEmbedUrl(sourceUrl)
      if (!baseEmbedUrl) {
        return null
      }

      return `${baseEmbedUrl}?start=${timeInSeconds}&autoplay=1&enablejsapi=1`
    }

    // Initialize with the embed URL
    useState(() => {
      const embedUrl = getEmbedUrlWithTime(0)
      if (embedUrl) {
        setCurrentUrl(embedUrl)
      }
    })

    // Handle time jump by updating iframe src with proper parameters
    const jumpToTime = (timeInSeconds: number) => {
      const newUrl = getEmbedUrlWithTime(timeInSeconds)
      if (newUrl && iframeRef.current) {
        setCurrentUrl(newUrl)
        iframeRef.current.src = newUrl
      }
    }

    // Expose jumpToTime function to parent component
    useImperativeHandle(ref, () => ({
      jumpToTime,
    }))

    if (!currentUrl) {
      return null
    }

    return (
      <div className="w-full">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="aspect-video w-full rounded-lg"
          frameBorder="0"
          ref={iframeRef}
          referrerPolicy="strict-origin-when-cross-origin"
          src={currentUrl}
          title={title}
        />
      </div>
    )
  }
)

YouTubePlayer.displayName = 'YouTubePlayer'
