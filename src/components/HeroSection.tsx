"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Upload,
  Link as LinkIcon,
  Mic,
  Search,
  ArrowUpRight,
} from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="w-full flex flex-col items-center text-center py-6 md:py-10">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-2xl md:text-3xl font-semibold tracking-tight"
        >
          What do you want to learn?
        </motion.h1>

        {/* Quick actions - mobile stacked */}
        <motion.div
          className="mt-4 w-full md:hidden"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {[
            { label: "Upload", sub: "File, audio, video", Icon: Upload },
            { label: "Paste", sub: "YouTube, website, text", Icon: LinkIcon },
            // { label: "Record", sub: "Record class, video call", Icon: Mic },
          ].map(({ label, sub, Icon }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { y: 8, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              className="mb-3 last:mb-0"
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full justify-start gap-3 bg-card text-card-foreground hover:bg-accent rounded-2xl h-16"
              >
                <Icon className="size-5 text-primary" />
                <div className="text-left">
                  <div className="text-sm font-semibold">{label}</div>
                  <div className="text-xs text-muted-foreground">{sub}</div>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick actions - desktop */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.1 },
            },
          }}
          className="hidden md:grid mt-3 grid-cols-2 gap-2 md:gap-3 w-full max-w-2xl"
        >
          {[
            { label: "Upload", sub: "File, audio, video", Icon: Upload },
            { label: "Paste", sub: "YouTube, website, text", Icon: LinkIcon },
            // { label: "Record", sub: "Record class, video call", Icon: Mic },
          ].map(({ label, Icon, sub }) => (
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
                variant="outline"
                className="w-full flex flex-col justify-center items-start gap-2 bg-card text-card-foreground hover:bg-accent rounded-xl h-32"
              >
                <Icon className="size-5 text-primary" />
                <span className="text-sm font-medium">{label}</span>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Large search */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="mt-4 w-full max-w-2xl"
        >
          <div className="relative">
            <Input
              className="h-12 pl-10 pr-24 rounded-2xl text-base"
              placeholder="Learn anything"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Button
              variant="secondary"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 p-0 rounded-full"
            >
              <ArrowUpRight className="size-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
