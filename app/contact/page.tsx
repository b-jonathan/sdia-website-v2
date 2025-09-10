"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { submitContactForm } from "./contact";
export default function ContactPage() {
  // 2) no local state and no onSubmit handler
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/contactus.jpg?height=800&width=1920&text=Contact+Us"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/60 to-primary-700/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Badge className="mb-6 bg-secondary-400 px-4 py-2 text-sm font-medium text-secondary-900 hover:bg-secondary-500">
            Get In Touch
          </Badge>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl">
            Contact
            <span className="block bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
              Us
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-200 md:text-2xl">
            Have questions? Want to get involved? We&apos;d love to hear from
            you!
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <Card className="border-2 border-secondary-100 shadow-2xl">
            <CardContent className="p-12">
              <div className="mb-12 text-center">
                <Badge className="mb-4 bg-secondary-100 text-secondary-800 hover:bg-secondary-200">
                  Send us a message
                </Badge>
                <h2 className="mb-4 text-4xl font-bold text-gray-800">
                  Get In Touch
                </h2>
                <p className="text-xl text-gray-600">
                  Fill out the form below and we will get back to you as soon as
                  possible.
                </p>
              </div>

              {/* 3) point the form to the server action and name the inputs the action expects */}
              <form action={submitContactForm} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-3 block text-lg font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="h-12 w-full text-lg"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-3 block text-lg font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="h-12 w-full text-lg"
                      placeholder="your.email@ucsd.edu"
                    />
                  </div>
                </div>

                {/* Fields your action actually reads */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="instagram"
                      className="mb-3 block text-lg font-medium text-gray-700"
                    >
                      Instagram
                    </label>
                    <Input
                      id="instagram"
                      name="instagram"
                      type="tel"
                      className="h-12 w-full text-lg"
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="linkedin"
                      className="mb-3 block text-lg font-medium text-gray-700"
                    >
                      LinkedIn
                    </label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      className="h-12 w-full text-lg"
                      placeholder="https://www.linkedin.com/in/you"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="major"
                      className="mb-3 block text-lg font-medium text-gray-700"
                    >
                      Major
                    </label>
                    <Input
                      id="major"
                      name="major"
                      type="text"
                      className="h-12 w-full text-lg"
                      placeholder="Computer Engineering"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="college"
                      className="mb-3 block text-lg font-medium text-gray-700"
                    >
                      College *
                    </label>
                    <Select name="college" required>
                      <SelectTrigger className="h-12 text-lg">
                        <SelectValue placeholder="Select your college" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UCSD">UCSD</SelectItem>
                        <SelectItem value="SDSU">SDSU</SelectItem>
                        <SelectItem value="Mesa">Mesa</SelectItem>
                        <SelectItem value="Mira Costa">Mira Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Optional category select kept for UI, not submitted to the action */}
                <div>
                  <label
                    htmlFor="category"
                    className="mb-3 block text-lg font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <Select>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="membership">Membership</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="collaboration">
                        Collaboration
                      </SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-3 block text-lg font-medium text-gray-700"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    className="min-h-[150px] w-full text-lg"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  className="h-14 w-full bg-primary-600 py-4 text-xl font-semibold text-white hover:bg-primary-700"
                >
                  <Send className="mr-3 h-6 w-6" />
                  Send Message
                </Button>
              </form>

              {/* Contact Info Below Form */}
              <div className="mt-16 border-t border-gray-200 pt-12">
                <div className="mb-8 text-center">
                  <h3 className="mb-4 text-2xl font-bold text-gray-800">
                    Other Ways to Reach Us
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">sdia@ucsd.edu</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">
                      Follow Us
                    </h4>
                    <div className="flex justify-center space-x-3">
                      <Link
                        href="https://www.instagram.com/permias.sdia/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 text-white hover:from-pink-600 hover:to-purple-700"
                        >
                          <Instagram className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Link
                        href="https://www.linkedin.com/company/permias-san-diego/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="bg-blue-700 p-2 text-white hover:bg-blue-800"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ and Footer unchanged */}
      {/* ... keep your existing FAQ and footer sections ... */}
    </div>
  );
}
