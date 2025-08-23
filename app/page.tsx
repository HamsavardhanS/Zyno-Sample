"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, ShoppingCart, Zap, Shield, Truck } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 8))
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const categories = [
    {
      name: "Posters",
      href: "/shop?category=posters",
      image: "/placeholder.svg?height=300&width=400&text=Premium+Posters",
      description: "High-quality raptor posters",
    },
    {
      name: "Polaroids",
      href: "/shop?category=polaroids",
      image: "/placeholder.svg?height=300&width=400&text=Vintage+Polaroids",
      description: "Vintage-style polaroid collections",
    },
    {
      name: "T-Shirts",
      href: "/shop?category=tshirts",
      image: "/placeholder.svg?height=300&width=400&text=Premium+Tshirts",
      description: "Premium cotton t-shirts with unique designs",
    },
  ]

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Premium Quality",
      description: "High-resolution prints on premium materials",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fast Shipping",
      description: "Free shipping on orders above ₹500",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Payment",
      description: "100% secure payment with UPI integration",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-black to-red-500/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              DRIP STARTS HERE!{" "}
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
                RAPTORS
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover premium posters, vintage polaroids, and exclusive t-shirts that define your style
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-lg px-8">
                <Link href="/shop">
                  SHOP NOW <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-bold text-lg px-8 bg-transparent"
              >
                <Link href="/about">LEARN MORE</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full text-black mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              SHOP BY <span className="text-orange-500">CATEGORY</span>
            </h2>
            <p className="text-gray-400 text-lg">Explore our curated collections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-orange-500 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-2xl font-black text-white mb-2">{category.name}</h3>
                          <p className="text-gray-200">{category.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              FEATURED <span className="text-orange-500">PRODUCTS</span>
            </h2>
            <p className="text-gray-400 text-lg">Handpicked favorites from our collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-orange-500 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && <Badge className="bg-green-500 text-black font-bold text-xs">NEW</Badge>}
                        {product.isBestseller && (
                          <Badge className="bg-orange-500 text-black font-bold text-xs">BESTSELLER</Badge>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            handleAddToCart(product)
                          }}
                          size="sm"
                          className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          ADD TO CART
                        </Button>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-orange-500 text-orange-500" />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">({product.reviews.length})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-orange-500">₹{product.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                      <Badge className="bg-green-500 text-black text-xs">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
              <Link href="/shop">
                VIEW ALL PRODUCTS <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            READY TO UPGRADE YOUR <span className="text-orange-500">STYLE?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of satisfied customers who trust ZYNO</p>
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-lg px-8">
            <Link href="/shop">
              START SHOPPING <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
