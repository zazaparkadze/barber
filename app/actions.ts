"use server"

import { Appointment } from "@/lib/appointments"
import { address, phone } from "@/app/config/address"

// Email notification function
// For production, integrate with SendGrid, Resend, or similar
export async function sendConfirmationEmail(appointment: Appointment): Promise<boolean> {
  try {
    // Example: Using a hypothetical email service
    // In production, replace with your email provider's SDK
    console.log(`📧 Sending confirmation email to ${appointment.email}`)

    const emailContent = `
Dear ${appointment.name},

Your barber appointment has been confirmed!

📅 Date: ${new Date(appointment.date).toLocaleDateString()}
⏰ Time: ${appointment.time}
✂️ Service: ${appointment.service}
📍 Location: ${address.street}, ${address.city}, ${address.country}

Duration: ${appointment.duration} minutes

If you need to reschedule or cancel, please call us at ${phone} or reply to this email.

See you soon!
Barber Shop Team
    `.trim()

    // Placeholder for actual email sending
    // Example: await sendgrid.send({ to: appointment.email, html: emailContent })

    return true
  } catch (error) {
    console.error("Failed to send email:", error)
    return false
  }
}

// SMS/WhatsApp notification function
// For production, integrate with Twilio, MessageBird, or similar
export async function sendConfirmationSMS(appointment: Appointment): Promise<boolean> {
  try {
    // Example: Using a hypothetical SMS service
    console.log(`📱 Sending WhatsApp/SMS to ${appointment.phone}`)

    const smsContent = `Hi ${appointment.name}, your barber appointment is confirmed! 
📅 ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time}
✂️ ${appointment.service} (${appointment.duration} min)
📍 ${address.street}, ${address.city}, ${address.country}

Call ${phone} to reschedule. See you soon! - Barber Shop`

    // Placeholder for actual SMS/WhatsApp sending
    // Example: await twilio.messages.create({ to: appointment.phone, body: smsContent })

    return true
  } catch (error) {
    console.error("Failed to send SMS:", error)
    return false
  }
}

// Send cancellation notice
export async function sendCancellationNotice(appointment: Appointment): Promise<boolean> {
  try {
    console.log(
      `❌ Sending cancellation notice to ${appointment.email} and ${appointment.phone}`
    )

    const emailContent = `
Dear ${appointment.name},

Unfortunately, your requested appointment time on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time} is no longer available.

Please visit our booking page to choose another time that works for you:
https://barbershop.com/reserve

Or call us at ${phone}.

We look forward to seeing you!
Barber Shop Team
    `.trim()

    // Send both email and SMS
    // await sendgrid.send({ to: appointment.email, html: emailContent })
    // await twilio.messages.create({ to: appointment.phone, body: "Your requested time slot is no longer available. Please choose another time." })

    return true
  } catch (error) {
    console.error("Failed to send cancellation notice:", error)
    return false
  }
}
