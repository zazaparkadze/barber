"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, AlertCircle, Loader2 } from "lucide-react"
import { phone, address } from "@/app/config/address"
import { getAppointmentDateTime } from "@/lib/appointments"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"


interface FormData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  notes: string
}

export default function CancellationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "Classic Cut",
    date: "",
    time: "",
    notes: "",
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
 
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmitForCancellation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }
    /// find an appointment with the same details

    const foundAppointment = await getAppointmentDateTime(
      formData.date,
      formData.time
    )
    if (!foundAppointment) {
      setError("No appointment found with the provided date and time.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: foundAppointment?.id,
        }),
      })

      if (!response) {
        setError("not deleted, internal server error.")
        setFormData((prev) => ({ ...prev, date: "", time: "" }))
      } else {
        setSubmitted(true)
        setFormData((prev) => ({ ...prev, date: "", time: "", name: "", email: "", phone: "" }))
      }
    } catch (err) {
      setError("Failed to find appointment. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[0.9fr_0.6fr]">
      <section className="space-y-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)]">
        <div className="space-y-4">
          <p className="text-sm tracking-[0.24em] text-amber-300/80 uppercase">
            Previous Booking details
          </p>
          <p className="text-lg leading-8 text-slate-300">
            Fill out the form bellow, Press on Cancellation Button.
          </p>
        </div>
        {submitted && (
          <div className="flex items-start gap-3 rounded-[1.5rem] border border-green-400/30 bg-green-950/30 p-4 text-green-200">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Your appointment has been cancelled.</p>
            </div>
          </div>
        )}
        <form
          onSubmit={handleSubmitForCancellation}
          className="space-y-6 rounded-[1.75rem] bg-slate-950/75 p-6 ring-1 ring-white/10"
        >
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
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white transition outline-none placeholder:text-slate-500 focus:border-amber-400/60"
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
                placeholder={"your phone"}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white transition outline-none placeholder:text-slate-500 focus:border-amber-400/60"
                required
              />
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
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white transition outline-none focus:border-amber-400/60"
                //min={new Date().toISOString().split("T")[0]}
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
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white transition outline-none focus:border-amber-400/60"
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
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white transition outline-none placeholder:text-slate-500 focus:border-amber-400/60"
                required
              />
            </label>
          </div>

          <Button
            type="submit"
            /* disabled={!foundAppointment} */
            className="w-full bg-amber-400 text-slate-950 hover:bg-amber-300 disabled:opacity-50"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
              </>
            ) : (
              "Confirm Cancellation"
            )}
          </Button>
        </form>
      </section>

      <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)]">
        <div className="space-y-4">
          <p className="text-sm tracking-[0.24em] text-amber-300/80 uppercase">
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
              <p className="text-sm tracking-[0.24em] text-slate-400 uppercase">
                Location
              </p>
              <p>
                {address.street}, {address.city}, {address.country}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Phone className="h-5 w-5 text-amber-300" />
            <div>
              <p className="text-sm tracking-[0.24em] text-slate-400 uppercase">
                Phone
              </p>
              <p>{phone}</p>
            </div>
          </div>
        </div>
        <Button
          asChild
          size="lg"
          className="w-full bg-amber-400 text-slate-950 hover:bg-amber-300 disabled:opacity-50"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
        </Button>
      </aside>
    </div>
  )
}
