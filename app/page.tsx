import Header from "@/components/common/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Camera, Zap, Smartphone } from "lucide-react"

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
  return (
    <section className="w-11/12 rounded-xl bg-gradient-to-r from-green-500 to-yellow-400 py-12 md:py-24 lg:py-32">
      <div className="container grid grid-cols-1 items-center gap-6 px-4 md:grid-cols-2 md:px-6">
        <img
          src="/placeholder.svg"
          width={600}
          height={400}
          alt="Mango Disease Detection App"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg"
        />
        <div className="space-y-6 text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl text-black">Mango Disease Detection</h1>
          <p className="max-w-[600px] text-white text-lg">
            Protect your mango trees with our AI-powered disease detection app. Identify issues early, get expert treatment advice, and maximize your yield.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-100">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const About = () => {
  return (
    <section id="about" className="w-11/12 rounded-xl bg-white py-12 md:py-24 lg:py-32">
      <div className="container grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="space-y-6 text-left">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-green-600">About Our App</h2>
          <p className="max-w-[600px] text-gray-600 text-lg">
            Our Mango Disease Detection app leverages cutting-edge AI to revolutionize mango farming. We provide:
          </p>
          <ul className="space-y-4 text-gray-600 text-lg">
            <li className="flex items-center gap-2">
              <Leaf className="text-green-500" />
              Instant disease identification from leaf images
            </li>
            <li className="flex items-center gap-2">
              <Zap className="text-yellow-500" />
              Personalized treatment recommendations
            </li>
            <li className="flex items-center gap-2">
              <Camera className="text-blue-500" />
              Comprehensive disease database
            </li>
            <li className="flex items-center gap-2">
              <Smartphone className="text-purple-500" />
              User-friendly mobile interface
            </li>
          </ul>
        </div>
        <div className="mt-6 md:mt-0">
          <img
            src="/placeholder.svg"
            width={500}
            height={500}
            alt="App Features"
            className="mx-auto rounded-xl object-cover object-center shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

const HowToUse = () => {
  return (
    <section id="how-to-use" className="w-11/12 rounded-xl bg-green-600 py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6 w-full">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white text-center mb-12">How to Use Our App</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {[
            { title: "Take a Photo", icon: Camera, description: "Snap a clear picture of the affected mango leaf or fruit." },
            { title: "Upload Image", icon: Smartphone, description: "Upload the image to our app with a single tap." },
            { title: "Get Results", icon: Zap, description: "Receive instant disease identification and analysis." },
            { title: "Follow Advice", icon: Leaf, description: "Apply our expert treatment recommendations." },
          ].map((step, index) => (
            <Card key={index} className="bg-white/10 border-none w-full">
              <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                <step.icon className="w-12 h-12 text-yellow-300" />
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-green-100">{step.description}</p>
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
      <div className="grid grid-cols-1 items-start gap-12  md:grid-cols-2 ">
        <div className="space-y-6 text-left">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-600">Get in Touch</h2>
          <p className="max-w-[600px] text-gray-600 text-lg">
            Have questions or need support? Our team is here to help you achieve healthier mango trees and better yields.
          </p>
          <div className="space-y-4">
            <p className="flex items-center gap-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 text-green-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +1 (123) 456-7890
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 text-green-500"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              support@mangodiseasedetection.com
            </p>
          </div>
        </div>
        <Card className="w-full">
          <CardContent className="p-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Your Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
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