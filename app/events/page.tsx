"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type Event = {
  time: any;
  date: any;
  id: string;
  title: string;
  description: string;
  long_description?: string;
  documentation?: string[]; // PB files
  datetime: string; // ISO string from PB
  instagram?: string;
  location?: string;
  category?: "Cultural" | "Social" | "Academic" | "Community" | string;
  isPast?: boolean;
  created: string;
  updated: string;
};

const PB_BASE = "https://permiassdia.pockethost.io";
const COLLECTION = "events";

// Build a PocketBase file URL for a record file
function pbFileUrl(recordId: string, filename: string) {
  if (/^https?:\/\//i.test(filename)) return filename; // already a URL
  return `${PB_BASE}/api/files/${COLLECTION}/${recordId}/${encodeURIComponent(filename)}`;
}

function parseDateTime(iso: string) {
  if (!iso) return { date: "", time: "" };
  const d = new Date(iso);

  // Localized strings
  const date = d.toLocaleDateString("en-US", {
    weekday: "short", // e.g. Sun
    month: "short", // e.g. Sep
    day: "numeric", // e.g. 7
    year: "numeric", // e.g. 2025
  });

  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { date, time };
}

async function getEvents(): Promise<Event[]> {
  const res = await fetch(
    `${PB_BASE}/api/collections/${COLLECTION}/records?perPage=100`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`);
  const data = await res.json();

  return (data.items as Event[]).map(e => {
    const { date, time } = parseDateTime(e.datetime);
    return { ...e, date, time };
  });
}

function categoryTone(cat?: string) {
  const c = (cat || "").toLowerCase();
  if (c === "cultural") return "bg-primary-600 text-white";
  if (c === "social") return "bg-secondary-600 text-white";
  if (c === "academic") return "bg-blue-600 text-white";
  if (c === "community") return "bg-green-600 text-white";
  return "bg-gray-200 text-gray-800";
}

function prettyCategory(cat?: string) {
  if (!cat) return "Event";
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

function isPastEvent(e: Event) {
  if (typeof e.isPast === "boolean") return e.isPast;
  if (!e.date) return false;
  // Compare date only (ignore time zones)
  const today = new Date();
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59
  );
  return new Date(e.date) < endOfToday;
}

/* -------------------- Modals -------------------- */

function EventModal({
  event,
  isOpen,
  onClose,
  onOpenGallery,
}: {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onOpenGallery: (images: string[], title: string) => void;
}) {
  const images = useMemo(
    () => (event.documentation || []).map(f => pbFileUrl(event.id, f)),
    [event]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white">
        <div className="relative">
          <div className="relative h-56 md:h-72">
            <Image
              src={images[0] || "/placeholder.svg"}
              alt={event.title}
              fill
              className="rounded-t-lg object-cover"
              // If you haven't allowed pockethost in next.config.js, temporarily add unoptimized
              // unoptimized
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <Badge className={categoryTone(event.category)}>
                {prettyCategory(event.category)}
              </Badge>
              <div className="text-sm text-gray-500">
                {event.date ? <span>{event.date}</span> : null}
                {event.time ? (
                  <span className="ml-2">• {event.time}</span>
                ) : null}
              </div>
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              {event.title}
            </h2>

            {event.location && (
              <div className="mb-3 flex items-center text-gray-600">
                <MapPin className="mr-2 h-4 w-4 text-primary-600" />
                {event.location}
              </div>
            )}

            <div className="prose max-w-none text-gray-700">
              {event.description && <p className="mb-2">{event.description}</p>}
              {event.long_description && <p>{event.long_description}</p>}
            </div>

            {/* Optional Instagram link if present */}
            {event.instagram && (
              <div className="mt-4">
                <Button asChild variant="outline">
                  <a
                    href={
                      event.instagram.startsWith("http")
                        ? event.instagram
                        : `https://instagram.com/${event.instagram.replace(/^@/, "")}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Instagram
                  </a>
                </Button>
              </div>
            )}
            {/* Gallery from documentation */}
            {images.length > 0 && (
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {images.slice(0, 6).map((img, i) => (
                    <button
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-lg"
                      onClick={() => onOpenGallery(images, event.title)}
                    >
                      <Image
                        src={img}
                        alt={`${event.title} - ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                  {images.length > 6 && (
                    <button
                      className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 text-gray-600"
                      onClick={() => onOpenGallery(images, event.title)}
                    >
                      +{images.length - 6} more
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryModal({
  images,
  isOpen,
  onClose,
  title,
}: {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) {
  const [index, setIndex] = useState(0);
  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        <div className="relative h-[70vh]">
          <Image
            src={images[index]}
            alt={`${title} - ${index + 1}`}
            fill
            className="object-contain"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setIndex(i => (i - 1 + images.length) % images.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={() => setIndex(i => (i + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center text-white">
          <p className="text-sm opacity-80">
            {index + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Card -------------------- */

function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  const image =
    (event.documentation?.[0] && pbFileUrl(event.id, event.documentation[0])) ||
    "/placeholder.svg";
  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4">
            <Badge className={categoryTone(event.category)}>
              {prettyCategory(event.category)}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-primary-600">
            {event.title}
          </h3>

          <div className="mb-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-primary-600" />
              {event.date}
            </div>
            {event.time && (
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-primary-600" />
                {event.time}
              </div>
            )}
            {event.location && (
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-primary-600" />
                {event.location}
              </div>
            )}
          </div>

          <p className="line-clamp-2 text-sm text-gray-600">
            {event.description}
          </p>

          <div className="mt-4 flex justify-end">
            <Button
              size="sm"
              className="bg-primary-600 text-white hover:bg-primary-700"
            >
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------- Main Page -------------------- */

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // keep this as requested
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryTitle, setGalleryTitle] = useState<string>("");
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const items = await getEvents();
        if (!mounted) return;
        setEvents(items);
      } catch (e: any) {
        if (!mounted) return;
        setErr(e?.message ?? String(e));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const sourceEvents = useMemo(() => {
    if (activeTab === "upcoming") return events.filter(e => !isPastEvent(e));
    return events.filter(e => isPastEvent(e));
  }, [events, activeTab]);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "all") return sourceEvents;
    const key = selectedCategory.toLowerCase();
    return sourceEvents.filter(e => (e.category || "").toLowerCase() === key);
  }, [sourceEvents, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/events.jpg?height=800&width=1920&text=SDIA+Events"
            alt="SDIA Events"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/60 to-primary-700/40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-6 bg-secondary-400 px-4 py-2 text-sm font-medium text-secondary-900 hover:bg-secondary-500">
            SDIA Events
          </Badge>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl">
            Our
            <span className="block bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
              Events
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-200 md:text-2xl">
            Join us for exciting cultural celebrations, educational workshops,
            and community activities.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b bg-white px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`rounded-full px-8 py-3 font-medium transition-all ${
                  activeTab === "upcoming"
                    ? "bg-primary-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`rounded-full px-8 py-3 font-medium transition-all ${
                  activeTab === "past"
                    ? "bg-primary-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Past Events
              </button>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                key: "all",
                label: "All Events",
                color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
              },
              {
                key: "cultural",
                label: "Cultural",
                color: "bg-primary-100 text-primary-800 hover:bg-primary-200",
              },
              {
                key: "social",
                label: "Social",
                color:
                  "bg-secondary-100 text-secondary-800 hover:bg-secondary-200",
              },
              {
                key: "academic",
                label: "Academic",
                color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
              },
              {
                key: "community",
                label: "Community",
                color: "bg-green-100 text-green-800 hover:bg-green-200",
              },
            ].map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                  selectedCategory === category.key
                    ? "bg-primary-600 text-white shadow-lg"
                    : category.color
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              {activeTab === "upcoming"
                ? "Don't Miss Out!"
                : "Relive the Memories"}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              {activeTab === "upcoming"
                ? "Click on any event to see more details"
                : "Browse through our past events and photo galleries"}
            </p>
          </div>

          {loading && (
            <p className="text-center text-gray-500">Loading events…</p>
          )}
          {err && <p className="text-center text-red-600">Error: {err}</p>}

          {!loading && !err && filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map(event => (
                <div key={event.id} className="relative">
                  <EventCard
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                  />
                </div>
              ))}
            </div>
          ) : !loading && !err ? (
            <div className="py-12 text-center text-gray-500">
              No events found.
            </div>
          ) : null}
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onOpenGallery={(images, title) => {
            setGalleryImages(images);
            setGalleryTitle(title);
            setGalleryOpen(true);
          }}
        />
      )}

      {/* Gallery Modal */}
      <GalleryModal
        images={galleryImages}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        title={galleryTitle}
      />

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            {activeTab === "upcoming"
              ? "Never Miss an Event"
              : "Want to Join Future Events?"}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-primary-100">
            {activeTab === "upcoming"
              ? "Subscribe to our newsletter and follow us on social media for the latest updates"
              : "Stay connected with SDIA to be part of our next amazing events"}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-secondary-400 px-8 py-4 text-lg font-semibold text-secondary-900 shadow-lg transition-all duration-300 hover:bg-secondary-500 hover:shadow-xl"
            >
              Subscribe to Newsletter
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary-600"
            >
              Follow Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer (unchanged) */}
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
                    href="/events"
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
