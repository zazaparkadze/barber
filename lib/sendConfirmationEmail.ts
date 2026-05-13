"use server"

import { resend } from "@/lib/resend"
import { address, phone } from "@/app/config/address"

export async function sendConfirmationEmail(
  appointment: Appointment
): Promise<boolean> {
  try {
    await resend.emails.send({
      from: "Barber Shop <onboarding@resend.dev>",
      /* to: appointment.email, */
      to: "zaza.parkadze@gmail.com",
      subject: "Appointment Confirmation",
      text: `
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
    `.trim(),
     /*  html: `
            <p>Dear ${appointment.name}, Thanks for choosing our services! Zaza!!!</p>
    `, */
    })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
