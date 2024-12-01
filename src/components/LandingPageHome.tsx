"use client";

import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { FaBars, FaGithub } from "react-icons/fa";
import { LuX } from "react-icons/lu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function LandingPageHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <Image
                src="/assets/logo.png"
                alt="girl walking"
                width={50}
                height={50}
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <Sheet key="right">
              <SheetTrigger>
                <FaBars aria-hidden="true" className="size-6" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="#" className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative isolate px-6 pt-14 lg:px-8 h-screen">
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
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Discover the power of AI Mind Map.{" "}
              <Link href="/login" className="font-semibold text-indigo-600">
              <span aria-hidden="true" className="absolute inset-0" />
              Explore <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-5 text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-indigo-500 sm:text-7xl">
              AI Mind Map
            </h1>
            <Image
              src="/assets/girl_walking.png"
              alt="girl walking"
              width={200}
              height={200}
            />
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
              Generate a mind map from your videos. AI Mind Map is a tool that
              helps you study by generating hierarchical mind map content.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login"
                className="rounded-md outline outline-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-indigo-500 shadow-sm transition-all hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                href="https://github.com/ugabb/ai-mind-map-flow"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-1 text-sm/6 font-semibold text-gray-900"
              >
                Github <span aria-hidden="true">→</span>
                <FaGithub className="size-5" />
              </Link>
            </div>
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

      <section className="bg-indigo-200/20 flex flex-col p-2 md:p-5 items-center justify-center">
        <h1 className="text-3xl text-slate-zinc-700 font-semibold text-center">
          How it Works
        </h1>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h2 className="text-indigo-500 font-semibold">
              <span className="text-5xl font-bold">1</span> Upload Video
            </h2>
            <p className="text-zinc-600">
              Upload a video to the AI Mind Map platform. Youtube URL or File
            </p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-indigo-500 font-semibold">
              <span className="text-5xl font-bold">2</span> Generate Mind Map
            </h2>
            <p className="text-zinc-600">
              AI Mind Map will generate a mind map from the video.
            </p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-indigo-500 font-semibold">
              <span className="text-5xl font-bold">3</span> Study
            </h2>
            <p className="text-zinc-600">
              Study the mind map generated from the video.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
