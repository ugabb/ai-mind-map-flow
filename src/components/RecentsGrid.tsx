"use client";

import { RecentCard } from "./RecentCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface RecentItem {
  id: string;
  title: string;
  subtitle?: string;
  timestamp: string;
  thumbnail?: string;
  type?: "video" | "document";
}

interface RecentsGridProps {
  items?: RecentItem[];
  onViewAll?: () => void;
  onItemClick?: (item: RecentItem) => void;
  onItemDelete?: (item: RecentItem) => void;
  onItemEdit?: (item: RecentItem) => void;
  onItemShare?: (item: RecentItem) => void;
}

// Mock data for demonstration
const mockItems: RecentItem[] = [
  {
    id: "1",
    title: "você tá CANSADO ou é PREGUIÇOSO???",
    subtitle: "A short clip about life",
    timestamp: "20 minutes ago",
    thumbnail: "https://i.ytimg.com/vi/fwjk2YF-HBM/maxresdefault.jpg", // You can replace with actual thumbnails
    type: "video",
  },
  {
    id: "2",
    title: "Machine Learning - CS229 Lecture Notes",
    subtitle: "Andrew Ng's course files",
    timestamp: "1 day ago",
    type: "document",
  },
];

export const RecentsGrid = ({
  items = mockItems,
  onViewAll,
  onItemClick,
  onItemDelete,
  onItemEdit,
  onItemShare,
}: RecentsGridProps) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recents</h2>
        {onViewAll && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View all
          </Button>
        )}
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <RecentCard
              title={item.title}
              subtitle={item.subtitle}
              timestamp={item.timestamp}
              thumbnail={item.thumbnail}
              type={item.type}
              onClick={() => onItemClick?.(item)}
              onDelete={() => onItemDelete?.(item)}
              onEdit={() => onItemEdit?.(item)}
              onShare={() => onItemShare?.(item)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-2">No recent items</div>
          <p className="text-sm text-muted-foreground">
            Your recent learning materials will appear here
          </p>
        </div>
      )}
    </div>
  );
};
