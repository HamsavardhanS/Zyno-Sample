"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, Instagram, Home } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function OrderSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)

  const orderId = searchParams.get("orderId")
  const transactionId = searchParams.get("transactionId")

  useEffect(() => {
    // In a real app, you would fetch order details from your backend
    // For now, we'll create mock order details
    if (orderId && transactionId) {
      setOrderDetails({
        orderId,
        transactionId,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: "Confirmed",
        estimatedDelivery: "3-5 business days",
      })
    }
  }, [orderId, transactionId])

  if (!orderId || !transactionId) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-black text-white mb-4">INVALID ORDER</h1>
            <p className="text-gray-400 mb-8">Order details not found.</p>
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
    <div className="min-h-screen bg-black text-white pt-20">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-black text-white mb-2">ORDER CONFIRMED! 🎉</h1>
            <p className="text-xl text-gray-300">Thanks for choosing ZYNO😍</p>
          </div>

          {/* Order Details Card */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Order ID</p>
                  <p className="text-white font-mono text-sm">{orderId}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Transaction ID</p>
                  <p className="text-orange-500 font-mono text-sm">{transactionId}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white">{orderDetails?.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Time</p>
                  <p className="text-white">{orderDetails?.time}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className="text-green-500 font-semibold">{orderDetails?.status}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Estimated Delivery</p>
                  <p className="text-white">{orderDetails?.estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Order Confirmation</p>
                    <p className="text-gray-400 text-sm">
                      You'll receive an email and SMS confirmation with your order and transaction details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Processing</p>
                    <p className="text-gray-400 text-sm">
                      We'll prepare your order for shipping within 1-2 business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Shipping</p>
                    <p className="text-gray-400 text-sm">
                      Your posters will be carefully packaged and shipped to your address.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Delivery</p>
                    <p className="text-gray-400 text-sm">
                      Enjoy your new posters! Estimated delivery: {orderDetails?.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                If you have any questions about your order, feel free to reach out to us:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black bg-transparent"
                >
                  <a href="mailto:zynostorez@gmail.com" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    zynostorez@gmail.com
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  <a
                    href="https://www.instagram.com/thezynostore/?next=%2F&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="h-4 w-4" />
                    @thezynostore
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-black font-bold flex-1">
              <Link href="/shop" className="flex items-center justify-center gap-2">
                Continue Shopping
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 flex-1 bg-transparent"
            >
              <Link href="/" className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
