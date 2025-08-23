"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, CreditCard, Truck } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  notes?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { state: cartState } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({})

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
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

  const subtotal = cartState.total || 0
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {}

    if (!customerInfo.firstName.trim()) newErrors.firstName = "First name is required"
    if (!customerInfo.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(customerInfo.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }
    if (!customerInfo.address.trim()) newErrors.address = "Address is required"
    if (!customerInfo.city.trim()) newErrors.city = "City is required"
    if (!customerInfo.state.trim()) newErrors.state = "State is required"
    if (!customerInfo.pincode.trim()) {
      newErrors.pincode = "Pincode is required"
    } else if (!/^\d{6}$/.test(customerInfo.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePlaceOrder = async () => {
    if (cartState.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      })
      return
    }

    if (!validateForm()) {
      toast({
        title: "Please fill all required fields",
        description: "Complete all required information to place your order.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Save order data to CSV
      const orderData = {
        orderId: `ZYNO-${Date.now()}`,
        date: new Date().toISOString(),
        customer: customerInfo,
        items: cartState.items,
        subtotal,
        shipping,
        total,
        paymentMethod: "UPI",
      }

      // Store order data in localStorage for payment page
      localStorage.setItem("pendingOrder", JSON.stringify(orderData))

      // Redirect to payment page
      router.push("/payment")
    } catch (error) {
      console.error("Error processing order:", error)
      toast({
        title: "Error",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some items to your cart to proceed with checkout</p>
            <Button onClick={() => router.push("/shop")} className="bg-orange-500 hover:bg-orange-600 text-black">
              Continue Shopping
            </Button>
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
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-white hover:text-orange-500"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-black text-white">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-500" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`bg-gray-800 border-gray-700 text-white ${errors.firstName ? "border-red-500" : ""}`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`bg-gray-800 border-gray-700 text-white ${errors.lastName ? "border-red-500" : ""}`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`bg-gray-800 border-gray-700 text-white ${errors.email ? "border-red-500" : ""}`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`bg-gray-800 border-gray-700 text-white ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="address" className="text-white">
                    Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={`bg-gray-800 border-gray-700 text-white ${errors.address ? "border-red-500" : ""}`}
                    placeholder="Enter your full address"
                    rows={3}
                  />
                  {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-white">
                      City *
                    </Label>
                    <Input
                      id="city"
                      value={customerInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={`bg-gray-800 border-gray-700 text-white ${errors.city ? "border-red-500" : ""}`}
                      placeholder="Enter your city"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-white">
                      State *
                    </Label>
                    <Input
                      id="state"
                      value={customerInfo.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className={`bg-gray-800 border-gray-700 text-white ${errors.state ? "border-red-500" : ""}`}
                      placeholder="Enter your state"
                    />
                    {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="pincode" className="text-white">
                    Pincode *
                  </Label>
                  <Input
                    id="pincode"
                    value={customerInfo.pincode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                    className={`bg-gray-800 border-gray-700 text-white ${errors.pincode ? "border-red-500" : ""}`}
                    placeholder="Enter your pincode"
                  />
                  {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode}</p>}
                </div>

                <div>
                  <Label htmlFor="notes" className="text-white">
                    Order Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    value={customerInfo.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Any special instructions for your order"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-orange-500" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartState.items.map((item) => (
                    <div key={`${item.id}-${item.size || "default"}`} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-800">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{item.name}</h4>
                        <p className="text-gray-400 text-xs">
                          {item.size && `Size: ${item.size} • `}Qty: {item.quantity || 1}
                        </p>
                      </div>
                      <div className="text-orange-500 font-bold">
                        ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </div>
                    </div>
                  ))}

                  <Separator className="bg-gray-700" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        Shipping
                      </span>
                      <span className="text-green-500 font-medium">FREE</span>
                    </div>
                    <Separator className="bg-gray-700" />
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span className="text-orange-500">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">UPI Payment</h4>
                      <p className="text-gray-400 text-sm">Pay securely using UPI</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 text-lg"
            >
              {isLoading ? "Processing..." : `Place Order • ₹${total.toLocaleString()}`}
            </Button>

            <p className="text-gray-400 text-sm text-center">
              By placing your order, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
