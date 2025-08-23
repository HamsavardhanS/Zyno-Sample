"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  if (!state.items || state.items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg bg-gray-900 border-gray-800 text-white">
          <SheetHeader>
            <SheetTitle className="text-white flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-gray-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Your cart is empty</h3>
              <p className="text-gray-400 mb-4">Add some awesome products to get started!</p>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-black font-bold" onClick={onClose}>
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-gray-900 border-gray-800 text-white flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
            </div>
            <Badge className="bg-orange-500 text-black">
              {state.items.reduce((sum, item) => sum + item.quantity, 0)} items
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-gray-800 rounded-lg">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white text-sm line-clamp-2 mb-1">{item.name}</h4>
                  <p className="text-xs text-gray-400 capitalize mb-2">{item.category}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="text-sm font-medium text-white min-w-[2rem] text-center">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-orange-500">{formatPrice(item.price * item.quantity)}</div>
                  <div className="text-xs text-gray-400">{formatPrice(item.price)} each</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-white">Total:</span>
            <span className="text-xl font-bold text-orange-500">{formatPrice(state.total)}</span>
          </div>

          <div className="space-y-2">
            <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold" onClick={onClose}>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>

            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
