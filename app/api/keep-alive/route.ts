import { type NextRequest, NextResponse } from "next/server"

// Endpoint pentru a menține botul activ
export async function GET(request: NextRequest) {
  try {
    // Ping către endpoint-ul principal
    const baseUrl = request.nextUrl.origin
    const response = await fetch(`${baseUrl}/api/discord`, {
      method: "GET",
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json({
        message: "Keep-alive ping successful! 🏓",
        botStatus: data,
        timestamp: new Date().toISOString(),
      })
    } else {
      return NextResponse.json({ error: "Failed to ping bot endpoint" }, { status: 500 })
    }
  } catch (error) {
    console.error("Keep-alive error:", error)
    return NextResponse.json({ error: "Keep-alive failed" }, { status: 500 })
  }
}
