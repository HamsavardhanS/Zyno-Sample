"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { state, clearCart } = useCart()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and redirect to success page
      clearCart()
      toast({
        title: "Order Placed Successfully! 🎉",
        description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
      })

      router.push("/order-success")
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const subtotal = state.total
  const shipping = subtotal > 500 ? 0 : 50
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  if (!state.items || state.items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-6">Add some products to proceed with checkout.</p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
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
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6 text-gray-400 hover:text-orange-500">
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Checkout Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-gray-300">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-gray-300">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-gray-300">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-gray-300">
                            Phone *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-800" />

                    {/* Shipping Address */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Shipping Address</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="address" className="text-gray-300">
                            Address *
                          </Label>
                          <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            rows={3}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city" className="text-gray-300">
                              City *
                            </Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="state" className="text-gray-300">
                              State *
                            </Label>
                            <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                <SelectItem value="delhi">Delhi</SelectItem>
                                <SelectItem value="karnataka">Karnataka</SelectItem>
                                <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                                <SelectItem value="gujarat">Gujarat</SelectItem>
                                <SelectItem value="rajasthan">Rajasthan</SelectItem>
                                <SelectItem value="west-bengal">West Bengal</SelectItem>
                                <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="pincode" className="text-gray-300">
                              Pincode *
                            </Label>
                            <Input
                              id="pincode"
                              value={formData.pincode}
                              onChange={(e) => handleInputChange("pincode", e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-800" />

                    {/* Order Notes */}
                    <div>
                      <Label htmlFor="notes" className="text-gray-300">
                        Order Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        rows={3}
                        placeholder="Any special instructions for your order..."
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold text-lg py-3"
                    >
                      {isProcessing ? "Processing..." : `Place Order - ₹${total.toLocaleString()}`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-gray-900 border-gray-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm line-clamp-2">{item.name}</h4>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                          {item.size && <p className="text-xs text-gray-400">Size: {item.size}</p>}
                          {item.color && <p className="text-xs text-gray-400">Color: {item.color}</p>}
                        </div>
                        <div className="text-sm font-semibold text-orange-500">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-gray-800" />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-white">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tax (18%)</span>
                      <span className="text-white">₹{tax.toLocaleString()}</span>
                    </div>

                    <Separator className="bg-gray-800" />

                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-orange-500">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="space-y-2 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Secure SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Truck className="h-4 w-4 text-blue-500" />
                      <span>Free shipping on orders above ₹500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
