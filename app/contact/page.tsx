"use client";

import type React from "react";

import { Navigation } from "@/components/navigation";
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
import { Send, Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920&text=Contact+Us"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-800/60 to-primary-700/40"></div>
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
            Have questions? Want to get involved? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form - Main Focus */}
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
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
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
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => handleInputChange("name", e.target.value)}
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
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => handleInputChange("email", e.target.value)}
                      className="h-12 w-full text-lg"
                      placeholder="your.email@ucsd.edu"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-3 block text-lg font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={value =>
                      handleInputChange("category", value)
                    }
                  >
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
                    htmlFor="subject"
                    className="mb-3 block text-lg font-medium text-gray-700"
                  >
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => handleInputChange("subject", e.target.value)}
                    className="h-12 w-full text-lg"
                    placeholder="Brief subject of your message"
                  />
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
                    required
                    value={formData.message}
                    onChange={e => handleInputChange("message", e.target.value)}
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

                <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">sdia@ucsd.edu</p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">
                      Meeting Times
                    </h4>
                    <p className="text-gray-600">Fridays, 6:00 PM - 8:00 PM</p>
                    <p className="text-sm text-gray-500">
                      Price Center, Room 204
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">
                      Follow Us
                    </h4>
                    <div className="flex justify-center space-x-3">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 text-white hover:from-pink-600 hover:to-purple-700"
                      >
                        <Instagram className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 p-2 text-white hover:bg-blue-700"
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-700 p-2 text-white hover:bg-blue-800"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-r from-primary-50 via-white to-secondary-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-200">
              Frequently Asked Questions
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Common Questions
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Quick answers to questions you might have
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                question: "How can I join SDIA?",
                answer:
                  "Simply attend one of our weekly meetings or events! We welcome all students interested in Indonesian culture, regardless of background.",
              },
              {
                question: "Do I need to be Indonesian to join?",
                answer:
                  "Not at all! We welcome students from all backgrounds who are interested in learning about and celebrating Indonesian culture.",
              },
              {
                question: "Are there membership fees?",
                answer:
                  "Basic membership is free! Some special events or workshops may have small fees to cover materials and food.",
              },
              {
                question: "What kind of events do you organize?",
                answer:
                  "We host cultural nights, cooking workshops, study groups, community service projects, and social gatherings throughout the year.",
              },
              {
                question: "How can I get involved in leadership?",
                answer:
                  "Leadership applications open each semester. Active members can apply for officer positions or committee roles.",
              },
              {
                question: "Do you offer academic support?",
                answer:
                  "Yes! We organize study groups, peer tutoring, and academic workshops to help our members succeed at UCSD.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-800">
                    {faq.question}
                  </h3>
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
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
