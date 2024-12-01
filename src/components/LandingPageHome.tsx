"use client";

import { useState } from "react";
import { FaBars, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { linkSocials } from "./HomeHeader";

const navigation = [
  { name: "Log In", href: "/login" },
  { name: "Sign Up", href: "/sign-up" },
  { name: "Github", href: linkSocials.github},
  { name: "Linkedin", href: linkSocials.linkedin },
];

export default function LandingPageHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">AI Mind Map</span>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/assets/logo.png"
                  alt="AI Mind Map logo"
                  width={50}
                  height={50}
                />
              </motion.div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <Sheet key='bottom'>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-700"
                >
                  <FaBars aria-hidden="true" className="size-6" />
                  <span className="sr-only">Open menu</span>
                </motion.button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    <nav className="mt-6 flex flex-col gap-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-base font-medium text-gray-900 hover:text-indigo-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      <section className="relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Discover the power of AI Mind Map.{" "}
              <Link href="/login" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Explore <span aria-hidden="true">&rarr;</span>
              </Link>
            </motion.div>
          </div>
          <div className="flex flex-col justify-center items-center gap-5 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-balance text-4xl font-semibold tracking-tight text-indigo-500 sm:text-6xl md:text-7xl"
            >
              AI Mind Map
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Image
                src="/assets/girl_walking.png"
                alt="Illustration of a girl walking"
                width={200}
                height={200}
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 text-lg font-medium text-gray-500 sm:text-xl max-w-xl"
            >
              Generate a mind map from your videos. AI Mind Map is a tool that
              helps you study by generating hierarchical mind map content.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6"
            >
              <Link
                href="/login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                href={linkSocials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-indigo-600"
              >
                Github <span aria-hidden="true">→</span>
                <FaGithub className="size-5" />
              </Link>
            </motion.div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </section>

      <section className="p-6 md:p-12 lg:p-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image 
            src="/assets/canvas.png" 
            height={600} 
            width={1000} 
            alt="Canvas preview" 
            className="rounded-xl shadow-lg w-full h-auto"
          />
        </motion.div>
      </section>

      <section className="bg-indigo-100 py-16 px-6 md:px-12 lg:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl text-gray-800 font-semibold text-center mb-12"
        >
          How it Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "1", title: "Upload Video", description: "Upload a video to the AI Mind Map platform. Youtube URL or File" },
            { number: "2", title: "Generate Mind Map", description: "AI Mind Map will generate a mind map from the video." },
            { number: "3", title: "Study", description: "Study the mind map generated from the video." },
          ].map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-indigo-500 mb-4">{step.number}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="bg-black border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-4 md:mb-0"
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/logo.png"
                  alt="AI Mind Map logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-xl font-semibold text-zinc-50">AI Mind Map</span>
              </Link>
            </motion.div>
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8"
            >
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className="text-base text-zinc-50 hover:text-zinc-200 flex items-center"
                    target={item.name === "Github" || item.name === "Linkedin" ? "_blank" : undefined}
                    rel={item.name === "Github" || item.name === "Linkedin" ? "noopener noreferrer" : undefined}
                  >
                    {item.name === "Github" ? (
                      <FaGithub className="inline-block mr-1" />
                    ) : item.name === "Linkedin" ? (
                      <FaLinkedin className="inline-block mr-1" />
                    ) : null}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 border-t border-indigo-500 pt-8 text-center"
          >
            <p className="text-base text-gray-400 undeline">&copy; 2024 AI Mind Map. All rights reserved. <Link href={linkSocials.githubProfile} target="_blank" className="text-indigo-500 underline underline-offset-2 font-bold">Gabriel Barros</Link></p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
