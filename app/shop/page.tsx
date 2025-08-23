"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Filter } from "lucide-react"
import { products, searchProducts, getProductsByCategory } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const searchQuery = searchParams.get("search")

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState("all")

  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    let result = products

    // Filter by category
    if (category) {
      result = getProductsByCategory(category)
    }

    // Filter by search query
    if (searchQuery) {
      result = searchProducts(searchQuery)
    }

    // Filter by price range
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-500":
          result = result.filter((p) => p.price < 500)
          break
        case "500-1000":
          result = result.filter((p) => p.price >= 500 && p.price < 1000)
          break
        case "over-1000":
          result = result.filter((p) => p.price >= 1000)
          break
      }
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Featured - bestsellers first, then new items
        result = [...result].sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1
          if (!a.isBestseller && b.isBestseller) return 1
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return 0
        })
    }

    setFilteredProducts(result)
  }, [category, searchQuery, sortBy, priceRange])

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

  const getCategoryTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`
    if (category) {
      switch (category) {
        case "posters":
          return "Posters"
        case "polaroids":
          return "Polaroids"
        case "tshirts":
          return "T-Shirts"
        default:
          return "Products"
      }
    }
    return "All Products"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4">{getCategoryTitle()}</h1>
            <p className="text-gray-400">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex gap-4 flex-1">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-500">Under ₹500</SelectItem>
                  <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                  <SelectItem value="over-1000">Over ₹1000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
                          <Badge className="bg-red-500 text-white font-bold text-xs">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </Badge>
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
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating) ? "fill-orange-500 text-orange-500" : "text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">({product.reviews.length})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-orange-500">₹{product.price}</span>
                          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                        </div>
                        <Badge className="bg-gray-800 text-gray-300 text-xs capitalize">{product.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
                <Link href="/shop">View All Products</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
