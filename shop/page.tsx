"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Heart, Star, Search, Filter, Grid3X3, List } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import { allProducts } from "@/lib/products"

const categories = [
  { id: "all", name: "All Products", count: allProducts.length },
  { id: "tshirts", name: "T-Shirts", count: allProducts.filter((p) => p.category === "tshirts").length },
  { id: "posters", name: "Posters", count: allProducts.filter((p) => p.category === "posters").length },
  { id: "polaroids", name: "Polaroids", count: allProducts.filter((p) => p.category === "polaroids").length },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "all"

  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  // Get unique colors and sizes
  const allColors = Array.from(new Set(allProducts.flatMap((p) => p.colors || [])))
  const allSizes = Array.from(new Set(allProducts.flatMap((p) => p.sizes || [])))

  useEffect(() => {
    let filtered = allProducts

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) => product.colors?.some((color) => selectedColors.includes(color)))
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) => product.sizes?.some((size) => selectedSizes.includes(size)))
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Featured - keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [category, searchTerm, sortBy, priceRange, selectedColors, selectedSizes])

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
  }

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setPriceRange([0, 3000])
    setSelectedColors([])
    setSelectedSizes([])
    setSortBy("featured")
  }

  const getCategoryTitle = () => {
    switch (category) {
      case "tshirts":
        return "T-SHIRTS"
      case "posters":
        return "POSTERS"
      case "polaroids":
        return "POLAROIDS"
      default:
        return "ALL PRODUCTS"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-4">{getCategoryTitle()}</h1>
          <p className="text-gray-400">
            {category === "all"
              ? "Discover our complete collection"
              : category === "tshirts"
                ? "Bold designs for the fearless"
                : category === "posters"
                  ? "Bring cinema magic to your walls"
                  : "Instant nostalgia in every frame"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Only show when category is 'all' */}
          {category === "all" && (
            <div className="lg:w-1/4">
              <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-orange-500 hover:text-orange-400"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={cat.id === "all" ? "/shop" : `/shop?category=${cat.id}`}
                        className={`flex items-center justify-between p-2 rounded transition-colors ${
                          category === cat.id
                            ? "bg-orange-500 text-black"
                            : "text-gray-300 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-sm">({cat.count})</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={3000}
                      min={0}
                      step={100}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                {allColors.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">Colors</h4>
                    <div className="space-y-2">
                      {allColors.map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={`color-${color}`}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                          />
                          <label htmlFor={`color-${color}`} className="text-sm text-gray-300 cursor-pointer">
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {allSizes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">Sizes</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {allSizes.map((size) => (
                        <div key={size} className="flex items-center space-x-1">
                          <Checkbox
                            id={`size-${size}`}
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                          />
                          <label htmlFor={`size-${size}`} className="text-xs text-gray-300 cursor-pointer">
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={category === "all" ? "lg:w-3/4" : "w-full"}>
            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-white"
                />
              </div>

              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-gray-700 rounded">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {category === "all" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden border-gray-700"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-400">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`bg-gray-900 border-gray-800 overflow-hidden group hover:border-orange-500 transition-all duration-300 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden bg-gray-800 ${
                        viewMode === "list" ? "w-48 h-48" : "aspect-square"
                      }`}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && <Badge className="bg-green-500 text-black font-bold">NEW</Badge>}
                        {product.isBestseller && (
                          <Badge className="bg-orange-500 text-black font-bold">BESTSELLER</Badge>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-white hover:text-orange-500 hover:bg-black/50"
                        onClick={() => handleWishlistToggle(product)}
                      >
                        <Heart
                          className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-orange-500 text-orange-500" : ""}`}
                        />
                      </Button>
                    </div>

                    <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-bold text-white mb-2 hover:text-orange-500 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-400">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-orange-500">₹{product.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      </div>

                      {/* Colors and Sizes */}
                      {viewMode === "list" && (
                        <div className="mb-3 space-y-2">
                          {product.colors && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">Colors:</span>
                              <div className="flex gap-1">
                                {product.colors.slice(0, 3).map((color) => (
                                  <span key={color} className="text-xs bg-gray-800 px-2 py-1 rounded">
                                    {color}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {product.sizes && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">Sizes:</span>
                              <div className="flex gap-1">
                                {product.sizes.slice(0, 4).map((size) => (
                                  <span key={size} className="text-xs bg-gray-800 px-2 py-1 rounded">
                                    {size}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        ADD TO CART
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">No products found matching your criteria.</p>
                <Button onClick={clearFilters} className="bg-orange-500 hover:bg-orange-600 text-black">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  )
}
