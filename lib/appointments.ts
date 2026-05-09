// Simple in-memory appointment store
// In production, use a database like PostgreSQL or MongoDB
import Appointment from "@/model/Appointment"
import connectDB from "./connectBD"

export interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  duration: number
  notes: string
  confirmed: boolean
  createdAt: Date
}

//const appointments: Appointment[] = []
const appointments: Appointment[] = []

export const SERVICE_DURATIONS: Record<string, number> = {
  "Classic Cut": 30,
  Fade: 30,
  "Beard Trim": 20,
  "Hot Towel Shave": 40,
  "Grooming Package": 60,
}

export const BUSINESS_HOURS = {
  open: 9, // 9 AM
  close: 20, // 8 PM
  breakStart: 13, // 1 PM
  breakEnd: 14, // 2 PM
}

export function isSlotAvailable(
  date: string,
  time: string,
  duration: number
): boolean {
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
  connectDB() // Ensure DB connection is established
  const new_appointment: Appointment = {
    id: Date.now().toString(),
    ...appointmentData,
    confirmed: false,
    createdAt: new Date(),
  }

  const appointment = await Appointment.create(new_appointment)
  return appointment
}

export async function confirmAppointment(
  id: string
): Promise<Appointment | null> {
  connectDB() // Ensure DB connection is established
  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { confirmed: true },
    { new: true }
  )
  return appointment || null
}

export async function getAppointment(id: string): Promise<Appointment | null> {
  connectDB() // Ensure DB connection is established
  const appointment = await Appointment.findById(id)
  return appointment || null
}

export async function getAllAppointments(): Promise<Appointment[]> {
  connectDB() // Ensure DB connection is established
  const appointments = await Appointment.find().sort({ createdAt: -1 }).exec()
  return appointments
}
