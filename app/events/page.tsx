"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription: string;
  image: string;
  category: "cultural" | "social" | "academic" | "community";
  attendees: number;
  maxAttendees?: number;
  price: string;
  organizer: string;
  images: string[];
  requirements?: string[];
  isPast?: boolean;
  gallery?: string[];
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Indonesian Cultural Night 2024",
    date: "March 15, 2024",
    time: "6:00 PM - 10:00 PM",
    location: "Price Center Ballroom",
    description:
      "Join us for our biggest cultural celebration featuring traditional dances, music, and authentic Indonesian cuisine.",
    longDescription:
      "Our annual Indonesian Cultural Night is the highlight of our year, showcasing the rich diversity of Indonesian culture through traditional performances, authentic cuisine, and cultural exhibitions. This year's theme 'Unity in Diversity' celebrates the beautiful tapestry of Indonesia's 17,000 islands and 300+ ethnic groups.",
    image: "/placeholder.svg?height=400&width=600&text=Cultural+Night+2024",
    category: "cultural",
    attendees: 180,
    maxAttendees: 250,
    price: "Free",
    organizer: "Cultural Committee",
    images: [
      "/placeholder.svg?height=400&width=600&text=Cultural+Night+1",
      "/placeholder.svg?height=400&width=600&text=Cultural+Night+2",
      "/placeholder.svg?height=400&width=600&text=Cultural+Night+3",
    ],
    requirements: ["RSVP required", "Cultural attire encouraged"],
  },
  {
    id: 2,
    title: "Cooking Workshop: Rendang & Nasi Gudeg",
    date: "March 22, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Warren College Kitchen",
    description:
      "Learn to cook authentic Indonesian dishes with our experienced chefs and take home delicious meals.",
    longDescription:
      "Master the art of Indonesian cooking in this hands-on workshop where you'll learn to prepare two iconic dishes: the rich and flavorful Rendang from West Sumatra and the sweet and savory Nasi Gudeg from Yogyakarta. All ingredients and recipes provided!",
    image: "/placeholder.svg?height=400&width=600&text=Cooking+Workshop",
    category: "cultural",
    attendees: 25,
    maxAttendees: 30,
    price: "$15",
    organizer: "Food Committee",
    images: [
      "/placeholder.svg?height=400&width=600&text=Cooking+1",
      "/placeholder.svg?height=400&width=600&text=Cooking+2",
      "/placeholder.svg?height=400&width=600&text=Cooking+3",
    ],
    requirements: ["Payment required", "Apron recommended"],
  },
  {
    id: 3,
    title: "Study Group: Midterm Prep",
    date: "March 8, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Geisel Library, Room 2E",
    description:
      "Collaborative study session for midterm preparation with snacks and peer support.",
    longDescription:
      "Join fellow Indonesian students for a productive study session as we prepare for midterm exams. We'll provide a quiet, supportive environment with Indonesian snacks and drinks to keep you energized. Bring your textbooks and let's succeed together!",
    image: "/placeholder.svg?height=400&width=600&text=Study+Group",
    category: "academic",
    attendees: 35,
    maxAttendees: 50,
    price: "Free",
    organizer: "Academic Committee",
    images: [
      "/placeholder.svg?height=400&width=600&text=Study+1",
      "/placeholder.svg?height=400&width=600&text=Study+2",
      "/placeholder.svg?height=400&width=600&text=Study+3",
    ],
  },
];

const pastEvents: Event[] = [
  {
    id: 4,
    title: "Indonesian Cultural Night 2023",
    date: "November 18, 2023",
    time: "6:00 PM - 10:00 PM",
    location: "Price Center Ballroom",
    description:
      "Our spectacular 2023 cultural showcase featuring traditional performances and authentic cuisine.",
    longDescription:
      "Last year's cultural night was a tremendous success with over 300 attendees enjoying traditional Indonesian performances, authentic food, and cultural exhibitions.",
    image: "/placeholder.svg?height=400&width=600&text=Cultural+Night+2023",
    category: "cultural",
    attendees: 320,
    price: "Free",
    organizer: "Cultural Committee",
    images: [
      "/placeholder.svg?height=400&width=600&text=2023+Cultural+1",
      "/placeholder.svg?height=400&width=600&text=2023+Cultural+2",
      "/placeholder.svg?height=400&width=600&text=2023+Cultural+3",
    ],
    isPast: true,
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Gallery+1",
      "/placeholder.svg?height=300&width=400&text=Gallery+2",
      "/placeholder.svg?height=300&width=400&text=Gallery+3",
      "/placeholder.svg?height=300&width=400&text=Gallery+4",
      "/placeholder.svg?height=300&width=400&text=Gallery+5",
      "/placeholder.svg?height=300&width=400&text=Gallery+6",
      "/placeholder.svg?height=300&width=400&text=Gallery+7",
      "/placeholder.svg?height=300&width=400&text=Gallery+8",
      "/placeholder.svg?height=300&width=400&text=Gallery+9",
    ],
  },
  {
    id: 5,
    title: "Batik Workshop",
    date: "October 14, 2023",
    time: "1:00 PM - 4:00 PM",
    location: "Visual Arts Building",
    description:
      "Hands-on workshop learning the traditional art of Indonesian batik making.",
    longDescription:
      "Students learned the ancient art of batik making, creating their own unique designs using traditional wax-resist dyeing techniques.",
    image: "/placeholder.svg?height=400&width=600&text=Batik+Workshop",
    category: "cultural",
    attendees: 45,
    price: "$20",
    organizer: "Arts Committee",
    images: [
      "/placeholder.svg?height=400&width=600&text=Batik+1",
      "/placeholder.svg?height=400&width=600&text=Batik+2",
      "/placeholder.svg?height=400&width=600&text=Batik+3",
    ],
    isPast: true,
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Batik+Gallery+1",
      "/placeholder.svg?height=300&width=400&text=Batik+Gallery+2",
      "/placeholder.svg?height=300&width=400&text=Batik+Gallery+3",
      "/placeholder.svg?height=300&width=400&text=Batik+Gallery+4",
      "/placeholder.svg?height=300&width=400&text=Batik+Gallery+5",
      "/placeholder.svg?height=300&width=400&text=Batik+Gallery+6",
    ],
  },
  {
    id: 6,
    title: "Beach Cleanup & BBQ 2023",
    date: "September 23, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "La Jolla Shores Beach",
    description:
      "Community service followed by a fun beach BBQ with games and socializing.",
    longDescription:
      "Our community came together to clean up La Jolla Shores beach, followed by a traditional Indonesian BBQ with satay, grilled fish, and beach games.",
    image: "/placeholder.svg?height=400&width=600&text=Beach+Cleanup+2023",
    category: "community",
    attendees: 65,
    price: "$10",
    organizer: "Community Service Committee",
    images: [
      "/placeholder.svg?height=400&width=600&text=Beach+1",
      "/placeholder.svg?height=400&width=600&text=Beach+2",
      "/placeholder.svg?height=400&width=600&text=Beach+3",
    ],
    isPast: true,
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Beach+Gallery+1",
      "/placeholder.svg?height=300&width=400&text=Beach+Gallery+2",
      "/placeholder.svg?height=300&width=400&text=Beach+Gallery+3",
      "/placeholder.svg?height=300&width=400&text=Beach+Gallery+4",
      "/placeholder.svg?height=300&width=400&text=Beach+Gallery+5",
      "/placeholder.svg?height=300&width=400&text=Beach+Gallery+6",
      "/placeholder.svg?height=300&width=400&text=Beach+Gallery+7",
      "/placeholder.svg?height=300&width=400&text=Beach+Gallery+8",
    ],
  },
];

function EventModal({
  event,
  isOpen,
  onClose,
  setGalleryEvent,
}: {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  setGalleryEvent: (event: Event | null) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white">
        <div className="relative">
          {/* Image Carousel */}
          <div className="relative h-64 md:h-80">
            <Image
              src={event.images[currentImageIndex] || "/placeholder.svg"}
              alt={event.title}
              fill
              className="rounded-t-lg object-cover"
            />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white bg-opacity-80 p-2 transition-all hover:bg-opacity-100"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Carousel Navigation */}
            {event.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
                {event.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-3 w-3 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white bg-opacity-50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <Badge
                className={`${
                  event.category === "cultural"
                    ? "bg-primary-100 text-primary-800"
                    : event.category === "social"
                      ? "bg-secondary-100 text-secondary-800"
                      : event.category === "academic"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                }`}
              >
                {event.category.charAt(0).toUpperCase() +
                  event.category.slice(1)}
              </Badge>
              <span className="text-2xl font-bold text-primary-600">
                {event.price}
              </span>
            </div>

            <h2 className="mb-4 text-3xl font-bold text-gray-800">
              {event.title}
            </h2>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="mr-3 h-5 w-5 text-primary-600" />
                  {event.date}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-3 h-5 w-5 text-primary-600" />
                  {event.time}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="mr-3 h-5 w-5 text-primary-600" />
                  {event.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="mr-3 h-5 w-5 text-primary-600" />
                  {event.attendees}
                  {event.maxAttendees ? `/${event.maxAttendees}` : ""}{" "}
                  {event.isPast ? "attended" : "attending"}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-800">
                    Organized by:
                  </h4>
                  <p className="text-gray-600">{event.organizer}</p>
                </div>

                {event.requirements && (
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">
                      Requirements:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {event.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary-600"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 font-semibold text-gray-800">
                About This Event
              </h4>
              <p className="leading-relaxed text-gray-600">
                {event.longDescription}
              </p>
            </div>

            {event.isPast && event.gallery && (
              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-gray-800">
                  Event Gallery
                </h4>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {event.gallery.slice(0, 6).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-80"
                      onClick={() => setGalleryEvent(event)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {event.gallery.length > 6 && (
                    <div
                      className="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 transition-colors hover:bg-gray-200"
                      onClick={() => setGalleryEvent(event)}
                    >
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-600">
                          +{event.gallery.length - 6}
                        </p>
                        <p className="text-sm text-gray-500">more photos</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!event.isPast && (
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="flex-1 bg-primary-600 text-white hover:bg-primary-700">
                  Register Now
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Favorites
                </Button>
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Share
                </Button>
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
  eventTitle,
}: {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white bg-opacity-20 p-2 transition-all hover:bg-opacity-30"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        <div className="relative h-96 md:h-[500px]">
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${eventTitle} - Image ${currentIndex + 1}`}
            fill
            className="object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-20 p-2 transition-all hover:bg-opacity-30"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-20 p-2 transition-all hover:bg-opacity-30"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <h3 className="mb-2 text-xl font-semibold text-white">
            {eventTitle}
          </h3>
          <p className="text-white text-opacity-80">
            {currentIndex + 1} of {images.length}
          </p>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-4 flex justify-center space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                index === currentIndex
                  ? "border-white"
                  : "border-transparent opacity-60"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4">
            <Badge
              className={`${
                event.category === "cultural"
                  ? "bg-primary-600 text-white"
                  : event.category === "social"
                    ? "bg-secondary-600 text-white"
                    : event.category === "academic"
                      ? "bg-blue-600 text-white"
                      : "bg-green-600 text-white"
              }`}
            >
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Badge>
          </div>
          <div className="absolute right-4 top-4">
            <Badge className="bg-white font-bold text-gray-800">
              {event.price}
            </Badge>
          </div>
          {event.isPast && (
            <div className="absolute bottom-4 right-4">
              <Badge className="bg-gray-800 text-white">Past Event</Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-primary-600">
            {event.title}
          </h3>

          <div className="mb-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="mr-2 h-4 w-4 text-primary-600" />
              {event.date}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="mr-2 h-4 w-4 text-primary-600" />
              {event.time}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-2 h-4 w-4 text-primary-600" />
              {event.location}
            </div>
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-gray-600">
            {event.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="mr-1 h-4 w-4" />
              {event.attendees}
              {event.maxAttendees ? `/${event.maxAttendees}` : ""}{" "}
              {event.isPast ? "attended" : "attending"}
            </div>
            <Button
              size="sm"
              className="bg-primary-600 text-white hover:bg-primary-700"
            >
              {event.isPast ? "View Details" : "Learn More"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [galleryEvent, setGalleryEvent] = useState<Event | null>(null);

  const currentEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;
  const filteredEvents =
    selectedCategory === "all"
      ? currentEvents
      : currentEvents.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920&text=SDIA+Events"
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

      {/* Tab Navigation */}
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

          {/* Filter Section */}
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
                ? "Click on any event to see more details and register"
                : "Browse through our past events and photo galleries"}
            </p>
          </div>

          {filteredEvents.length > 0 ? (
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
          ) : (
            <div className="py-12 text-center">
              <Calendar className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold text-gray-600">
                No events found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          setGalleryEvent={setGalleryEvent}
        />
      )}

      {/* Gallery Modal */}
      {galleryEvent && galleryEvent.gallery && (
        <GalleryModal
          images={galleryEvent.gallery}
          isOpen={!!galleryEvent}
          onClose={() => setGalleryEvent(null)}
          eventTitle={galleryEvent.title}
        />
      )}

      {/* CTA Section */}
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
