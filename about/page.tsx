"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Instagram, Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function AboutPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = true // Start muted for autoplay
      video.play().catch(console.error)
      setIsPlaying(true)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !video.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              ABOUT <span className="text-orange-500">ZYNO</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Where passion meets art. We bring you the finest collection of movie posters, music artwork, and
              entertainment memorabilia.
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <Card className="bg-gray-900 border-gray-800 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Animating_Fire_and_Dinosaur_Head-28WEDDlUIjdV61wOsGpphV2QE8QTep.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={togglePlay}
                      className="bg-black/50 hover:bg-black/70 text-white border-0"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={toggleMute}
                      className="bg-black/50 hover:bg-black/70 text-white border-0"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">OUR STORY</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  ZYNO was born from a simple idea: everyone deserves to surround themselves with the art they love.
                  What started as a passion project has grown into a curated collection of the finest entertainment
                  posters.
                </p>
                <p>
                  We believe that great art should be accessible to everyone. That's why we've made it our mission to
                  offer premium quality posters at prices that won't break the bank.
                </p>
                <p>
                  Every poster in our collection is carefully selected and printed with attention to detail, ensuring
                  you get museum-quality artwork for your space.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black text-white mb-6">OUR MISSION</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  To make premium entertainment art accessible to fans worldwide. We're not just selling posters – we're
                  helping you create spaces that inspire and reflect your passions.
                </p>
                <p>
                  Quality is our cornerstone. From the moment you browse our collection to the day your poster arrives
                  at your door, we ensure every step meets our high standards.
                </p>
                <p>
                  We're constantly expanding our collection, working with artists and licensors to bring you the latest
                  and greatest in entertainment artwork.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-white text-center mb-12">WHY CHOOSE ZYNO?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-black">Q</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">PREMIUM QUALITY</h3>
                  <p className="text-gray-400">
                    High-resolution prints on premium paper stock that will last for years.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-black">₹</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">AFFORDABLE PRICES</h3>
                  <p className="text-gray-400">
                    Premium art shouldn't cost a fortune. Quality posters at unbeatable prices.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-black">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">FAST DELIVERY</h3>
                  <p className="text-gray-400">
                    Quick processing and reliable shipping to get your posters to you fast.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Get in Touch Section */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-white mb-8">GET IN TOUCH</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Have questions? Want to suggest a poster? We'd love to hear from you! Reach out through any of our
              channels.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
                <a href="mailto:zynostorez@gmail.com" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  zynostorez@gmail.com
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-bold bg-transparent"
              >
                <a
                  href="https://www.instagram.com/thezynostore/?next=%2F&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Instagram className="h-4 w-4" />
                  @thezynostore
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
