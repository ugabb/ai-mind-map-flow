"use client";

import { useState } from "react";
import {
  FaBars,
  FaGithub,
  FaLinkedin,
  FaCheck,
  FaStar,
  FaPlay,
  FaBrain,
  FaVideo,
  FaDownload,
} from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { linkSocials } from "@/constants/values";

const navigation = [
  { name: "Log In", href: "/login" },
  { name: "Sign Up", href: "/sign-up" },
  { name: "Github", href: linkSocials.github },
  { name: "Linkedin", href: linkSocials.linkedin },
];

export default function LandingPageHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <FaVideo className="w-8 h-8 text-primary" />,
      title: "Video Processing",
      description:
        "Upload videos from YouTube or local files and let AI extract key concepts automatically.",
    },
    {
      icon: <FaBrain className="w-8 h-8 text-primary" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced AI algorithms analyze content and create structured mind maps with hierarchical relationships.",
    },
    {
      icon: <FaDownload className="w-8 h-8 text-primary" />,
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
    <div className="bg-background min-h-screen">
      {/* Header */}
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
                className="flex items-center gap-3"
              >
                <Image
                  src="/assets/logo.png"
                  alt="AI Mind Map logo"
                  width={40}
                  height={40}
                />
                <span className="text-xl font-bold text-foreground">
                  AI Mind Map
                </span>
              </motion.div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <Sheet key="bottom">
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground"
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
                          className="text-base font-medium text-foreground hover:text-primary"
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
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
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
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium"
              >
                <FaStar className="w-3 h-3 mr-1" />
                New: AI-Powered Mind Maps
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
            >
              Transform Videos into
              <span className="block text-primary">Mind Maps</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto"
            >
              Turn any video into a structured mind map with AI. Perfect for
              students, professionals, and anyone who wants to learn more
              effectively.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/sign-up"
                className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
              >
                Start Free Trial
              </Link>
              <Link
                href="#demo"
                className="flex items-center gap-2 rounded-md border border-input bg-background px-6 py-3 text-base font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <FaPlay className="w-4 h-4" />
                Watch Demo
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-16"
            >
              <Image
                src="/assets/girl_walking.png"
                alt="Illustration of a girl walking"
                width={300}
                height={300}
                className="mx-auto w-64 h-64 sm:w-80 sm:h-80"
              />
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
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose AI Mind Map?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make learning more effective and
              enjoyable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
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
      <section id="demo" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              See It In Action
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch how AI Mind Map transforms your videos into structured
              learning materials.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/assets/canvas.png"
              height={600}
              width={1200}
              alt="AI Mind Map demo"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in just three simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Upload Video",
                description:
                  "Upload a video from YouTube or your device. Our AI supports all major video formats.",
                icon: <FaVideo className="w-8 h-8" />,
              },
              {
                number: "2",
                title: "AI Processing",
                description:
                  "Our advanced AI analyzes the content and extracts key concepts, relationships, and insights.",
                icon: <FaBrain className="w-8 h-8" />,
              },
              {
                number: "3",
                title: "Study & Learn",
                description:
                  "Review your personalized mind map, export it, and share it with your study group.",
                icon: <FaDownload className="w-8 h-8" />,
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
                    {step.number}
                  </div>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you. No hidden fees, cancel
              anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full ${
                    plan.popular ? "ring-2 ring-primary shadow-lg" : ""
                  }`}
                >
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">
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
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <FaCheck className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={plan.href}
                      className={`w-full block text-center rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
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
      <footer className="bg-muted border-t">
        <div className="mx-auto max-w-7xl py-16 px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2"
            >
              <Link href="/" className="flex items-center gap-3 mb-4">
                <Image
                  src="/assets/logo.png"
                  alt="AI Mind Map logo"
                  width={40}
                  height={40}
                />
                <span className="text-2xl font-bold text-foreground">
                  AI Mind Map
                </span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                Transform your learning experience with AI-powered mind maps.
                Turn any video into structured knowledge.
              </p>
              <div className="flex gap-4">
                <Link
                  href={linkSocials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                </Link>
                <Link
                  href={linkSocials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#demo"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/help"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          <Separator className="my-8" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-muted-foreground">
              &copy; 2024 AI Mind Map. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ by{" "}
              <Link
                href={linkSocials.githubProfile}
                target="_blank"
                className="text-primary hover:underline font-medium"
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
