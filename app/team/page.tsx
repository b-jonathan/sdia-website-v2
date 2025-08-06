"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Instagram, Users } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  position: string
  year: string
  major: string
  professionalPhoto: string
  casualPhoto: string
  bio: string
  interests: string[]
  email: string
  linkedin?: string
  instagram?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Wijaya",
    position: "President",
    year: "Senior",
    major: "Computer Science",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Sarah+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Sarah+Casual",
    bio: "Passionate about connecting Indonesian students and preserving our cultural heritage at UCSD.",
    interests: ["Traditional Dance", "Photography", "Coding"],
    email: "sarah@ucsd.edu",
    linkedin: "sarah-wijaya",
    instagram: "sarahw_ucsd",
  },
  {
    id: 2,
    name: "Ahmad Rahman",
    position: "Vice President",
    year: "Junior",
    major: "Business Economics",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Ahmad+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Ahmad+Casual",
    bio: "Dedicated to building strong community connections and organizing memorable events.",
    interests: ["Basketball", "Cooking", "Entrepreneurship"],
    email: "ahmad@ucsd.edu",
    linkedin: "ahmad-rahman",
    instagram: "ahmad_ucsd",
  },
  {
    id: 3,
    name: "Maya Sari",
    position: "Secretary",
    year: "Sophomore",
    major: "International Studies",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Maya+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Maya+Casual",
    bio: "Organized and detail-oriented, ensuring smooth operations for all club activities.",
    interests: ["Writing", "Travel", "Cultural Studies"],
    email: "maya@ucsd.edu",
    instagram: "maya_adventures",
  },
  {
    id: 4,
    name: "Budi Santoso",
    position: "Treasurer",
    year: "Junior",
    major: "Economics",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Budi+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Budi+Casual",
    bio: "Managing club finances while ensuring we can fund amazing cultural events and activities.",
    interests: ["Music", "Finance", "Hiking"],
    email: "budi@ucsd.edu",
    linkedin: "budi-santoso",
  },
  {
    id: 5,
    name: "Indira Putri",
    position: "Events Coordinator",
    year: "Senior",
    major: "Communications",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Indira+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Indira+Casual",
    bio: "Creative event planner who brings Indonesian culture to life through engaging activities.",
    interests: ["Event Planning", "Art", "Social Media"],
    email: "indira@ucsd.edu",
    instagram: "indira_events",
  },
  {
    id: 6,
    name: "Rizki Pratama",
    position: "Cultural Director",
    year: "Sophomore",
    major: "Anthropology",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Rizki+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Rizki+Casual",
    bio: "Preserving and sharing Indonesian traditions through dance, music, and cultural education.",
    interests: ["Traditional Dance", "History", "Teaching"],
    email: "rizki@ucsd.edu",
    instagram: "rizki_culture",
  },
]

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedPosition, setSelectedPosition] = useState("all")

  const filteredMembers = teamMembers.filter((member) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      member.name.toLowerCase().includes(searchLower) ||
      member.position.toLowerCase().includes(searchLower) ||
      member.major.toLowerCase().includes(searchLower) ||
      member.bio.toLowerCase().includes(searchLower) ||
      member.interests.some((interest) => interest.toLowerCase().includes(searchLower))

    const matchesYear = selectedYear === "all" || member.year === selectedYear
    const matchesPosition =
      selectedPosition === "all" || member.position.toLowerCase().includes(selectedPosition.toLowerCase())

    return matchesSearch && matchesYear && matchesPosition
  })

  function TeamMemberCard({ member }: { member: TeamMember }) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
      <div className="h-96 w-full [perspective:1000px]">
        <div
          className={`relative h-full w-full cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <Card className="absolute inset-0 h-full w-full [backface-visibility:hidden] hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-secondary-200">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={member.professionalPhoto || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary-600 text-white">{member.year}</Badge>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-1">{member.major}</p>
                  <p className="text-gray-500 text-xs">{member.year}</p>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 italic">Click to flip</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back of card */}
          <Card className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="relative h-32 overflow-hidden rounded-t-lg">
                <Image
                  src={member.casualPhoto || "/placeholder.svg"}
                  alt={`${member.name} casual`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between text-sm">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-gray-700 mb-3 text-xs leading-relaxed">{member.bio}</p>

                  <div className="mb-3">
                    <p className="font-semibold text-gray-800 text-xs mb-1">Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-2">
                  <Button size="sm" variant="outline" className="p-2 h-8 w-8 bg-transparent">
                    <Mail className="w-3 h-3" />
                  </Button>
                  {member.linkedin && (
                    <Button size="sm" variant="outline" className="p-2 h-8 w-8 bg-transparent">
                      <Linkedin className="w-3 h-3" />
                    </Button>
                  )}
                  {member.instagram && (
                    <Button size="sm" variant="outline" className="p-2 h-8 w-8 bg-transparent">
                      <Instagram className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920&text=Team+Photo"
            alt="Team Photo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/60 to-primary-700/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-secondary-400 text-secondary-900 hover:bg-secondary-500 px-4 py-2 text-sm font-medium">
            Meet Our Leaders
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our Amazing
            <span className="block bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
              Team
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated leaders who make our Indonesian community thrive at UCSD.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, position, major, interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Sophomore">Sophomore</SelectItem>
                  <SelectItem value="Freshman">Freshman</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="president">President</SelectItem>
                  <SelectItem value="vice">Vice President</SelectItem>
                  <SelectItem value="secretary">Secretary</SelectItem>
                  <SelectItem value="treasurer">Treasurer</SelectItem>
                  <SelectItem value="coordinator">Coordinator</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">Leadership Team 2024</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Executive Board</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Click on each card to learn more about our team members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No team members found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Users className="w-16 h-16 text-secondary-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Want to Join Our Team?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to help lead our community. Applications open each semester!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary-400 hover:bg-secondary-500 text-secondary-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply for Leadership
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
