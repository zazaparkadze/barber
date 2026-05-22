import { NextRequest, NextResponse } from "next/server"
import {
  isSlotAvailable,
  createAppointment,
  confirmAppointment,
  getAllAppointments,
  deleteAppointment,
} from "@/lib/appointments"
import { sendConfirmationSMS } from "@/app/actions"
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail"
import { SERVICE_DURATIONS } from "@/app/config/hours"
import { verifyRoles } from "@/lib/verifyRoles"

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

    const available = await isSlotAvailable(date, time, duration)

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
    const available = await isSlotAvailable(date, time, duration)
    if (!available) {
      return NextResponse.json(
        {
          error:
            "Time slot is no longer available. Another customer booked it.",
          requiresReschedule: true,
        },
        { status: 409 }
      )
    }

    // Create appointment
    const appointment = await createAppointment({
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

export async function GET(request: NextRequest) {
  if (verifyRoles(request)) {
    try {
      const appointments = await getAllAppointments()
      return NextResponse.json({
        success: true,
        appointments,
      })
    } catch (error) {
      console.error("Error fetching appointments:", error)
      return NextResponse.json(
        { error: "Failed to fetch appointments" },
        { status: 500 }
      )
    }
  } else {
    return NextResponse.json({
      success: false,
      reason: "roles"
    })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id || typeof id !== "number") {
      return NextResponse.json(
        { error: "Invalid appointment ID" },
        { status: 400 }
      )
    }

    const deleted = await deleteAppointment(id)

    if (!deleted) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Appointment deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting appointment:", error)
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    )
  }
}
