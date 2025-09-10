"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Instagram, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** PocketBase config */
const PB_URL = "https://permiassdia.pockethost.io";
const TEAM_COLLECTION = "team";

/** PocketBase record shape */
type TeamRecord = {
  id: string;
  name: string;
  graduation_year?: number | string;
  major?: string;
  role?: string;
  hobbies?: string;
  instagram?: string;
  email?: string;
  linkedin?: string;
  formal_headshot?: string;
  casual_headshot?: string;
  bio?: string;
};

/** Build a PocketBase file URL for a single-file field */
function pbFileUrl(recordId: string, filename?: string) {
  if (!filename) return "";
  if (/^https?:\/\//i.test(filename)) return filename;
  return `${PB_URL}/api/files/${TEAM_COLLECTION}/${recordId}/${encodeURIComponent(
    filename
  )}`;
}

/** Card component */
function TeamMemberCard({ member }: { member: TeamRecord }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const professionalPhoto =
    pbFileUrl(member.id, member.formal_headshot) || "/placeholder.svg";
  const casualPhoto =
    pbFileUrl(member.id, member.casual_headshot) || "/placeholder.svg";

  return (
    <div className="h-[32rem] w-full [perspective:1000px]">
      <div
        className={`relative h-full w-full cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <Card className="absolute inset-0 h-full w-full border-2 border-transparent transition-shadow duration-300 [backface-visibility:hidden] hover:border-secondary-200 hover:shadow-xl">
          <CardContent className="flex h-full flex-col p-0">
            <div className="relative h-80 overflow-hidden rounded-t-lg">
              <Image
                src={professionalPhoto}
                alt={member.name}
                fill
                className="object-cover object-center"
              />
              <div className="absolute right-4 top-4">
                {member.graduation_year ? (
                  <Badge className="bg-primary-600 text-white">
                    {member.graduation_year}
                  </Badge>
                ) : null}
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="mb-1 text-xl font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="mb-2 font-semibold text-primary-600">
                  {member.role || "Member"}
                </p>
                <p className="mb-1 text-sm text-gray-600">
                  {member.major || ""}
                </p>
                {member.graduation_year ? (
                  <p className="text-xs text-gray-500">
                    Class of {member.graduation_year}
                  </p>
                ) : null}
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs italic text-gray-500">Click to flip</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back */}
        <Card className="absolute inset-0 h-full w-full border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-secondary-50 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardContent className="flex h-full flex-col p-0">
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <Image
                src={casualPhoto}
                alt={`${member.name} casual`}
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between p-4 text-sm">
              <div>
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  {member.name}
                </h3>

                {member.bio && (
                  <p className="mb-4 text-sm leading-relaxed text-gray-700">
                    {member.bio}
                  </p>
                )}

                {/* Interests + Socials in one row */}
                {(member.hobbies ||
                  member.instagram ||
                  member.email ||
                  member.linkedin) && (
                  <div className="mt-2 flex items-start gap-4">
                    {/* Interests column: max 70% width, horizontal scroll with nice thin scrollbar */}
                    {member.hobbies && (
                      <div className="max-w-[70%] flex-1 basis-0">
                        <p className="mb-2 text-xs font-semibold text-gray-800">
                          Interests
                        </p>
                        <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary-300/70 scrollbar-thumb-rounded-full hover:scrollbar-thumb-primary-400">
                          <div className="inline-flex w-max gap-2 whitespace-nowrap pr-1">
                            {member.hobbies
                              .split(",")
                              .map(h => h.trim())
                              .filter(Boolean)
                              .map((h, i) => (
                                <Badge
                                  key={`${member.id}-hob-${i}`}
                                  variant="secondary"
                                  className="inline-flex px-3 py-1 text-xs"
                                >
                                  {h}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Socials column: icons only */}
                    <div className="shrink-0">
                      <p className="mb-2 text-xs font-semibold text-gray-800">
                        Socials
                      </p>
                      <div className="flex items-center gap-3">
                        {member.instagram && (
                          <a
                            href={
                              member.instagram.startsWith("http")
                                ? member.instagram
                                : `https://instagram.com/${member.instagram.replace(
                                    /^@/,
                                    ""
                                  )}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                            className="rounded-md p-1 hover:bg-white/40"
                          >
                            <Instagram className="h-5 w-5 text-primary-600" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            aria-label="Email"
                            className="rounded-md p-1 hover:bg-white/40"
                          >
                            <Mail className="h-5 w-5 text-primary-600" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={
                              member.linkedin.startsWith("http")
                                ? member.linkedin
                                : `https://www.linkedin.com/in/${member.linkedin.replace(
                                    /^@/,
                                    ""
                                  )}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="rounded-md p-1 hover:bg-white/40"
                          >
                            <Linkedin className="h-5 w-5 text-primary-600" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [members, setMembers] = useState<TeamRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(
          `${PB_URL}/api/collections/${TEAM_COLLECTION}/records?perPage=200&sort=name`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`PB fetch failed: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setMembers((data.items || []) as TeamRecord[]);
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

  const years = useMemo(() => {
    const set = new Set<string>();
    members.forEach(m => {
      const y = m.graduation_year ? String(m.graduation_year) : "";
      if (y) set.add(y);
    });
    return Array.from(set).sort();
  }, [members]);

  const filteredMembers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    let result = members.filter(m => {
      const matchesSearch =
        !q ||
        m.name?.toLowerCase().includes(q) ||
        (m.role || "").toLowerCase().includes(q) ||
        (m.major || "").toLowerCase().includes(q) ||
        (m.hobbies || "").toLowerCase().includes(q);

      const matchesYear =
        selectedYear === "all" ||
        String(m.graduation_year || "") === selectedYear;

      const matchesPosition =
        selectedPosition === "all" ||
        (m.role || "").toLowerCase().includes(selectedPosition.toLowerCase());

      return matchesSearch && matchesYear && matchesPosition;
    });

    // Custom ordering: president first, then vice president, then rest
    result.sort((a, b) => {
      const roleOrder = (role: string | undefined) => {
        if (!role) return 3;
        const r = role.toLowerCase();
        if (r.includes("president") && !r.includes("vice")) return 0; // President
        if (r.includes("vice")) return 1; // Vice President
        return 2; // Others
      };

      return roleOrder(a.role) - roleOrder(b.role);
    });

    return result;
  }, [members, searchTerm, selectedYear, selectedPosition]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/team.jpg?height=800&width=1920&text=Team+Photo"
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
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search by name, role, major, interests"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
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
                  {years.map(y => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedPosition}
                onValueChange={setSelectedPosition}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="president">President</SelectItem>
                  <SelectItem value="vice">Vice President</SelectItem>
                  <SelectItem value="secretary">Secretary</SelectItem>
                  <SelectItem value="treasurer">Treasurer</SelectItem>
                  <SelectItem value="coordinator">Coordinator</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="fundraising">Fundraising</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="public relations">
                    Public Relations
                  </SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          {!loading && !err && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredMembers.map(m => (
                <TeamMemberCard key={m.id} member={m} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
