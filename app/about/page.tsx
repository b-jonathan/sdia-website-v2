"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Users, Globe, Award, Calendar, BookOpen, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920&text=About+Us"
            alt="About Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/60 to-primary-700/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-secondary-400 text-secondary-900 hover:bg-secondary-500 px-4 py-2 text-sm font-medium">
            About Our Community
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our Story &
            <span className="block bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
              Heritage
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Celebrating Indonesian culture and building lasting connections at UC San Diego since 2016.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the About Page</h2>
          <p className="text-lg text-gray-600">
            This is a working About page with the SDIA color scheme. The navigation should work properly now.
          </p>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">Our Journey</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Club History</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From humble beginnings to a thriving community</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-300 to-secondary-300"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                {
                  year: "2016",
                  title: "Foundation",
                  description:
                    "UCSD Indonesian Club was founded by a group of passionate Indonesian students who wanted to create a home away from home.",
                  side: "left",
                },
                {
                  year: "2018",
                  title: "First Cultural Night",
                  description:
                    "Organized our first major cultural showcase, featuring traditional dances, music, and Indonesian cuisine.",
                  side: "right",
                },
                {
                  year: "2020",
                  title: "Virtual Adaptation",
                  description:
                    "Successfully transitioned to virtual events during the pandemic, maintaining community connections online.",
                  side: "left",
                },
                {
                  year: "2022",
                  title: "Alumni Network",
                  description:
                    "Launched our formal alumni network, connecting current students with successful graduates.",
                  side: "right",
                },
                {
                  year: "2024",
                  title: "150+ Members",
                  description:
                    "Reached our milestone of 150+ active members, making us one of the largest cultural clubs at UCSD.",
                  side: "left",
                },
              ].map((item, index) => (
                <div key={index} className={`flex items-center ${item.side === "right" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-1/2 ${item.side === "right" ? "pl-8" : "pr-8"}`}>
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mr-4">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary-600">{item.year}</div>
                            <div className="text-lg font-semibold text-gray-800">{item.title}</div>
                          </div>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-secondary-400 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 via-white to-secondary-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary-100 text-secondary-800 hover:bg-secondary-200">Our Values</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">What We Stand For</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our community and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Community",
                description: "Building strong bonds and creating a supportive family atmosphere for all members.",
              },
              {
                icon: Globe,
                title: "Cultural Pride",
                description:
                  "Celebrating and preserving Indonesian heritage while sharing it with the broader UCSD community.",
              },
              {
                icon: Users,
                title: "Inclusivity",
                description: "Welcoming students from all backgrounds who appreciate Indonesian culture and values.",
              },
              {
                icon: BookOpen,
                title: "Education",
                description:
                  "Promoting cultural awareness and understanding through educational events and activities.",
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Striving for excellence in all our endeavors while supporting academic success.",
              },
              {
                icon: Calendar,
                title: "Tradition",
                description: "Honoring Indonesian traditions while adapting to modern student life at UCSD.",
              },
            ].map((value, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">Our Activities</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From cultural celebrations to academic support, we offer diverse opportunities for growth and connection
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                {[
                  {
                    title: "Cultural Events",
                    description:
                      "Annual cultural nights, traditional dance performances, and Indonesian food festivals that showcase our rich heritage.",
                  },
                  {
                    title: "Social Gatherings",
                    description:
                      "Regular meetups, game nights, and social events that help members build lasting friendships and connections.",
                  },
                  {
                    title: "Academic Support",
                    description:
                      "Study groups, mentorship programs, and academic workshops to help members succeed in their studies.",
                  },
                  {
                    title: "Community Service",
                    description:
                      "Volunteer opportunities and community outreach programs that give back to the San Diego community.",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{activity.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Indonesian Club Activities"
                width={500}
                height={600}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Be Part of Our Story?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join us in celebrating Indonesian culture and building lifelong connections at UCSD
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary-400 hover:bg-secondary-500 text-secondary-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Community
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
            >
              Contact Us
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
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">IC</span>
                </div>
                <span className="text-xl font-bold">UCSD Indonesian Club</span>
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
                  <a href="/events/upcoming" className="hover:text-secondary-400 transition-colors">
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
            <p>&copy; 2024 UCSD Indonesian Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
