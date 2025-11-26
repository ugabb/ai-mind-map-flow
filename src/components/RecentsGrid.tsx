"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RecentCard } from "./RecentCard";

type RecentItem = {
  id: string;
  title: string;
  subtitle?: string;
  timestamp: string;
  thumbnail?: string;
  type?: "video" | "document";
};

type RecentsGridProps = {
  items?: RecentItem[];
  onViewAll?: () => void;
  onItemClick?: (item: RecentItem) => void;
  onItemDelete?: (item: RecentItem) => void;
  onItemEdit?: (item: RecentItem) => void;
  onItemShare?: (item: RecentItem) => void;
};

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
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-lg">Recents</h2>
        {onViewAll && (
          <Button onClick={onViewAll} size="sm" variant="ghost">
            View all
          </Button>
        )}
      </div>

      {/* Grid */}
      <motion.div
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial="hidden"
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
              onClick={() => onItemClick?.(item)}
              onDelete={() => onItemDelete?.(item)}
              onEdit={() => onItemEdit?.(item)}
              onShare={() => onItemShare?.(item)}
              subtitle={item.subtitle}
              thumbnail={item.thumbnail}
              timestamp={item.timestamp}
              title={item.title}
              type={item.type}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="py-12 text-center">
          <div className="mb-2 text-muted-foreground">No recent items</div>
          <p className="text-muted-foreground text-sm">
            Your recent learning materials will appear here
          </p>
        </div>
      )}
    </div>
  );
};
