'use client'

import Header from "@/components/common/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Camera, Zap, Smartphone } from "lucide-react"
import { useEffect, useState } from "react"

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center space-y-4 min-h-[100dvh]">
      <Header />
      <Banner />
      <About />
      <HowToUse />
      <Contact />
    </div>
  )
}

const Banner = () => {
  const [key, setKey] = useState(0)
  const headingText = "Detect Mango Diseases"

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prevKey => prevKey + 1)
    }, 10000) // Replay animation every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-11/12 rounded-xl bg-gradient-to-r from-green-500 to-yellow-400 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                width={600}
                height={400}
                src="https://ykwjjfkqxfxbvjqoqxjy.supabase.co/storage/v1/object/public/images/mango-disease-detection.jpg"
                alt="Mango leaf with disease symptoms"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-yellow-400"></div>
            </div>
          </div>
          {/* Right Column - Text Content */}
          <div className="w-full lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
                  Mango Disease Detector
            </h1>
            <p className="text-sm sm:text-lg text-white">
              Protect your mango trees with our AI-powered disease detection app. Identify issues early, get expert treatment advice, and maximize your yield.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="w-full sm:w-auto px-8 py-3 text-base font-medium text-black bg-white hover:bg-green-700">
                Get Started
              </Button>
              <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-base font-medium text-white bg-transparent hover:bg-green-200">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const About = () => {
  return (
    <section id="about" className="w-11/12 rounded-xl bg-white py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-0 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-green-800">
              About Our App
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Our Mango Disease Detection app leverages cutting-edge AI to revolutionize mango farming. We provide:
            </p>
            <ul className="space-y-4 text-base sm:text-lg text-gray-600">
              <li className="flex items-center gap-3">
                <Leaf className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span>Instant disease identification from leaf images</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                <span>Personalized treatment recommendations</span>
              </li>
              <li className="flex items-center gap-3">
                <Camera className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>Comprehensive disease database</span>
              </li>
              <li className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <span>User-friendly mobile interface</span>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="App Features Showcase"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-yellow-400/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HowToUse = () => {
  return (
    <section id="how-to-use" className="w-11/12 rounded-xl bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800 text-center mb-12">
          How to Use Our App
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Take a Photo", icon: Camera, description: "Snap a clear picture of the affected mango leaf or fruit.", color: "text-blue-600", bgColor: "bg-blue-100" },
            { title: "Upload Image", icon: Smartphone, description: "Upload the image to our app with a single tap.", color: "text-purple-600", bgColor: "bg-purple-100" },
            { title: "Get Results", icon: Zap, description: "Receive instant disease identification and analysis.", color: "text-yellow-600", bgColor: "bg-yellow-100" },
            { title: "Follow Advice", icon: Leaf, description: "Apply our expert treatment recommendations.", color: "text-green-600", bgColor: "bg-green-100" },
          ].map((step, index) => (
            <Card key={index} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                <div className={`rounded-full p-3 ${step.bgColor}`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  return (
    <section id="contact" className="w-11/12 rounded-xl bg-white py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        <div className="space-y-6 text-left">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600">Get in Touch</h2>
          <p className="max-w-[600px] text-gray-600 text-lg">
            Have questions or need support? Our team is here to help you achieve healthier mango trees and better yields.
          </p>
          <div className="space-y-4">
            <p className="flex items-center gap-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +1 (123) 456-7890
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-500"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              support@mangodiseasedetection.com
            </p>
          </div>
        </div>
        <Card className="w-full">
          <CardContent className="p-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                ></textarea>
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}