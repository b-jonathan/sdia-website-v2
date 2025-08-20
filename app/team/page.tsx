"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Instagram, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  year: string;
  major: string;
  professionalPhoto: string;
  casualPhoto: string;
  bio: string;
  interests: string[];
  email: string;
  linkedin?: string;
  instagram?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Wijaya",
    position: "President",
    year: "Senior",
    major: "Computer Science",
    professionalPhoto:
      "/placeholder.svg?height=300&width=300&text=Sarah+Professional",
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
    professionalPhoto:
      "/placeholder.svg?height=300&width=300&text=Ahmad+Professional",
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
    professionalPhoto:
      "/placeholder.svg?height=300&width=300&text=Maya+Professional",
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
    professionalPhoto:
      "/placeholder.svg?height=300&width=300&text=Budi+Professional",
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
    professionalPhoto:
      "/placeholder.svg?height=300&width=300&text=Indira+Professional",
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
    professionalPhoto:
      "/placeholder.svg?height=300&width=300&text=Rizki+Professional",
    casualPhoto: "/placeholder.svg?height=300&width=300&text=Rizki+Casual",
    bio: "Preserving and sharing Indonesian traditions through dance, music, and cultural education.",
    interests: ["Traditional Dance", "History", "Teaching"],
    email: "rizki@ucsd.edu",
    instagram: "rizki_culture",
  },
];

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");

  const filteredMembers = teamMembers.filter(member => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      member.name.toLowerCase().includes(searchLower) ||
      member.position.toLowerCase().includes(searchLower) ||
      member.major.toLowerCase().includes(searchLower) ||
      member.bio.toLowerCase().includes(searchLower) ||
      member.interests.some(interest =>
        interest.toLowerCase().includes(searchLower)
      );

    const matchesYear = selectedYear === "all" || member.year === selectedYear;
    const matchesPosition =
      selectedPosition === "all" ||
      member.position.toLowerCase().includes(selectedPosition.toLowerCase());

    return matchesSearch && matchesYear && matchesPosition;
  });

  function TeamMemberCard({ member }: { member: TeamMember }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <div className="h-96 w-full [perspective:1000px]">
        <div
          className={`relative h-full w-full cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <Card className="absolute inset-0 h-full w-full border-2 border-transparent transition-shadow duration-300 [backface-visibility:hidden] hover:border-secondary-200 hover:shadow-xl">
            <CardContent className="flex h-full flex-col p-0">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={member.professionalPhoto || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute right-4 top-4">
                  <Badge className="bg-primary-600 text-white">
                    {member.year}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="mb-1 text-xl font-bold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="mb-2 font-semibold text-primary-600">
                    {member.position}
                  </p>
                  <p className="mb-1 text-sm text-gray-600">{member.major}</p>
                  <p className="text-xs text-gray-500">{member.year}</p>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs italic text-gray-500">Click to flip</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Back of card */}
          <Card className="absolute inset-0 h-full w-full border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-secondary-50 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <CardContent className="flex h-full flex-col p-0">
              <div className="relative h-32 overflow-hidden rounded-t-lg">
                <Image
                  src={member.casualPhoto || "/placeholder.svg"}
                  alt={`${member.name} casual`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4 text-sm">
                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-gray-700">
                    {member.bio}
                  </p>

                  <div className="mb-3">
                    <p className="mb-1 text-xs font-semibold text-gray-800">
                      Interests:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {member.interests.map((interest, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-2 py-1 text-xs"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 bg-transparent p-2"
                  >
                    <Mail className="h-3 w-3" />
                  </Button>
                  {member.linkedin && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 bg-transparent p-2"
                    >
                      <Linkedin className="h-3 w-3" />
                    </Button>
                  )}
                  {member.instagram && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 bg-transparent p-2"
                    >
                      <Instagram className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
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

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-6 bg-secondary-400 px-4 py-2 text-sm font-medium text-secondary-900 hover:bg-secondary-500">
            Meet Our Leaders
          </Badge>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl">
            Our Amazing
            <span className="block bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
              Team
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-200 md:text-2xl">
            Meet the dedicated leaders who make our Indonesian community thrive
            at UCSD.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="border-b bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search by name, position, major, interests..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
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

              <Select
                value={selectedPosition}
                onValueChange={setSelectedPosition}
              >
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
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">
              Leadership Team 2024
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Executive Board
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Click on each card to learn more about our team members
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="py-12 text-center">
              <Users className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold text-gray-600">
                No team members found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Users className="mx-auto mb-6 h-16 w-16 text-secondary-400" />
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Want to Join Our Team?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-primary-100">
            We're always looking for passionate individuals to help lead our
            community. Applications open each semester!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-secondary-400 px-8 py-4 text-lg font-semibold text-secondary-900 shadow-lg transition-all duration-300 hover:bg-secondary-500 hover:shadow-xl"
            >
              Apply for Leadership
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
