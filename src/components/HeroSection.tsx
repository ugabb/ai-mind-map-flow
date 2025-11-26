"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Link as LinkIcon, Search, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const HeroSection = () => {
  const [_isModalOpen, setIsModalOpen] = useState(false);

  const handlePasteClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      {/* Hero */}
      <div className="flex w-full flex-col items-center py-6 text-center md:py-10">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold text-2xl tracking-tight md:text-3xl"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35 }}
        >
          What do you want to learn?
        </motion.h1>

        {/* Quick actions - mobile stacked */}
        <motion.div
          animate="show"
          className="mt-4 w-full md:hidden"
          initial="hidden"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {[
            {
              label: "Upload",
              sub: "File, audio, video",
              Icon: Upload,
              onClick: () => {},
            },
            {
              label: "Paste",
              sub: "YouTube, website, text",
              Icon: LinkIcon,
              onClick: handlePasteClick,
            },
            // { label: "Record", sub: "Record class, video call", Icon: Mic },
          ].map(({ label, sub, Icon, onClick }) => (
            <motion.div
              className="mb-3 last:mb-0"
              key={label}
              variants={{
                hidden: { y: 8, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="h-16 w-full justify-start gap-3 rounded-2xl bg-card text-card-foreground hover:bg-accent"
                onClick={onClick}
                variant="outline"
              >
                <Icon className="size-5 text-primary" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{label}</div>
                  <div className="text-muted-foreground text-xs">{sub}</div>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick actions - desktop */}
        <motion.div
          animate="show"
          className="mt-3 hidden w-full max-w-2xl grid-cols-2 gap-2 md:grid md:gap-3"
          initial="hidden"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.1 },
            },
          }}
        >
          {[
            {
              label: "Upload",
              sub: "File, audio, video",
              Icon: Upload,
              onClick: () => {},
            },
            {
              label: "Paste",
              sub: "YouTube, website, text",
              Icon: LinkIcon,
              onClick: handlePasteClick,
            },
            // { label: "Record", sub: "Record class, video call", Icon: Mic },
          ].map(({ label, Icon, sub, onClick }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { y: 6, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="flex h-32 w-full flex-col items-start justify-center gap-2 rounded-xl bg-card text-card-foreground hover:bg-accent"
                onClick={onClick}
                variant="outline"
              >
                <Icon className="size-5 text-primary" />
                <span className="font-medium text-sm">{label}</span>
                <div className="text-muted-foreground text-xs">{sub}</div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Large search */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 w-full max-w-2xl"
          initial={{ opacity: 0, y: 8 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <div className="relative">
            <Input
              className="h-12 rounded-2xl pr-24 pl-10 text-base"
              placeholder="Learn anything"
            />
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 size-5 text-muted-foreground" />
            <Button
              className="-translate-y-1/2 absolute top-1/2 right-2 h-9 w-9 rounded-full p-0"
              variant="secondary"
            >
              <ArrowUpRight className="size-5" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* <GenerateMindMapModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={session?.user}
        title="Youtube Link"
        defaultUploadType="YTB_URL"
      /> */}
    </div>
  );
};
