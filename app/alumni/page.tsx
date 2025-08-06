"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Linkedin, MapPin, Building, GraduationCap, Search } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface AlumniMember {
  id: number
  name: string
  graduationYear: string
  major: string
  currentPosition: string
  company: string
  location: string
  professionalPhoto: string
  casualPhoto: string
  bio: string
  achievements: string[]
  email: string
  linkedin?: string
  advice: string
}

const alumniMembers: AlumniMember[] = [
  {
    id: 1,
    name: "Dr. Sari Kusuma",
    graduationYear: "2018",
    major: "Bioengineering",
    currentPosition: "Senior Research Scientist",
    company: "Genentech",
    location: "San Francisco, CA",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Sari+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Sari+Casual",
    bio: "Leading breakthrough research in cancer therapeutics and mentoring the next generation of scientists.",
    achievements: ["Published 15+ research papers", "Patent holder", "TEDx Speaker"],
    email: "sari.kusuma@genentech.com",
    linkedin: "sari-kusuma-phd",
    advice:
      "Never be afraid to ask questions and always stay curious. Your Indonesian heritage is a strength, not a limitation.",
  },
  {
    id: 2,
    name: "Michael Tanoto",
    graduationYear: "2019",
    major: "Computer Science",
    currentPosition: "Senior Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Michael+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Michael+Casual",
    bio: "Building scalable systems that impact billions of users while advocating for diversity in tech.",
    achievements: ["Led team of 12 engineers", "Google Excellence Award", "Open source contributor"],
    email: "michael.tanoto@google.com",
    linkedin: "michael-tanoto",
    advice:
      "Build projects you're passionate about. The technical skills will follow, but passion is what drives innovation.",
  },
  {
    id: 3,
    name: "Priya Sari",
    graduationYear: "2020",
    major: "International Business",
    currentPosition: "Investment Banking Associate",
    company: "Goldman Sachs",
    location: "New York, NY",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Priya+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Priya+Casual",
    bio: "Specializing in cross-border M&A transactions and building bridges between US and Southeast Asian markets.",
    achievements: ["Closed $2B+ in deals", "40 Under 40 Finance", "Mentor at UCSD"],
    email: "priya.sari@gs.com",
    linkedin: "priya-sari-cfa",
    advice:
      "Network authentically and always be willing to help others. Success is sweeter when shared with your community.",
  },
  {
    id: 4,
    name: "David Wijaya",
    graduationYear: "2017",
    major: "Mechanical Engineering",
    currentPosition: "Principal Engineer",
    company: "SpaceX",
    location: "Hawthorne, CA",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=David+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=David+Casual",
    bio: "Designing propulsion systems for Mars missions and pushing the boundaries of space exploration.",
    achievements: ["Led Falcon Heavy development", "NASA collaboration", "Engineering excellence award"],
    email: "david.wijaya@spacex.com",
    linkedin: "david-wijaya-pe",
    advice:
      "Dream big and work hard. The impossible becomes possible when you combine Indonesian determination with world-class education.",
  },
  {
    id: 5,
    name: "Lisa Hartono",
    graduationYear: "2021",
    major: "Public Health",
    currentPosition: "Program Manager",
    company: "WHO",
    location: "Geneva, Switzerland",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Lisa+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Lisa+Casual",
    bio: "Leading global health initiatives and working to improve healthcare access in developing nations.",
    achievements: ["Managed $50M+ programs", "Published health policy research", "UN Young Leader"],
    email: "lisa.hartono@who.int",
    linkedin: "lisa-hartono-mph",
    advice:
      "Use your privilege and education to lift others up. The world needs more Indonesian voices in global leadership.",
  },
  {
    id: 6,
    name: "Ryan Santoso",
    graduationYear: "2016",
    major: "Economics",
    currentPosition: "Founder & CEO",
    company: "TechStart Indonesia",
    location: "Jakarta, Indonesia",
    professionalPhoto: "/placeholder.svg?height=300&width=300&text=Ryan+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Ryan+Casual",
    bio: "Building Indonesia's next unicorn startup and creating opportunities for young Indonesian entrepreneurs.",
    achievements: ["Raised $25M Series A", "Forbes 30 Under 30", "Y Combinator alum"],
    email: "ryan@techstart.id",
    linkedin: "ryan-santoso-ceo",
    advice:
      "Don't forget your roots. The best opportunities often lie in solving problems back home with global perspectives.",
  },
]

function AlumniCard({ member }: { member: AlumniMember }) {
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
                <Badge className="bg-primary-600 text-white">Class of {member.graduationYear}</Badge>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-1">{member.currentPosition}</p>
                <p className="text-gray-600 text-sm mb-2">{member.company}</p>
                <p className="text-gray-500 text-xs mb-1">{member.major}</p>
                <div className="flex items-center text-gray-500 text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {member.location}
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 italic">Click to flip</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
          <CardContent className="p-4 h-full flex flex-col justify-between text-sm">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-gray-700 mb-3 text-xs leading-relaxed">{member.bio}</p>

              <div className="mb-3">
                <p className="font-semibold text-gray-800 text-xs mb-1">Key Achievements:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {member.achievements.slice(0, 3).map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-primary-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <p className="font-semibold text-gray-800 text-xs mb-1">Advice to Students:</p>
                <p className="text-gray-600 text-xs italic leading-relaxed">"{member.advice}"</p>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedIndustry, setSelectedIndustry] = useState("all")

  const filteredAlumni = alumniMembers.filter((member) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      member.name.toLowerCase().includes(searchLower) ||
      member.company.toLowerCase().includes(searchLower) ||
      member.currentPosition.toLowerCase().includes(searchLower) ||
      member.major.toLowerCase().includes(searchLower) ||
      member.location.toLowerCase().includes(searchLower) ||
      member.bio.toLowerCase().includes(searchLower)

    const matchesYear = selectedYear === "all" || member.graduationYear === selectedYear

    const matchesIndustry =
      selectedIndustry === "all" ||
      member.company.toLowerCase().includes(selectedIndustry.toLowerCase()) ||
      member.currentPosition.toLowerCase().includes(selectedIndustry.toLowerCase())

    return matchesSearch && matchesYear && matchesIndustry
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920&text=Alumni+Network"
            alt="Alumni Network"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/60 to-primary-700/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-secondary-400 text-secondary-900 hover:bg-secondary-500 px-4 py-2 text-sm font-medium">
            Our Success Stories
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Alumni
            <span className="block bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
              Network
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover where our graduates are making their mark around the world.
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
                placeholder="Search by name, company, position, major, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Graduation Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2018">2018</SelectItem>
                  <SelectItem value="2017">2017</SelectItem>
                  <SelectItem value="2016">2016</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="health">Healthcare</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">500+ Strong Network</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Where Are They Now?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our alumni are making impact across industries and around the globe
            </p>
          </div>

          {filteredAlumni.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAlumni.map((member) => (
                <AlumniCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No alumni found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 via-white to-secondary-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Alumni Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our graduates are making a difference worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: GraduationCap, number: "500+", label: "Alumni Worldwide" },
              { icon: Building, number: "200+", label: "Companies Represented" },
              { icon: MapPin, number: "50+", label: "Countries & States" },
              { icon: Linkedin, number: "95%", label: "Employment Rate" },
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Our Alumni Network</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Stay connected with fellow graduates and help current students succeed
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary-400 hover:bg-secondary-500 text-secondary-900 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Update Your Profile
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
            >
              Mentor Students
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
