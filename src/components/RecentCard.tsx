"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Play, Trash2, Edit, Share } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentCardProps {
  title: string;
  subtitle?: string;
  timestamp: string;
  thumbnail?: string;
  type?: "video" | "document";
  className?: string;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
}

export const RecentCard = ({
  title,
  subtitle,
  timestamp,
  thumbnail,
  type = "document",
  className,
  onClick,
  onDelete,
  onEdit,
  onShare,
}: RecentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <motion.div
      className={cn(
        "group relative bg-card rounded-2xl border border-border/50 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-black/5 hover:border-border",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-muted relative overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="text-4xl font-bold text-primary/20">
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered || isPopoverOpen ? 1 : 0,
            scale: isHovered || isPopoverOpen ? 1 : 0.8,
          }}
          transition={{ duration: 0.15 }}
          className="absolute top-2 right-2"
        >
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPopoverOpen(!isPopoverOpen);
                }}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-48 p-1"
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                      setIsPopoverOpen(false);
                    }}
                  >
                    <Edit className="size-4 mr-2" />
                    Edit
                  </Button>
                )}
                {onShare && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare();
                      setIsPopoverOpen(false);
                    }}
                  >
                    <Share className="size-4 mr-2" />
                    Share
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                      setIsPopoverOpen(false);
                    }}
                  >
                    <Trash2 className="size-4 mr-2" />
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
        <h3 className="font-semibold text-sm line-clamp-2 mb-1">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
            {subtitle}
          </p>
        )}
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </motion.div>
  );
};
