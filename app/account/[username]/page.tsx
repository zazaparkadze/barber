"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as React from "react"

export default function AdminPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = React.use(params)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [mess, setMess] = useState("No appointments found")

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/appointments", {
          method: "GET",
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch appointments")
        }

        const data = await response.json()

        if (data.reason === "roles") {
          setMess("you are not allowed to view this Information")
          return
        }
        setAppointments(data.appointments || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching appointments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const handleLogout = async () => {
    const response = await fetch("/api/logout")

    if (!response.ok) {
      return { message: "error in logging out" }
    }

    return response
  }

  const handleDeleteAppointment = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) {
      return
    }

    try {
      setDeleting(id)
      const response = await fetch("/api/appointments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete appointment")
      }

      setAppointments(appointments.filter((appt) => appt.id !== id))
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete appointment"
      )
      console.error("Error deleting appointment:", err)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-2xl">Loading appointments...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex w-full justify-between">
            <div className="text-xl text-amber-400">
              hello {username.charAt(0).toUpperCase() + username.slice(1)}
            </div>
            <h1 className="mb-2 text-4xl font-bold">Admin Dashboard</h1>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
              </Link>
            </Button>
          </div>
          <p className="text-gray-400">Manage all appointments</p>
        </div>
        {error && (
          <div className="mb-6 rounded-lg border border-red-700 bg-red-900/50 p-4 text-red-200">
            {error}
          </div>
        )}

        <div className="rounded-lg bg-gray-800 shadow-xl">
          {appointments.length === 0 ? (
            <div className="p-8 text-center text-gray-400">{mess}</div>
          ) : (
            <Table>
              <TableHeader className="border-b border-gray-600 bg-gray-700">
                <TableRow className="hover:bg-gray-700">
                  <TableHead className="text-left">ID</TableHead>
                  <TableHead className="text-left">Name</TableHead>
                  <TableHead className="text-left">Email</TableHead>
                  <TableHead className="text-left">Phone</TableHead>
                  <TableHead className="text-left">Service</TableHead>
                  <TableHead className="text-left">Date</TableHead>
                  <TableHead className="text-left">Time</TableHead>
                  <TableHead className="text-left">Duration</TableHead>
                  <TableHead className="text-left">Status</TableHead>
                  <TableHead className="text-left">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    className="border-b border-gray-700 transition-colors hover:bg-gray-700/50"
                  >
                    <TableCell className="text-sm">{appointment.id}</TableCell>
                    <TableCell className="text-sm">
                      {appointment.name}
                    </TableCell>
                    <TableCell className="text-sm text-blue-400">
                      {appointment.email}
                    </TableCell>
                    <TableCell className="text-sm">
                      {appointment.phone}
                    </TableCell>
                    <TableCell className="text-sm text-amber-400">
                      {appointment.service}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(appointment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {appointment.time}
                    </TableCell>
                    <TableCell className="text-sm">
                      {appointment.duration} min
                    </TableCell>
                    <TableCell className="text-sm">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          appointment.confirmed
                            ? "border border-green-700 bg-green-900/50 text-green-300"
                            : "border border-yellow-700 bg-yellow-900/50 text-yellow-300"
                        }`}
                      >
                        {appointment.confirmed ? "✓ Confirmed" : "⏳ Pending"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      <Button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        disabled={deleting === appointment.id}
                        variant="destructive"
                        size="sm"
                      >
                        {deleting === appointment.id ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="mt-6 flex w-full justify-between">
          <div className="block text-sm text-gray-400">
            Total appointments:{" "}
            <span className="font-semibold text-white">
              {appointments.length}
            </span>
          </div>
          <Button asChild variant="outline" size="lg" onClick={handleLogout}>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> logout
            </Link>
          </Button>
        </div>

        <Button asChild variant="outline" size="lg">
            <Link href="/secret">
              <ArrowLeft className="mr-2 h-4 w-4" /> Secret
            </Link>
          </Button>
      </div>
    </div>
  )
}
