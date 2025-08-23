"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingCart, Trash2, Share2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { state: wishlistState, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    })
  }

  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id)
  }

  const handleClearWishlist = () => {
    clearWishlist()
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  const handleMoveAllToCart = () => {
    if (wishlistState.items && wishlistState.items.length > 0) {
      wishlistState.items.forEach((item: any) => {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
        })
      })
      clearWishlist()
      toast({
        title: "Items moved to cart",
        description: `${wishlistState.items.length} items have been moved to your cart.`,
      })
    }
  }

  const wishlistItems = wishlistState.items || []

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <Heart className="h-24 w-24 text-gray-600 mx-auto mb-4" />
              <h1 className="text-3xl font-black text-white mb-4">YOUR WISHLIST IS EMPTY</h1>
              <p className="text-gray-400 mb-8">
                Save items you love by clicking the heart icon. They'll appear here for easy access later.
              </p>
            </div>
            <Link href="/shop">
              <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold">START SHOPPING</Button>
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">MY WISHLIST</h1>
            <p className="text-gray-400">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
            </p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button onClick={handleMoveAllToCart} className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
              <ShoppingCart className="mr-2 h-4 w-4" />
              MOVE ALL TO CART
            </Button>
            <Button
              onClick={handleClearWishlist}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              CLEAR ALL
            </Button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")} className="mb-8">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="grid" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              Grid View
            </TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-orange-500 data-[state=active]:text-black">
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item: any) => (
                <Card
                  key={item.id}
                  className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-orange-500 transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-800">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500 hover:text-red-400 hover:bg-black/50"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-bold text-white mb-2 hover:text-orange-500 transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-orange-500">₹{item.price}</span>
                      <Badge className="bg-gray-800 text-gray-300 capitalize">{item.category}</Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-bold"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        ADD TO CART
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {wishlistItems.map((item: any) => (
                <Card
                  key={item.id}
                  className="bg-gray-900 border-gray-800 hover:border-orange-500 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-32 h-32 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-bold text-white mb-2 hover:text-orange-500 transition-colors text-lg">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-bold text-orange-500">₹{item.price}</span>
                            <Badge className="bg-gray-800 text-gray-300 capitalize">{item.category}</Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAddToCart(item)}
                              className="bg-orange-500 hover:bg-orange-600 text-black font-bold"
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              ADD TO CART
                            </Button>
                            <Button
                              variant="outline"
                              className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                            >
                              <Share2 className="mr-2 h-4 w-4" />
                              SHARE
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            REMOVE
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Recommendations */}
        <section className="mt-16">
          <h2 className="text-2xl font-black text-white mb-8">YOU MIGHT ALSO LIKE</h2>
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Discover more amazing products</p>
            <Link href="/shop">
              <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold">BROWSE ALL PRODUCTS</Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
