"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BotStatus {
  status: string
  user: string
  guilds: number
  timestamp: string
}

export default function BotDashboard() {
  const [botStatus, setBotStatus] = useState<BotStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkBotStatus = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/discord")
      if (response.ok) {
        const data = await response.json()
        setBotStatus(data)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Eroare necunoscută")
      }
    } catch (err) {
      setError("Eroare de conexiune")
    } finally {
      setLoading(false)
    }
  }

  const restartBot = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "restart" }),
      })

      if (response.ok) {
        await checkBotStatus()
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Eroare la restart")
      }
    } catch (err) {
      setError("Eroare de conexiune")
    } finally {
      setLoading(false)
    }
  }

  const keepAlive = async () => {
    try {
      await fetch("/api/keep-alive")
    } catch (err) {
      console.error("Keep-alive failed:", err)
    }
  }

  useEffect(() => {
    checkBotStatus()

    // Keep-alive la fiecare 5 minute
    const interval = setInterval(keepAlive, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🤖 Discord Bot Dashboard</h1>
          <p className="text-gray-600">Monitorizează și controlează botul tău de Discord</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 Status Bot
                {botStatus && (
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Online
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Informații despre starea curentă a botului</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">Se încarcă...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">❌ {error}</p>
                </div>
              )}

              {botStatus && !loading && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span className="text-green-600">{botStatus.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Utilizator:</span>
                    <span>{botStatus.user}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Servere:</span>
                    <span>{botStatus.guilds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Ultima verificare:</span>
                    <span className="text-sm text-gray-600">
                      {new Date(botStatus.timestamp).toLocaleString("ro-RO")}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={checkBotStatus} disabled={loading} className="flex-1">
                  🔄 Verifică Status
                </Button>
                <Button onClick={restartBot} disabled={loading} variant="outline" className="flex-1 bg-transparent">
                  🔄 Restart Bot
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📋 Comenzi Disponibile</CardTitle>
              <CardDescription>Lista comenzilor pe care le poate executa botul</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <code className="text-sm font-mono">/salut</code>
                  <span className="text-sm text-gray-600">Salută utilizatorul</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <code className="text-sm font-mono">/info</code>
                  <span className="text-sm text-gray-600">Info despre server</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <code className="text-sm font-mono">/ping</code>
                  <span className="text-sm text-gray-600">Verifică latența</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <code className="text-sm font-mono">/random</code>
                  <span className="text-sm text-gray-600">Număr aleatoriu</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <code className="text-sm font-mono">/ajutor</code>
                  <span className="text-sm text-gray-600">Lista comenzilor</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>⚠️ Limitări Vercel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Atenție:</h4>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Vercel nu este ideal pentru Discord bots care rulează 24/7</li>
                <li>• Funcțiile serverless au timeout de 10 secunde (Hobby) / 60 secunde (Pro)</li>
                <li>• Botul se poate opri după perioade de inactivitate</li>
                <li>• Pentru bots permanenți, recomand Railway sau Render</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
