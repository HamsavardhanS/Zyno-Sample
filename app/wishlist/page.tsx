"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    })
    toast({
      title: "Added to Cart! 🛒",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeFromWishlist(id)
    toast({
      title: "Removed from Wishlist",
      description: `${name} has been removed from your wishlist.`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-gray-600" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h1>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Save your favorite products to your wishlist and never lose track of what you love.
              </p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                MY <span className="text-orange-500">WISHLIST</span>
              </h1>
              <p className="text-gray-400">
                {items.length} item{items.length !== 1 ? "s" : ""} saved
              </p>
            </div>
            {items.length > 0 && (
              <Button
                onClick={clearWishlist}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card
                key={item.id}
                className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-orange-500 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <Link href={`/product/${item.id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                      {/* Remove from Wishlist Button */}
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          handleRemoveFromWishlist(item.id, item.name)
                        }}
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      {/* Discount Badge */}
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white font-bold text-xs">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </Badge>

                      {/* Quick Add to Cart */}
                      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            handleAddToCart(item)
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
                    <Link href={`/product/${item.id}`}>
                      <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
                        {item.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-orange-500">₹{item.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                      </div>
                      <Badge className="bg-gray-800 text-gray-300 text-xs capitalize">{item.category}</Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        size="sm"
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                      >
                        <Heart className="h-3 w-3 fill-current" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
