"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { RefreshCw } from "lucide-react"
import { getInvestment, updateInvestment } from "@/services/investment-service"
import { DashboardHeader } from "../../dashboard-header"
import { DashboardNav } from "../../dashboard-nav"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default function EditInvestmentPage({ params }: { params: { id: string } }) {
  const [investment, setInvestment] = useState<any>(null)
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        fetchInvestment()
      } else {
        router.push("/login")
      }
    })

    return () => unsubscribe()
  }, [router])

  const fetchInvestment = async () => {
    try {
      const data = await getInvestment(id)
      setInvestment(data)
      setName(data.name)
      setSymbol(data.symbol)
      setType(data.type)
      setPrice(data.price.toString())
      setQuantity(data.quantity.toString())
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch investment",
        variant: "destructive",
      })
      router.push("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)

    try {
      // Validate inputs
      if (!name || !symbol || !type || !price || !quantity) {
        throw new Error("All fields are required")
      }

      const priceValue = Number.parseFloat(price)
      const quantityValue = Number.parseFloat(quantity)

      const updatedInvestment = {
        name,
        symbol,
        type,
        price: priceValue,
        quantity: quantityValue,
        value: priceValue * quantityValue,
      }

      await updateInvestment(id, updatedInvestment)

      toast({
        title: "Investment updated",
        description: `${name} (${symbol}) has been updated.`,
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update investment",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="container mx-auto py-10">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Edit Investment</CardTitle>
                <CardDescription>Update the details of your investment</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Investment Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Apple Inc."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symbol">Symbol/Ticker</Label>
                    <Input
                      id="symbol"
                      placeholder="e.g. AAPL"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Investment Type</Label>
                    <Select value={type} onValueChange={setType} required>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select investment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stock">Stock</SelectItem>
                        <SelectItem value="etf">ETF</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        <SelectItem value="bond">Bond</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Purchase Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        step="0.000001"
                        min="0"
                        placeholder="0"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {price && quantity && (
                    <div className="p-4 bg-muted rounded-md">
                      <p className="font-medium">
                        Total Value: ${(Number.parseFloat(price) * Number.parseFloat(quantity)).toFixed(2)}
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => router.back()} disabled={updating}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updating}>
                    {updating ? "Updating..." : "Update Investment"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

