import { phone } from "@/app/config/address"
import { resend } from "@/lib/resend"

// Send cancellation notice
export async function sendCancellationNotice(appointment: Appointment): Promise<boolean> {
  try {

    resend.emails.send({
        from: "Barber Shop <onboarding@resend.dev>",
      /* to: appointment.email, */
      to: "zaza.parkadze@gmail.com",
      cc: "zaza.parkadze@gmail.com",
      subject: "Appointment Confirmation",
      text: `
Dear ${appointment.name},

Unfortunately, your requested appointment time on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.time} is no longer available.

Please visit our booking page to choose another time that works for you:
https://barbershop.com/reserve

Or call us at ${phone}.

We look forward to seeing you!
Barber Shop Team
    `.trim()
    })
    console.log(
      `❌ Sending cancellation notice to ${appointment.email} and ${appointment.phone}`
    )

    // Send both email and SMS
    // await sendgrid.send({ to: appointment.email, html: emailContent })
    // await twilio.messages.create({ to: appointment.phone, body: "Your requested time slot is no longer available. Please choose another time." })

    return true
  } catch (error) {
    console.error("Failed to send cancellation notice:", error)
    return false
  }
}