"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { BarChart, LineChart, PieChart, Plus, RefreshCw, Pencil, Trash } from "lucide-react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardNav } from "./dashboard-nav"
import Link from "next/link"
import { getInvestments, deleteInvestment, type Investment } from "@/services/investment-service"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [investments, setInvestments] = useState<Investment[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        fetchInvestments()
      } else {
        router.push("/login")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const fetchInvestments = async () => {
    try {
      setIsRefreshing(true)
      const data = await getInvestments()
      setInvestments(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch investments",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleDeleteInvestment = async (id: string) => {
    try {
      await deleteInvestment(id)
      toast({
        title: "Investment deleted",
        description: "The investment has been successfully deleted.",
      })
      fetchInvestments()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete investment",
        variant: "destructive",
      })
    }
  }

  const filteredInvestments =
    activeTab === "all" ? investments : investments.filter((inv) => inv.type.toLowerCase() === activeTab)

  const calculateTotalValue = () => {
    return investments.reduce((total, inv) => total + inv.value, 0)
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Link href="/dashboard/add-investment">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Investment
              </Button>
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${calculateTotalValue().toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">{investments.length} investments in your portfolio</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{investments.length}</div>
                <p className="text-xs text-muted-foreground">
                  {investments.filter((inv) => inv.type === "stock").length} stocks,
                  {investments.filter((inv) => inv.type === "etf").length} ETFs,
                  {investments.filter((inv) => inv.type === "crypto").length} crypto
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Connect to market data for performance metrics</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Assets</TabsTrigger>
                  <TabsTrigger value="stock">Stocks</TabsTrigger>
                  <TabsTrigger value="etf">ETFs</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" onClick={fetchInvestments} disabled={isRefreshing}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
              <TabsContent value={activeTab} className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {activeTab === "all"
                        ? "All Investments"
                        : activeTab === "stock"
                          ? "Stocks"
                          : activeTab === "etf"
                            ? "ETFs"
                            : "Cryptocurrencies"}
                    </CardTitle>
                    <CardDescription>
                      Manage your {activeTab === "all" ? "investment" : activeTab} assets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filteredInvestments.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No investments found</p>
                        <Link href="/dashboard/add-investment">
                          <Button variant="outline" className="mt-4">
                            <Plus className="mr-2 h-4 w-4" /> Add Investment
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="rounded-md border">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-muted/50 text-sm">
                              <th className="p-3 text-left font-medium">Name</th>
                              <th className="p-3 text-left font-medium">Type</th>
                              <th className="p-3 text-left font-medium">Price</th>
                              <th className="p-3 text-left font-medium">Holdings</th>
                              <th className="p-3 text-left font-medium">Value</th>
                              <th className="p-3 text-left font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredInvestments.map((investment) => (
                              <tr key={investment.id} className="border-b">
                                <td className="p-3">
                                  {investment.name}{" "}
                                  <span className="text-xs text-muted-foreground">({investment.symbol})</span>
                                </td>
                                <td className="p-3 capitalize">{investment.type}</td>
                                <td className="p-3">${investment.price.toFixed(2)}</td>
                                <td className="p-3">{investment.quantity}</td>
                                <td className="p-3">${investment.value.toFixed(2)}</td>
                                <td className="p-3">
                                  <div className="flex gap-2">
                                    <Link href={`/dashboard/edit-investment/${investment.id}`}>
                                      <Button variant="ghost" size="icon">
                                        <Pencil className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                      </Button>
                                    </Link>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <Trash className="h-4 w-4" />
                                          <span className="sr-only">Delete</span>
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This will permanently delete {investment.name} ({investment.symbol}) from
                                            your portfolio.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => handleDeleteInvestment(investment.id!)}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

