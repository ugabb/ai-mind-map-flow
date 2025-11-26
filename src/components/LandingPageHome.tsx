"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaBrain,
  FaCheck,
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaPlay,
  FaStar,
  FaVideo,
} from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { linkSocials } from "@/constants/values";

const navigation = [
  { name: "Log In", href: "/login" },
  { name: "Sign Up", href: "/sign-up" },
  { name: "Github", href: linkSocials.github },
  { name: "Linkedin", href: linkSocials.linkedin },
];

export default function LandingPageHome() {
  const [_mobileMenuOpen, _setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <FaVideo className="h-8 w-8 text-primary" />,
      title: "Video Processing",
      description:
        "Upload videos from YouTube or local files and let AI extract key concepts automatically.",
    },
    {
      icon: <FaBrain className="h-8 w-8 text-primary" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced AI algorithms analyze content and create structured mind maps with hierarchical relationships.",
    },
    {
      icon: <FaDownload className="h-8 w-8 text-primary" />,
      title: "Export & Share",
      description:
        "Export your mind maps in multiple formats and share them with your study groups or colleagues.",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "3 mind maps per month",
        "Basic AI processing",
        "Standard export formats",
        "Community support",
      ],
      cta: "Get Started",
      href: "/sign-up",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "For serious learners",
      features: [
        "Unlimited mind maps",
        "Advanced AI processing",
        "All export formats",
        "Priority support",
        "Custom themes",
        "Collaboration tools",
      ],
      cta: "Start Free Trial",
      href: "/sign-up",
      popular: true,
    },
    {
      name: "Team",
      price: "$29",
      period: "per month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "Custom integrations",
        "Dedicated support",
        "Advanced analytics",
      ],
      cta: "Contact Sales",
      href: "/contact",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link className="-m-1.5 p-1.5" href="/">
              <span className="sr-only">AI Mind Map</span>
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  alt="AI Mind Map logo"
                  height={40}
                  src="/assets/logo.png"
                  width={40}
                />
                <span className="font-bold text-foreground text-xl">
                  AI Mind Map
                </span>
              </motion.div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <Sheet key="bottom">
              <SheetTrigger asChild>
                <motion.button
                  className="text-muted-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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
                          className="font-medium text-base text-foreground hover:text-primary"
                          href={item.href}
                          key={item.name}
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
                  className="font-semibold text-foreground text-sm transition-colors hover:text-primary"
                  href={item.href}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                className="font-semibold text-foreground text-sm transition-colors hover:text-primary"
                href="/login"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative isolate flex min-h-screen items-center px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="-top-40 -z-10 sm:-top-80 absolute inset-x-0 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="-translate-x-1/2 relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] rotate-[30deg] bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge
                className="px-4 py-2 font-medium text-sm"
                variant="secondary"
              >
                <FaStar className="mr-1 h-3 w-3" />
                New: AI-Powered Mind Maps
              </Badge>
            </motion.div>

            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="font-bold text-4xl text-foreground tracking-tight sm:text-6xl md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Transform Videos into
              <span className="block text-primary">Mind Maps</span>
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-8"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Turn any video into a structured mind map with AI. Perfect for
              students, professionals, and anyone who wants to learn more
              effectively.
            </motion.p>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                className="rounded-md bg-primary px-6 py-3 font-semibold text-base text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                href="/sign-up"
              >
                Start Free Trial
              </Link>
              <Link
                className="flex items-center gap-2 rounded-md border border-input bg-background px-6 py-3 font-semibold text-base text-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
                href="#demo"
              >
                <FaPlay className="h-4 w-4" />
                Watch Demo
              </Link>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="mt-16"
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Image
                alt="Illustration of a girl walking"
                className="mx-auto h-64 w-64 sm:h-80 sm:w-80"
                height={300}
                src="/assets/girl_walking.png"
                width={300}
              />
            </motion.div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="-z-10 absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            className="-translate-x-1/2 relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
              Why Choose AI Mind Map?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Powerful features designed to make learning more effective and
              enjoyable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                key={feature.title}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full transition-shadow duration-200 hover:shadow-lg">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="px-6 py-24 md:px-12 lg:px-24" id="demo">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
              See It In Action
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Watch how AI Mind Map transforms your videos into structured
              learning materials.
            </p>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              alt="AI Mind Map demo"
              className="h-auto w-full"
              height={600}
              src="/assets/canvas.png"
              width={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Get started in just three simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                number: "1",
                title: "Upload Video",
                description:
                  "Upload a video from YouTube or your device. Our AI supports all major video formats.",
                icon: <FaVideo className="h-8 w-8" />,
              },
              {
                number: "2",
                title: "AI Processing",
                description:
                  "Our advanced AI analyzes the content and extracts key concepts, relationships, and insights.",
                icon: <FaBrain className="h-8 w-8" />,
              },
              {
                number: "3",
                title: "Study & Learn",
                description:
                  "Review your personalized mind map, export it, and share it with your study group.",
                icon: <FaDownload className="h-8 w-8" />,
              },
            ].map((step, index) => (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                key={step.number}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="relative">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary font-bold text-2xl text-primary-foreground">
                    {step.number}
                  </div>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                </div>
                <h3 className="mb-4 font-semibold text-foreground text-xl">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Choose the plan that works best for you. No hidden fees, cancel
              anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                key={plan.name}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {plan.popular && (
                  <div className="-top-4 -translate-x-1/2 absolute left-1/2 transform">
                    <Badge className="bg-primary px-4 py-1 text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full ${
                    plan.popular ? "shadow-lg ring-2 ring-primary" : ""
                  }`}
                >
                  <CardHeader className="pb-8 text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="font-bold text-4xl text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                    <CardDescription className="mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          className="flex items-center gap-3"
                          key={featureIndex}
                        >
                          <FaCheck className="h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-muted-foreground text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      className={`block w-full rounded-md px-4 py-2 text-center font-semibold text-sm transition-all duration-200 ${
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      href={plan.href}
                    >
                      {plan.cta}
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Link className="mb-4 flex items-center gap-3" href="/">
                <Image
                  alt="AI Mind Map logo"
                  height={40}
                  src="/assets/logo.png"
                  width={40}
                />
                <span className="font-bold text-2xl text-foreground">
                  AI Mind Map
                </span>
              </Link>
              <p className="mb-6 max-w-md text-muted-foreground">
                Transform your learning experience with AI-powered mind maps.
                Turn any video into structured knowledge.
              </p>
              <div className="flex gap-4">
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href={linkSocials.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaGithub className="h-5 w-5" />
                </Link>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href={linkSocials.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaLinkedin className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className="mb-4 font-semibold text-foreground">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="#features"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="#pricing"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="#demo"
                  >
                    Demo
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="/login"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className="mb-4 font-semibold text-foreground">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="/help"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="/terms"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          <Separator className="my-8" />

          <motion.div
            className="flex flex-col items-center justify-between gap-4 md:flex-row"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileInView={{ opacity: 1 }}
          >
            <p className="text-muted-foreground text-sm">
              &copy; 2024 AI Mind Map. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Made with ❤️ by{" "}
              <Link
                className="font-medium text-primary hover:underline"
                href={linkSocials.githubProfile}
                target="_blank"
              >
                Gabriel Barros
              </Link>
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
