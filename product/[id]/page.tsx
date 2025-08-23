"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import { getProductById, getRelatedProducts, type Product } from "@/lib/products"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId)
      if (foundProduct) {
        setProduct(foundProduct)
        const related = getRelatedProducts(productId, foundProduct.category)
        setRelatedProducts(related)
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0])
        }
      }
      setLoading(false)
    }
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: selectedSize || undefined,
    }

    addToCart(cartItem)
    toast({
      title: "Added to cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlistToggle = () => {
    if (!product) return

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist! ❤️",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-black text-white mb-4">Loading...</h1>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-3xl font-black text-white mb-4">PRODUCT NOT FOUND</h1>
            <p className="text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
            <Link href="/shop">
              <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold">BACK TO SHOP</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white">
              Shop
            </Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-white capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </nav>

        {/* Back Button */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-900 rounded-2xl overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    OUT OF STOCK
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-orange-500 text-black mb-4 capitalize">{product.category}</Badge>
              <h1 className="text-4xl font-black text-white mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-orange-500">₹{product.price}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                  ))}
                  <span className="text-gray-400 ml-2">(4.8)</span>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-white font-medium mb-3">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size} className="text-white">
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <label className="block text-white font-medium mb-3">Quantity</label>
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()} className="text-white">
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold py-3"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
              </Button>
              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg">
                <Truck className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-white font-medium">Free Shipping</div>
                  <div className="text-gray-400 text-sm">On all orders</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg">
                <Shield className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-white font-medium">Secure Payment</div>
                  <div className="text-gray-400 text-sm">100% protected</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg">
                <RotateCcw className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-white font-medium">Easy Returns</div>
                  <div className="text-gray-400 text-sm">30-day policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-black text-white mb-8">YOU MIGHT ALSO LIKE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="bg-gray-900 border-gray-800 hover:border-orange-500 transition-colors group"
                >
                  <CardContent className="p-0">
                    <Link href={`/product/${relatedProduct.id}`}>
                      <div className="relative aspect-square bg-gray-800 overflow-hidden rounded-t-lg">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white mb-2 line-clamp-2">{relatedProduct.name}</h3>
                        <p className="text-orange-500 font-bold">₹{relatedProduct.price}</p>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}
