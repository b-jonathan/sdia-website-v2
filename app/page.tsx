"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Award,
  Heart,
  Target,
  Eye,
  ArrowRight,
  Play,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Counter animation hook
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return { count, setIsVisible };
}

// Stats component with animation
function StatCard({
  icon: Icon,
  value,
  label,
  suffix = "",
}: {
  icon: any;
  value: number;
  label: string;
  suffix?: string;
}) {
  const { count, setIsVisible } = useCounter(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stat-${label}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [setIsVisible, label]);

  return (
    <Card
      id={`stat-${label}`}
      className="border-secondary-200 p-6 text-center transition-all duration-300 hover:border-secondary-400 hover:shadow-lg"
    >
      <CardContent className="p-0">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div className="mb-2 text-3xl font-bold text-primary-600">
          {count}
          {suffix}
        </div>
        <div className="font-medium text-gray-600">{label}</div>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Video Placeholder */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/geisel.jpg?height=1080&width=1920&text=UCSD+Campus+Video"
            alt="UCSD Campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/60 to-primary-700/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <Badge className="mb-6 bg-secondary-400 px-4 py-2 text-sm font-medium text-secondary-900 hover:bg-secondary-500">
            Welcome to Our Community
          </Badge>

          {/* Logo Placeholder */}
          <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full shadow-2xl">
            <Image
              src="/logo.jpeg" // put logo.jpeg inside /public
              alt="SDIA Logo"
              width={128}
              height={128}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
            <span className="block bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
              San Diego Indonesian Association
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-200 md:text-2xl">
            Connecting Indonesian students and celebrating our rich culture
            through community, tradition, and friendship at UC San Diego.
          </p>

          {/* Social Media Icons */}
          <div className="mb-8 flex justify-center space-x-6">
            <a
              href="#"
              className="group rounded-full bg-white bg-opacity-20 p-3 transition-all duration-300 hover:bg-opacity-30"
            >
              <svg
                className="h-6 w-6 text-white transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              className="group rounded-full bg-white bg-opacity-20 p-3 transition-all duration-300 hover:bg-opacity-30"
            >
              <svg
                className="h-6 w-6 text-white transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group rounded-full bg-primary-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl"
            >
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-white bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-primary-600"
            >
              <Play className="mr-2 h-5 w-5" />
              Upcoming Events
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50">
            <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/70"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-secondary-100 text-secondary-800 hover:bg-secondary-200">
              Our Purpose
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Mission & Vision
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Guided by our commitment to cultural preservation and community
              building
            </p>
          </div>

          {/* Mission Section - Text Left, Image Right */}
          <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h3 className="mb-6 text-4xl font-bold text-primary-600">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                To create a vibrant community that celebrates Indonesian
                culture, supports academic excellence, and fosters lifelong
                connections among Indonesian students at UCSD. We strive to be a
                home away from home while promoting cultural awareness and
                diversity on campus.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                We bring Indonesian students together through cultural events,
                academic support, and social activities that strengthen our
                bonds and preserve our heritage.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-700">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Our Mission</h4>
                  <p className="text-gray-600">
                    Building community through culture
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/mission.jpg"
                  alt="SDIA Group Photo"
                  width={600}
                  height={400}
                  className="h-[400px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 opacity-20"></div>
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 opacity-20"></div>
            </div>
          </div>

          {/* Vision Section - Image Left, Text Right */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/vision.jpg?height=400&width=600&text=Vision+Group+Photo"
                  alt="SDIA Vision Photo"
                  width={600}
                  height={400}
                  className="h-[400px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 opacity-20"></div>
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-500 opacity-20"></div>
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <h3 className="mb-6 text-4xl font-bold text-primary-600">
                Our Vision
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                To be the premier Indonesian student organization that bridges
                cultures, empowers future leaders, and creates lasting impact
                both within UCSD and the broader San Diego community.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                We envision a future where Indonesian heritage thrives and
                inspires others, fostering understanding and appreciation for
                our rich cultural diversity.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-secondary-400 to-secondary-500">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Our Vision</h4>
                  <p className="text-gray-600">
                    Inspiring cultural understanding
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="bg-gradient-to-r from-primary-50 via-white to-secondary-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">
              Our Impact
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              By the Numbers
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              See how our community has grown and the impact we&apos;ve made
              together
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StatCard
              icon={Users}
              value={150}
              label="Active Members"
              suffix="+"
            />
            <StatCard icon={Calendar} value={25} label="Events This Year" />
            <StatCard icon={Award} value={8} label="Years Strong" />
          </div>

          {/* Additional Stats Row */}
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="border-secondary-200 bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 text-center transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <Heart className="mx-auto mb-4 h-12 w-12 text-primary-600" />
                <div className="mb-2 text-2xl font-bold text-primary-600">
                  500+
                </div>
                <div className="font-medium text-gray-600">Alumni Network</div>
              </CardContent>
            </Card>

            <Card className="border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-6 text-center transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <Award className="mx-auto mb-4 h-12 w-12 text-secondary-600" />
                <div className="mb-2 text-2xl font-bold text-secondary-600">
                  12
                </div>
                <div className="font-medium text-gray-600">
                  Cultural Showcases
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Ready to Join Our Family?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-primary-100">
            Become part of a community that celebrates Indonesian culture and
            creates lifelong friendships
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-secondary-400 px-8 py-4 text-lg font-semibold text-secondary-900 shadow-lg transition-all duration-300 hover:bg-secondary-500 hover:shadow-xl"
            >
              Join Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700">
                  <span className="font-bold text-white">SD</span>
                </div>
                <span className="text-xl font-bold">
                  SDIA - San Diego Indonesian Association
                </span>
              </div>
              <p className="mb-4 max-w-md text-gray-400">
                Connecting Indonesian students and celebrating our rich culture
                through community, tradition, and friendship.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/about"
                    className="transition-colors hover:text-secondary-400"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/team"
                    className="transition-colors hover:text-secondary-400"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="/events/upcoming"
                    className="transition-colors hover:text-secondary-400"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="transition-colors hover:text-secondary-400"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-secondary-400"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-secondary-400"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-secondary-400"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors hover:text-secondary-400"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 SDIA - San Diego Indonesian Association. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
