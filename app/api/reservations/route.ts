import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

type ReservationRequest = {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  notes?: string
}

export async function POST(request: NextRequest) {
  const data: ReservationRequest = await request.json()

  const requiredFields = ["name", "email", "phone", "service", "date", "time"]
  for (const field of requiredFields) {
    if (!data[field as keyof ReservationRequest]) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 })
    }
  }

  // In a real app, this is where you'd send an email and WhatsApp message using
  // an external service such as SendGrid, Nodemailer, Twilio, or WhatsApp Business API.
  // The current route returns success so the UI can build confirmation links.

  return NextResponse.json({ success: true, message: "Reservation request received." })
}
