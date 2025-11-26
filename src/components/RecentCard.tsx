'use client'

import { motion } from 'framer-motion'
import { Edit, MoreHorizontal, Share, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type RecentCardProps = {
  title: string
  subtitle?: string
  timestamp: string
  thumbnail?: string
  type?: 'video' | 'document'
  className?: string
  onClick?: () => void
  onDelete?: () => void
  onEdit?: () => void
  onShare?: () => void
}

export const RecentCard = ({
  title,
  subtitle,
  timestamp,
  thumbnail,
  type = 'document',
  className,
  onClick,
  onDelete,
  onEdit,
  onShare,
}: RecentCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <motion.div
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-200 hover:border-border hover:shadow-black/5 hover:shadow-lg',
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {thumbnail ? (
          <img
            alt={title}
            className="h-full w-full object-cover"
            src={thumbnail}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="font-bold text-4xl text-primary/20">
              {title.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        {/* Play button for videos */}
        {/* {type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-3">
              <Play className="size-6 text-white fill-white" />
            </div>
          </div>
        )} */}

        {/* Actions menu - appears on hover */}
        <motion.div
          animate={{
            opacity: isHovered || isPopoverOpen ? 1 : 0,
            scale: isHovered || isPopoverOpen ? 1 : 0.8,
          }}
          className="absolute top-2 right-2"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          <Popover onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                className="h-8 w-8 rounded-full bg-background/80 shadow-sm backdrop-blur-sm hover:bg-background/90"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPopoverOpen(!isPopoverOpen)
                }}
                size="icon"
                variant="secondary"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-48 p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                {onEdit && (
                  <Button
                    className="h-8 justify-start"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit()
                      setIsPopoverOpen(false)
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <Edit className="mr-2 size-4" />
                    Edit
                  </Button>
                )}
                {onShare && (
                  <Button
                    className="h-8 justify-start"
                    onClick={(e) => {
                      e.stopPropagation()
                      onShare()
                      setIsPopoverOpen(false)
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <Share className="mr-2 size-4" />
                    Share
                  </Button>
                )}
                {onDelete && (
                  <Button
                    className="h-8 justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete()
                      setIsPopoverOpen(false)
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 line-clamp-2 font-semibold text-sm">{title}</h3>
        {subtitle && (
          <p className="mb-2 line-clamp-1 text-muted-foreground text-xs">
            {subtitle}
          </p>
        )}
        <p className="text-muted-foreground text-xs">{timestamp}</p>
      </div>
    </motion.div>
  )
}
