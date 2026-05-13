// Simple in-memory appointment store
// In production, use a database like PostgreSQL or MongoDB
'use server'
import Appointment from "@/model/Appointment"
import connectDB from "./connectBD"
import { BUSINESS_HOURS } from "@/app/config/hours"

export async function isSlotAvailable(
  date: string,
  time: string,
  duration: number
): Promise<boolean> {
  const [hours, minutes] = time.split(":").map(Number)
  const slotStartTime = hours * 60 + minutes
  const slotEndTime = slotStartTime + duration

  // Check business hours
  if (
    hours < BUSINESS_HOURS.open ||
    hours >= BUSINESS_HOURS.close ||
    (hours === BUSINESS_HOURS.close - 1 && minutes > 0)
  ) {
    return false
  }

  // Check break time
  if (
    slotStartTime >= BUSINESS_HOURS.breakStart * 60 &&
    slotStartTime < BUSINESS_HOURS.breakEnd * 60
  ) {
    return false
  }

  // Check for conflicting appointments
  await connectDB() // Ensure DB connection is established
  const appointments: Appointment[] = await Appointment.find().sort({ createdAt: -1 }).exec()
  const conflictingAppointment = appointments.find((appt) => {
    if (appt.date !== date || !appt.confirmed) return false

    const apptStartTime =
      parseInt(appt.time.split(":")[0]) * 60 + parseInt(appt.time.split(":")[1])
    const apptEndTime = apptStartTime + appt.duration

    // Check if times overlap
    return slotStartTime < apptEndTime && slotEndTime > apptStartTime
  })

  return !conflictingAppointment
}

export async function createAppointment(
  appointmentData: Omit<Appointment, "id" | "confirmed" | "createdAt">
): Promise<Appointment> {
  await connectDB() // Ensure DB connection is established
  const appointments = await Appointment.find({}).lean() // Get current count for ID generation
  const new_appointment: Appointment = {
    id: appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 1,
    ...appointmentData,
    confirmed: false,
    createdAt: new Date(),
  }

  const appointment = await Appointment.create(new_appointment)
  return appointment
}

export async function confirmAppointment(
  id: number
): Promise<Appointment | null> {
  await connectDB() // Ensure DB connection is established
  const appointment = await Appointment.findOneAndUpdate(
    { id },
    { confirmed: true },
    {  returnDocument: "after" }
  )
  return appointment || null
}

export async function getAppointment(id: number): Promise<Appointment | null> {
  await connectDB() // Ensure DB connection is established
  const appointment: Appointment | null = await Appointment.findOne({ id })
  return appointment
}
export async function getAppointmentDateTime(date: string, time: string): Promise<Appointment | null> {
  await connectDB() // Ensure DB connection is established
  const appointment: Appointment | null = await Appointment.findOne({ date, time })
  return JSON.parse(JSON.stringify(appointment))
}

export async function getAllAppointments(): Promise<Appointment[]> {
  await connectDB() // Ensure DB connection is established
  const appointments: Appointment[] = await Appointment.find().sort({ createdAt: -1 }).exec()
  return appointments
}

export async function deleteAppointment(id: number): Promise<boolean> {
  await connectDB() // Ensure DB connection is established
  const result = await Appointment.deleteOne({ id })
  return result.deletedCount > 0
}
