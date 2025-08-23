"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, Mail, Download, ArrowRight } from "lucide-react"

export default function OrderSuccessPage() {
  const [orderDetails] = useState({
    orderId: `ORD${Date.now()}`,
    transactionId: `TXN${Date.now()}`,
    amount: 1299,
    items: 3,
    estimatedDelivery: "3-5 business days",
    email: "customer@example.com",
  })

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="pt-16">
        <div className="container mx-auto px-4 py-12">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              ORDER <span className="text-green-500">CONFIRMED!</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Thank you for your purchase! Your order has been successfully placed and is being processed.
            </p>
          </div>

          {/* Order Details */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Order Summary */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order ID</span>
                    <span className="text-white font-mono">{orderDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transaction ID</span>
                    <span className="text-white font-mono">{orderDetails.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Items</span>
                    <span className="text-white">{orderDetails.items} products</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Amount</span>
                    <span className="text-green-500 font-bold">₹{orderDetails.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Status</span>
                    <Badge className="bg-green-500 text-black">Paid</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Delivery</span>
                    <span className="text-white">{orderDetails.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping Method</span>
                    <span className="text-white">Standard Delivery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tracking</span>
                    <span className="text-orange-500">Available soon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping Cost</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="bg-gray-900 border-gray-800 max-w-4xl mx-auto mb-12">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                What Happens Next?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Order Confirmation</h3>
                  <p className="text-sm text-gray-400">
                    You'll receive an email confirmation with your order details shortly.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-black font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Processing</h3>
                  <p className="text-sm text-gray-400">We'll prepare your order and send you tracking information.</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-black font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Delivery</h3>
                  <p className="text-sm text-gray-400">
                    Your order will be delivered within {orderDetails.estimatedDelivery}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
                <Link href="/shop">
                  Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              Need help? Contact us at{" "}
              <a href="mailto:support@zyno.com" className="text-orange-500 hover:underline">
                support@zyno.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
