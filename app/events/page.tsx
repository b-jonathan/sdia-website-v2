"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ExternalLink, Heart, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  longDescription: string
  image: string
  category: "cultural" | "social" | "academic" | "community"
  attendees: number
  maxAttendees?: number
  price: string
  organizer: string
  images: string[]
  requirements?: string[]
  isPast?: boolean
  gallery?: string[]
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
    description: "Learn to cook authentic Indonesian dishes with our experienced chefs and take home delicious meals.",
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
    description: "Collaborative study session for midterm preparation with snacks and peer support.",
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
]

const pastEvents: Event[] = [
  {
    id: 4,
    title: "Indonesian Cultural Night 2023",
    date: "November 18, 2023",
    time: "6:00 PM - 10:00 PM",
    location: "Price Center Ballroom",
    description: "Our spectacular 2023 cultural showcase featuring traditional performances and authentic cuisine.",
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
    description: "Hands-on workshop learning the traditional art of Indonesian batik making.",
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
    description: "Community service followed by a fun beach BBQ with games and socializing.",
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
]

function EventModal({
  event,
  isOpen,
  onClose,
  setGalleryEvent,
}: { event: Event; isOpen: boolean; onClose: () => void; setGalleryEvent: (event: Event | null) => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Image Carousel */}
          <div className="relative h-64 md:h-80">
            <Image
              src={event.images[currentImageIndex] || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover rounded-t-lg"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Carousel Navigation */}
            {event.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {event.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
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
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Badge>
              <span className="text-2xl font-bold text-primary-600">{event.price}</span>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3 text-primary-600" />
                  {event.date}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3 text-primary-600" />
                  {event.time}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-primary-600" />
                  {event.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3 text-primary-600" />
                  {event.attendees}
                  {event.maxAttendees ? `/${event.maxAttendees}` : ""} {event.isPast ? "attended" : "attending"}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Organized by:</h4>
                  <p className="text-gray-600">{event.organizer}</p>
                </div>

                {event.requirements && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      {event.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-primary-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">About This Event</h4>
              <p className="text-gray-600 leading-relaxed">{event.longDescription}</p>
            </div>

            {event.isPast && event.gallery && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Event Gallery</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery.slice(0, 6).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
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
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      onClick={() => setGalleryEvent(event)}
                    >
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-600">+{event.gallery.length - 6}</p>
                        <p className="text-sm text-gray-500">more photos</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!event.isPast && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white">Register Now</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Favorites
                </Button>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function GalleryModal({
  images,
  isOpen,
  onClose,
  eventTitle,
}: { images: string[]; isOpen: boolean; onClose: () => void; eventTitle: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all z-10"
        >
          <X className="w-6 h-6 text-white" />
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-white text-xl font-semibold mb-2">{eventTitle}</h3>
          <p className="text-white text-opacity-80">
            {currentIndex + 1} of {images.length}
          </p>
        </div>

        {/* Thumbnail strip */}
        <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex ? "border-white" : "border-transparent opacity-60"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
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
          <div className="absolute top-4 right-4">
            <Badge className="bg-white text-gray-800 font-bold">{event.price}</Badge>
          </div>
          {event.isPast && (
            <div className="absolute bottom-4 right-4">
              <Badge className="bg-gray-800 text-white">Past Event</Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
            {event.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-2 text-primary-600" />
              {event.date}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Clock className="w-4 h-4 mr-2 text-primary-600" />
              {event.time}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-primary-600" />
              {event.location}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              {event.attendees}
              {event.maxAttendees ? `/${event.maxAttendees}` : ""} {event.isPast ? "attended" : "attending"}
            </div>
            <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white">
              {event.isPast ? "View Details" : "Learn More"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")
  const [galleryEvent, setGalleryEvent] = useState<Event | null>(null)

  const currentEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents
  const filteredEvents =
    selectedCategory === "all" ? currentEvents : currentEvents.filter((event) => event.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
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

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-secondary-400 text-secondary-900 hover:bg-secondary-500 px-4 py-2 text-sm font-medium">
            SDIA Events
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our
            <span className="block bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
              Events
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join us for exciting cultural celebrations, educational workshops, and community activities.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  activeTab === "upcoming"
                    ? "bg-primary-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  activeTab === "past" ? "bg-primary-600 text-white shadow-lg" : "text-gray-600 hover:text-primary-600"
                }`}
              >
                Past Events
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { key: "all", label: "All Events", color: "bg-gray-100 text-gray-800 hover:bg-gray-200" },
              { key: "cultural", label: "Cultural", color: "bg-primary-100 text-primary-800 hover:bg-primary-200" },
              { key: "social", label: "Social", color: "bg-secondary-100 text-secondary-800 hover:bg-secondary-200" },
              { key: "academic", label: "Academic", color: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
              { key: "community", label: "Community", color: "bg-green-100 text-green-800 hover:bg-green-200" },
            ].map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.key ? "bg-primary-600 text-white shadow-lg" : category.color
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {activeTab === "upcoming" ? "Don't Miss Out!" : "Relive the Memories"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {activeTab === "upcoming"
                ? "Click on any event to see more details and register"
                : "Browse through our past events and photo galleries"}
            </p>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="relative">
                  <EventCard event={event} onClick={() => setSelectedEvent(event)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
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
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {activeTab === "upcoming" ? "Never Miss an Event" : "Want to Join Future Events?"}
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            {activeTab === "upcoming"
              ? "Subscribe to our newsletter and follow us on social media for the latest updates"
              : "Stay connected with SDIA to be part of our next amazing events"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary-400 hover:bg-secondary-500 text-secondary-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Subscribe to Newsletter
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
            >
              Follow Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">SD</span>
                </div>
                <span className="text-xl font-bold">SDIA - San Diego Indonesian Association</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Connecting Indonesian students and celebrating our rich culture through community, tradition, and
                friendship.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/about" className="hover:text-secondary-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/team" className="hover:text-secondary-400 transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="/events" className="hover:text-secondary-400 transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-secondary-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-secondary-400 transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-400 transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-400 transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-400 transition-colors">
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SDIA - San Diego Indonesian Association. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
