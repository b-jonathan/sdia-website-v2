"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Award, Heart, Target, Eye, ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

// Counter animation hook
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isVisible])

  return { count, setIsVisible }
}

// Stats component with animation
function StatCard({
  icon: Icon,
  value,
  label,
  suffix = "",
}: {
  icon: any
  value: number
  label: string
  suffix?: string
}) {
  const { count, setIsVisible } = useCounter(value)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(`stat-${label}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [setIsVisible, label])

  return (
    <Card
      id={`stat-${label}`}
      className="text-center p-6 hover:shadow-lg transition-all duration-300 border-secondary-200 hover:border-secondary-400"
    >
      <CardContent className="p-0">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full mb-4">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-primary-600 mb-2">
          {count}
          {suffix}
        </div>
        <div className="text-gray-600 font-medium">{label}</div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video Placeholder */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=UCSD+Campus+Video"
            alt="UCSD Campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/60 to-primary-700/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <Badge className="mb-6 bg-secondary-400 text-secondary-900 hover:bg-secondary-500 px-4 py-2 text-sm font-medium">
            Welcome to Our Community
          </Badge>

          {/* Logo Placeholder */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mb-6 shadow-2xl">
              <span className="text-white font-bold text-4xl">SD</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            SDIA
            <span className="block bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
              San Diego Indonesian Association
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connecting Indonesian students and celebrating our rich culture through community, tradition, and friendship
            at UC San Diego.
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="#"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300 group"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
              </svg>
            </a>
            <a
              href="#"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300 group"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300 group"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="#"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300 group"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Join Our Community
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300"
            >
              <Play className="mr-2 w-5 h-5" />
              Upcoming Events
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary-100 text-secondary-800 hover:bg-secondary-200">Our Purpose</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guided by our commitment to cultural preservation and community building
            </p>
          </div>

          {/* Mission Section - Text Left, Image Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-primary-600 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To create a vibrant community that celebrates Indonesian culture, supports academic excellence, and
                fosters lifelong connections among Indonesian students at UCSD. We strive to be a home away from home
                while promoting cultural awareness and diversity on campus.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We bring Indonesian students together through cultural events, academic support, and social activities
                that strengthen our bonds and preserve our heritage.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Our Mission</h4>
                  <p className="text-gray-600">Building community through culture</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-group-photo.png"
                  alt="SDIA Group Photo"
                  width={600}
                  height={400}
                  className="object-cover w-full h-[400px]"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full opacity-20"></div>
            </div>
          </div>

          {/* Vision Section - Image Left, Text Right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Vision+Group+Photo"
                  alt="SDIA Vision Photo"
                  width={600}
                  height={400}
                  className="object-cover w-full h-[400px]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full opacity-20"></div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-4xl font-bold text-primary-600 mb-6">Our Vision</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the premier Indonesian student organization that bridges cultures, empowers future leaders, and
                creates lasting impact both within UCSD and the broader San Diego community.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We envision a future where Indonesian heritage thrives and inspires others, fostering understanding and
                appreciation for our rich cultural diversity.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Our Vision</h4>
                  <p className="text-gray-600">Inspiring cultural understanding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 via-white to-secondary-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">Our Impact</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">By the Numbers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our community has grown and the impact we've made together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon={Users} value={150} label="Active Members" suffix="+" />
            <StatCard icon={Calendar} value={25} label="Events This Year" />
            <StatCard icon={Award} value={8} label="Years Strong" />
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200">
              <CardContent className="p-0">
                <Heart className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Alumni Network</div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
              <CardContent className="p-0">
                <Award className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-secondary-600 mb-2">12</div>
                <div className="text-gray-600 font-medium">Cultural Showcases</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Join Our Family?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Become part of a community that celebrates Indonesian culture and creates lifelong friendships
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary-400 hover:bg-secondary-500 text-secondary-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
            >
              Learn More
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
            <p>&copy; 2024 SDIA - San Diego Indonesian Association. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
