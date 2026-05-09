import { NextRequest, NextResponse } from "next/server"
import {
  isSlotAvailable,
  SERVICE_DURATIONS,
  createAppointment,
  confirmAppointment,
} from "@/lib/appointments"
import { sendConfirmationEmail, sendConfirmationSMS } from "@/app/actions"

// Check availability for a given date and time
export async function POST(request: NextRequest) {
  const { action, data } = await request.json()

  if (action === "check-availability") {
    const { date, time, service } = data

    if (!date || !time || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const duration = SERVICE_DURATIONS[service]
    if (!duration) {
      return NextResponse.json(
        { error: "Invalid service selected" },
        { status: 400 }
      )
    }

    const available = isSlotAvailable(date, time, duration)

    return NextResponse.json({
      available,
      duration,
      message: available
        ? "Time slot is available!"
        : "This time slot is not available. Please choose another time.",
    })
  }

  if (action === "create-appointment") {
    const { name, email, phone, service, date, time, notes } = data

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const duration = SERVICE_DURATIONS[service]
    if (!duration) {
      return NextResponse.json(
        { error: "Invalid service selected" },
        { status: 400 }
      )
    }

    // Final availability check
    const available = isSlotAvailable(date, time, duration)
    if (!available) {
      return NextResponse.json(
        {
          error: "Time slot is no longer available. Another customer booked it.",
          requiresReschedule: true,
        },
        { status: 409 }
      )
    }

    // Create appointment
    const appointment = createAppointment({
      name,
      email,
      phone,
      service,
      date,
      time,
      duration,
      notes: notes || "",
    })

    // Confirm appointment and send notifications
    confirmAppointment(appointment.id)

    const emailSent = await sendConfirmationEmail(appointment)
    const smsSent = await sendConfirmationSMS(appointment)

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        name: appointment.name,
        date: appointment.date,
        time: appointment.time,
        service: appointment.service,
      },
      notifications: {
        email: emailSent,
        sms: smsSent,
      },
      message: `Appointment confirmed! Confirmation details have been sent to ${email} and ${phone}`,
    })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
