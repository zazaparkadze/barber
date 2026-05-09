"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Wallet, AlertCircle, Check, Loader2 } from "lucide-react"
import { SERVICE_DURATIONS } from "@/app/config/hours"
import {phone, address} from "@/app/config/address"

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  notes: string
}

interface AvailabilityResult {
  available: boolean
  duration: number
  message: string
}

interface AppointmentResponse {
  success?: boolean
  error?: string
  requiresReschedule?: boolean
  appointment?: {
    id: string
    name: string
    date: string
    time: string
    service: string
  }
  notifications?: {
    email: boolean
    sms: boolean
  }
  message?: string
}

export default function ReservationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "Classic Cut",
    date: "",
    time: "",
    notes: "",
  })

  const [availability, setAvailability] = useState<AvailabilityResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [appointmentResult, setAppointmentResult] = useState<AppointmentResponse | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const checkAvailability = async () => {
    if (!formData.date || !formData.time || !formData.service) {
      setError("Please fill in date, time, and service")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "check-availability",
          data: {
            date: formData.date,
            time: formData.time,
            service: formData.service,
          },
        }),
      })

      const data: AvailabilityResult = await response.json()
      setAvailability(data)

      if (!data.available) {
        setError(data.message)
      }
    } catch (err) {
      setError("Failed to check availability. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.date || !formData.time) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-appointment",
          data: formData,
        }),
      })

      const result: AppointmentResponse = await response.json()

      if (response.status === 409) {
        setError(result.error || "Time slot is no longer available. Please choose another time.")
        setFormData((prev) => ({ ...prev, date: "", time: "" }))
        setAvailability(null)
      } else if (!response.ok) {
        setError(result.error || "Failed to create appointment")
      } else {
        setAppointmentResult(result)
        setSubmitted(true)
      }
    } catch (err) {
      setError("Failed to create appointment. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Success state
  if (submitted && appointmentResult?.success) {
    return (
      <div className="rounded-[2rem] border border-green-400/30 bg-green-950/30 p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)]">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-400/20 text-green-300">
            <Check className="h-6 w-6" />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-green-200">Appointment confirmed!</h2>
              <p className="mt-2 text-green-300/80">{appointmentResult.message}</p>
            </div>

            <div className="space-y-3 rounded-[1.75rem] bg-green-950/50 p-4 text-sm text-green-200">
              <p>
                <strong>Name:</strong> {appointmentResult.appointment?.name}
              </p>
              <p>
                <strong>Date:</strong> {new Date(appointmentResult.appointment?.date || "").toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {appointmentResult.appointment?.time}
              </p>
              <p>
                <strong>Service:</strong> {appointmentResult.appointment?.service}
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm text-green-300/80 sm:flex-row">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Email sent
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" /> WhatsApp confirmation sent
              </span>
            </div>

            <Button
              onClick={() => {
                setSubmitted(false)
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  service: "Classic Cut",
                  date: "",
                  time: "",
                  notes: "",
                })
                setAvailability(null)
              }}
              className="mt-4 bg-green-400 text-slate-950 hover:bg-green-300"
            >
              Make another appointment
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_0.6fr]">
      <section className="space-y-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-300/80">Booking details</p>
          <p className="text-lg leading-8 text-slate-300">
            Choose a time, select a service, and leave any special notes for your barber. We&apos;ll confirm your reservation and make sure everything is ready when you arrive.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-[1.75rem] bg-slate-950/75 p-6 ring-1 ring-white/10">
          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 rounded-[1.5rem] border border-red-400/30 bg-red-950/30 p-4 text-red-200">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">{error}</p>
                {error.includes("no longer available") && (
                  <p className="mt-1 text-sm text-red-300/80">
                    Please choose a different date or time.
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              Name *
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/60"
                required
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              Phone *
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={phone}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/60"
                required
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              Email *
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/60"
                required
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              Service *
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-amber-400/60"
                required
              >
                {Object.keys(SERVICE_DURATIONS).map((service) => (
                  <option key={service} value={service}>
                    {service} ({SERVICE_DURATIONS[service]} min)
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              Date *
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-amber-400/60"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </label>

            <label className="space-y-2 text-sm text-slate-300">
              Time *
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-amber-400/60"
                required
              />
            </label>
          </div>

          {/* Availability Check Button */}
          <Button
            type="button"
            onClick={checkAvailability}
            disabled={loading || !formData.date || !formData.time}
            variant="outline"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Check availability"
            )}
          </Button>

          {/* Availability Status */}
          {availability && (
            <div
              className={`rounded-[1.5rem] border p-4 ${
                availability.available
                  ? "border-green-400/30 bg-green-950/30 text-green-200"
                  : "border-yellow-400/30 bg-yellow-950/30 text-yellow-200"
              }`}
            >
              <p className="font-semibold">{availability.message}</p>
              {availability.available && (
                <p className="mt-1 text-sm opacity-80">
                  Duration: {availability.duration} minutes
                </p>
              )}
            </div>
          )}

          <label className="space-y-2 text-sm text-slate-300">
            Notes (optional)
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              placeholder="Any preferences or requests"
              className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/60"
            />
          </label>

          <Button
            type="submit"
            disabled={loading || !availability?.available}
            className="w-full bg-amber-400 text-slate-950 hover:bg-amber-300 disabled:opacity-50"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
              </>
            ) : (
              "Confirm reservation"
            )}
          </Button>
        </form>
      </section>

      <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-300/80">
            Need help?
          </p>
          <p className="text-lg text-slate-300">
            Call us or message ahead if you need a same-day appointment or want
            a barber recommendation.
          </p>
        </div>
        <div className="space-y-5 rounded-[1.75rem] bg-slate-900/90 p-6 ring-1 ring-white/10">
          <div className="flex items-center gap-3 text-slate-300">
            <MapPin className="h-5 w-5 text-amber-300" />
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Location
              </p>
              <p>{address.street}, {address.city}, {address.country}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Phone className="h-5 w-5 text-amber-300" />
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Phone
              </p>
              <p>{phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Wallet className="h-5 w-5 text-amber-300" />
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Deposit
              </p>
              <p>Secure your appointment with a small deposit at the shop.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 rounded-[1.75rem] border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-200">
          <p className="font-semibold">📞 Service Durations:</p>
          <ul className="space-y-1 text-xs">
            {Object.entries(SERVICE_DURATIONS).map(([service, duration]) => (
              <li key={service}>
                {service}: {duration} min
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
