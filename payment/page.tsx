"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Clock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"

// Function to generate unique order ID
const generateOrderId = () => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9).toUpperCase()
  return `ZYNO${timestamp}${random}`
}

// Function to validate UPI ID format
const validateUpiId = (upiId: string) => {
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
  return upiRegex.test(upiId)
}

// Function to generate proper UPI URL
const generateUpiUrl = (upiId: string, amount: number, orderId: string, transactionId: string) => {
  if (!validateUpiId(upiId)) {
    console.error("Invalid UPI ID format:", upiId)
    return null
  }

  // Create UPI URL with proper encoding
  const params = new URLSearchParams({
    pa: upiId, // Payee Address
    pn: "ZYNO Store", // Payee Name
    am: amount.toString(), // Amount
    cu: "INR", // Currency
    tn: `Order ${orderId}`, // Transaction Note
    tr: transactionId, // Transaction Reference
    mc: "5411", // Merchant Category Code (optional)
    mode: "02", // Transaction mode
    purpose: "00", // Purpose code
  })

  return `upi://pay?${params.toString()}`
}

// Function to save order to CSV (mock implementation)
const saveOrderToCSV = (orderData: any) => {
  const csvData = {
    orderId: orderData.orderId,
    transactionId: orderData.transactionId,
    date: new Date().toISOString(),
    customerName: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
    email: orderData.customer.email,
    phone: orderData.customer.phone,
    address: `${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.state} - ${orderData.customer.pincode}`,
    items: orderData.items.map((item: any) => `${item.name} (Qty: ${item.quantity})`).join("; "),
    total: orderData.total,
    paymentMethod: "UPI",
    upiId: "shrinisha2005@okabi",
    status: "Completed",
  }

  // In a real application, this would send data to your backend
  console.log("Order saved to CSV:", csvData)

  // Mock CSV file creation
  const csvHeaders =
    "Order ID,Transaction ID,Date,Customer Name,Email,Phone,Address,Items,Total,Payment Method,UPI ID,Status"
  const csvRow = Object.values(csvData)
    .map((value) => `"${value}"`)
    .join(",")
  const csvContent = `${csvHeaders}\n${csvRow}`

  console.log("CSV Content:", csvContent)

  // In a real app, you would send this to your backend API
  // fetch('/api/orders', { method: 'POST', body: JSON.stringify(csvData) })

  return csvData
}

// Function to send notifications (mock implementation)
const sendNotifications = async (orderData: any, transactionId: string) => {
  const message = `Thanks for choosing ZYNO😍. Your order was successfully placed and further details will be informed. Order ID: ${orderData.orderId}, Transaction ID: ${transactionId}`

  // Mock email sending
  console.log(`Email sent to ${orderData.customer.email}:`, message)

  // Mock SMS sending
  console.log(`SMS sent to ${orderData.customer.phone}:`, message)

  return { emailSent: true, smsSent: true }
}

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "completed" | "failed">("pending")
  const [qrCode, setQrCode] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [uniqueOrderId, setUniqueOrderId] = useState("")

  // Memoize orderData to prevent infinite re-renders
  const orderData = useMemo(() => {
    const pendingOrder = localStorage.getItem("pendingOrder")
    if (pendingOrder) {
      try {
        return JSON.parse(pendingOrder)
      } catch (error) {
        console.error("Error parsing order data:", error)
        return null
      }
    }
    return null
  }, [])

  const upiId = "shrinisha2005@okabi"

  // Generate unique IDs and QR code only once
  useEffect(() => {
    if (!orderData) {
      router.push("/checkout")
      return
    }

    // Generate unique order ID and transaction ID
    const newOrderId = generateOrderId()
    const txnId = "TXN" + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase()

    setUniqueOrderId(newOrderId)
    setTransactionId(txnId)

    // Update orderData with new unique order ID
    const updatedOrderData = { ...orderData, orderId: newOrderId, transactionId: txnId }
    localStorage.setItem("pendingOrder", JSON.stringify(updatedOrderData))

    // Generate proper UPI URL
    const upiUrl = generateUpiUrl(upiId, orderData.total, newOrderId, txnId)

    if (upiUrl) {
      // Use a more reliable QR code service with better UPI support
      const qrCodeUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(upiUrl)}&choe=UTF-8`
      setQrCode(qrCodeUrl)
      console.log("Generated UPI URL:", upiUrl)
    } else {
      console.error("Failed to generate UPI URL")
      toast({
        title: "QR Code Error",
        description: "Failed to generate payment QR code. Please use manual UPI payment.",
        variant: "destructive",
      })
    }
  }, [orderData, router, upiId, toast])

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && paymentStatus === "pending") {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && paymentStatus === "pending") {
      setPaymentStatus("failed")
    }
  }, [timeLeft, paymentStatus])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId)
    toast({
      title: "UPI ID Copied!",
      description: "UPI ID has been copied to clipboard",
    })
  }

  const copyTransactionDetails = () => {
    const details = `UPI ID: ${upiId}\nAmount: ₹${orderData.total}\nOrder ID: ${uniqueOrderId}\nTransaction ID: ${transactionId}`
    navigator.clipboard.writeText(details)
    toast({
      title: "Payment Details Copied!",
      description: "All payment details have been copied to clipboard",
    })
  }

  const handlePaymentComplete = async () => {
    setPaymentStatus("processing")

    try {
      // Simulate payment processing
      setTimeout(async () => {
        const updatedOrderData = { ...orderData, orderId: uniqueOrderId, transactionId }

        // Save order to CSV
        saveOrderToCSV(updatedOrderData)

        // Send notifications with order ID and transaction ID
        await sendNotifications(updatedOrderData, transactionId)

        setPaymentStatus("completed")

        // Clear localStorage
        localStorage.removeItem("pendingOrder")

        toast({
          title: "Payment Successful! 🎉",
          description: "Thanks for choosing ZYNO😍. Your order was successfully placed!",
        })

        // Redirect to success page
        setTimeout(() => {
          router.push(`/order-success?orderId=${uniqueOrderId}&transactionId=${transactionId}`)
        }, 2000)
      }, 3000)
    } catch (error) {
      console.error("Error processing payment:", error)
      setPaymentStatus("failed")
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleGoBack = () => {
    router.push("/checkout")
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-black text-white mb-4">NO ORDER DATA</h1>
            <p className="text-gray-400 mb-8">Please complete checkout first.</p>
            <Button onClick={handleGoBack} className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
              Go to Checkout
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-black text-white mb-4">PAYMENT EXPIRED</h1>
            <p className="text-gray-400 mb-8">The payment session has expired. Please try again.</p>
            <Button onClick={handleGoBack} className="bg-orange-500 hover:bg-orange-600 text-black font-bold">
              Try Again
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={handleGoBack} className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-black text-white">COMPLETE PAYMENT</h1>
              <p className="text-gray-400">Order ID: {uniqueOrderId}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Section */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  UPI Payment
                  <Badge variant="outline" className="border-orange-500 text-orange-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(timeLeft)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code */}
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    {qrCode ? (
                      <Image
                        src={qrCode || "/placeholder.svg"}
                        alt="Payment QR Code"
                        width={200}
                        height={200}
                        className="mx-auto"
                      />
                    ) : (
                      <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-200 text-gray-500">
                        QR Code Loading...
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Scan QR code with any UPI app</p>
                  <p className="text-xs text-gray-500">Supports Google Pay, PhonePe, Paytm, BHIM, and all UPI apps</p>
                </div>

                {/* Manual UPI */}
                <div className="border-t border-gray-800 pt-6">
                  <p className="text-sm text-gray-400 mb-2">Or pay manually using UPI ID:</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg">
                      <code className="flex-1 text-orange-500 font-mono">{upiId}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyUpiId}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gray-800 p-3 rounded-lg text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Amount:</span>
                        <span className="text-white font-semibold">₹{orderData.total}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Order ID:</span>
                        <span className="text-orange-500 font-mono text-xs">{uniqueOrderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Transaction ID:</span>
                        <span className="text-orange-500 font-mono text-xs">{transactionId}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyTransactionDetails}
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Copy className="h-3 w-3 mr-2" />
                      Copy All Payment Details
                    </Button>
                  </div>
                </div>

                {/* Payment Amount */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Amount to Pay:</span>
                    <span className="text-2xl font-bold text-orange-500">₹{orderData.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-2">Payment Instructions:</h4>
                  <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                    <li>Open any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                    <li>Scan the QR code or enter the UPI ID manually</li>
                    <li>Enter the exact amount: ₹{orderData.total}</li>
                    <li>Add the Order ID in remarks: {uniqueOrderId}</li>
                    <li>Complete the payment and click "Payment Completed" below</li>
                  </ol>
                </div>

                {/* Payment Status */}
                {paymentStatus === "pending" && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400 text-center">Complete the payment and click the button below</p>
                    <Button
                      onClick={handlePaymentComplete}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold"
                    >
                      I HAVE COMPLETED THE PAYMENT
                    </Button>
                  </div>
                )}

                {paymentStatus === "processing" && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                    <p className="text-orange-500 font-semibold">Processing payment and saving order...</p>
                  </div>
                )}

                {paymentStatus === "completed" && (
                  <div className="text-center py-4">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-green-500 font-semibold">Payment Successful!</p>
                    <p className="text-sm text-gray-400">Order saved and notifications sent!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="pb-4 border-b border-gray-800">
                  <h4 className="font-semibold text-white mb-2">Customer Details</h4>
                  <p className="text-gray-400">
                    {orderData.customer.firstName} {orderData.customer.lastName}
                  </p>
                  <p className="text-gray-400 text-sm">{orderData.customer.email}</p>
                  <p className="text-gray-400 text-sm">{orderData.customer.phone}</p>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Items ({orderData.items.length})</h4>
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                      <div className="relative w-12 h-12 bg-gray-700 rounded overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-orange-500 font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-white">₹{orderData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Shipping:</span>
                    <span className="text-green-500 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-orange-500">₹{orderData.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Transaction ID */}
                <div className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Transaction ID:</p>
                  <code className="text-orange-500 text-sm font-mono">{transactionId}</code>
                </div>

                {/* Support */}
                <div className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Need Help?</p>
                  <p className="text-sm text-white">Contact us at:</p>
                  <a href="mailto:zynostorez@gmail.com" className="text-orange-500 text-sm hover:underline">
                    zynostorez@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
