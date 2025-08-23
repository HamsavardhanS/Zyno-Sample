"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Smartphone, Shield, CheckCircle, AlertCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state, clearCart } = useCart()
  const { toast } = useToast()

  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [upiId, setUpiId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle")

  // Get order details from URL params or cart
  const orderTotal = searchParams.get("total") ? Number.parseInt(searchParams.get("total")!) : state.total
  const orderItems = state.items?.length || 0

  useEffect(() => {
    // Redirect if no items in cart and no order total
    if (!orderTotal && (!state.items || state.items.length === 0)) {
      router.push("/shop")
    }
  }, [orderTotal, state.items, router])

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === "upi" && !upiId.trim()) {
      toast({
        title: "UPI ID Required",
        description: "Please enter your UPI ID to proceed.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setPaymentStatus("processing")

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate payment success (90% success rate)
      const isSuccess = Math.random() > 0.1

      if (isSuccess) {
        setPaymentStatus("success")

        // Clear cart after successful payment
        setTimeout(() => {
          clearCart()
          toast({
            title: "Payment Successful! 🎉",
            description: "Your order has been confirmed. Redirecting to order confirmation...",
          })

          // Redirect to order success page
          setTimeout(() => {
            router.push("/order-success")
          }, 2000)
        }, 1500)
      } else {
        setPaymentStatus("failed")
        toast({
          title: "Payment Failed",
          description: "There was an issue processing your payment. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setPaymentStatus("failed")
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetPayment = () => {
    setPaymentStatus("idle")
    setUpiId("")
  }

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <Card className="bg-gray-900 border-gray-800 max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
              <p className="text-gray-400 mb-6">
                Your payment of ₹{orderTotal.toLocaleString()} has been processed successfully.
              </p>
              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <p>Transaction ID: TXN{Date.now()}</p>
                <p>Payment Method: UPI ({upiId})</p>
                <p>Amount: ₹{orderTotal.toLocaleString()}</p>
              </div>
              <p className="text-sm text-gray-400">Redirecting to order confirmation...</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-[60vh]">
          <Card className="bg-gray-900 border-gray-800 max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Payment Failed</h1>
              <p className="text-gray-400 mb-6">
                We couldn't process your payment. Please check your details and try again.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={resetPayment}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                >
                  Try Again
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Link href="/checkout">Back to Checkout</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6 text-gray-400 hover:text-orange-500">
            <Link href="/checkout">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Checkout
            </Link>
          </Button>

          {/* Payment Form */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Complete Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Items ({orderItems})</span>
                      <span className="text-white">₹{orderTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-green-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tax (18%)</span>
                      <span className="text-white">₹{Math.round(orderTotal * 0.18).toLocaleString()}</span>
                    </div>
                    <Separator className="bg-gray-700" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-orange-500">₹{Math.round(orderTotal * 1.18).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === "upi"
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setPaymentMethod("upi")}
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-orange-500" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">UPI Payment</h4>
                          <p className="text-sm text-gray-400">Pay using Google Pay, PhonePe, Paytm, or any UPI app</p>
                        </div>
                        <Badge className="bg-green-500 text-black text-xs">Recommended</Badge>
                      </div>
                    </div>

                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-colors opacity-50 ${
                        paymentMethod === "card" ? "border-orange-500 bg-orange-500/10" : "border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gray-500" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-500">Credit/Debit Card</h4>
                          <p className="text-sm text-gray-500">Coming Soon</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* UPI Details */}
                {paymentMethod === "upi" && (
                  <div>
                    <Label htmlFor="upiId" className="text-gray-300">
                      UPI ID *
                    </Label>
                    <Input
                      id="upiId"
                      type="text"
                      placeholder="yourname@paytm / yourname@gpay"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Enter your UPI ID (e.g., 9876543210@paytm, yourname@gpay)
                    </p>
                  </div>
                )}

                {/* Security Info */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold text-white">Secure Payment</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Your payment information is encrypted and secure. We don't store your payment details.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isProcessing || paymentStatus === "processing"}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold text-lg py-3"
                >
                  {paymentStatus === "processing" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ₹${Math.round(orderTotal * 1.18).toLocaleString()}`
                  )}
                </Button>

                {/* Terms */}
                <p className="text-xs text-gray-400 text-center">
                  By completing this payment, you agree to our{" "}
                  <Link href="/terms" className="text-orange-500 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-orange-500 hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
