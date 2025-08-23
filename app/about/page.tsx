"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Star, Award, Users, Truck } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
            DRIP STARTS HERE!{" "}
            <span
              className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent block"
              style={{
                backgroundImage: "linear-gradient(45deg, #f97316, #ef4444, #ea580c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              RAPTORS
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We're passionate about bringing premium entertainment artwork to your walls at prices that won't break the
            bank.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                OUR <span className="text-orange-500">STORY</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                ZYNO was born from a simple belief: everyone deserves to have amazing art on their walls without paying
                premium gallery prices.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                We started as a small team of entertainment enthusiasts who were frustrated with the high cost of
                quality posters. So we decided to change that.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Today, we're proud to offer thousands of high-quality entertainment posters, from classic movies to the
                latest blockbusters, all at unbeatable prices.
              </p>
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
                <Link href="/shop">
                  SHOP NOW <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-2xl">
                <div className="bg-black p-6 rounded-xl flex items-center justify-center">
                  <div className="w-68 h-80  relative overflow-hidden rounded-lg">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      style={{ filter: "brightness(1.2) contrast(1.1)" }}
                    >
                      <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dyno_Mouth_Opening_and_Firing%20%281%29-CX6vCRXJPFCELHF4CuyF7YJEyjS5Yz.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              BY THE <span className="text-orange-500">NUMBERS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-black text-orange-500 mb-2">10K+</div>
                <p className="text-gray-400">Happy Customers</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-black text-orange-500 mb-2">500+</div>
                <p className="text-gray-400">Unique Designs</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-black text-orange-500 mb-2">99%</div>
                <p className="text-gray-400">Satisfaction Rate</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-black text-orange-500 mb-2">24/7</div>
                <p className="text-gray-400">Customer Support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              WHY CHOOSE <span className="text-orange-500">ZYNO?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black border-gray-800">
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-orange-500 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">PREMIUM QUALITY</h3>
                <p className="text-gray-400">
                  High-resolution prints on premium paper stock with vibrant colors that last for years.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800">
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 text-orange-500 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">UNBEATABLE PRICES</h3>
                <p className="text-gray-400">
                  Premium art shouldn't cost a fortune. Quality posters starting at just ₹299.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800">
              <CardContent className="p-8 text-center">
                <Truck className="h-12 w-12 text-orange-500 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">FAST DELIVERY</h3>
                <p className="text-gray-400">Quick processing and reliable shipping to get your posters to you fast.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              MEET THE <span className="text-orange-500">TEAM</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The passionate individuals behind ZYNO who work tirelessly to bring you the best entertainment artwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Creative Team</h3>
                <p className="text-gray-400">Curating the best entertainment artwork</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quality Team</h3>
                <p className="text-gray-400">Ensuring every print meets our standards</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Logistics Team</h3>
                <p className="text-gray-400">Getting your orders to you quickly</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            READY TO <span className="text-orange-500">GET STARTED?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and transform your space with premium entertainment artwork.
          </p>
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-lg px-8">
            <Link href="/shop">
              SHOP COLLECTION <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
