'use client'

import { useEffect, useState } from 'react'
import { Appointment } from '@/lib/appointments'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/appointments', {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch appointments')
      }

      const data = await response.json()
      setAppointments(data.appointments || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAppointment = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) {
      return
    }

    try {
      setDeleting(id)
      const response = await fetch('/api/appointments', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete appointment')
      }

      setAppointments(appointments.filter((appt) => appt.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete appointment')
      console.error('Error deleting appointment:', err)
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl">Loading appointments...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage all appointments</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-xl">
          {appointments.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No appointments found
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-gray-700 border-b border-gray-600">
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
                  <TableRow key={appointment.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <TableCell className="text-sm">{appointment.id}</TableCell>
                    <TableCell className="text-sm">{appointment.name}</TableCell>
                    <TableCell className="text-sm text-blue-400">{appointment.email}</TableCell>
                    <TableCell className="text-sm">{appointment.phone}</TableCell>
                    <TableCell className="text-sm text-amber-400">{appointment.service}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(appointment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm font-medium">{appointment.time}</TableCell>
                    <TableCell className="text-sm">{appointment.duration} min</TableCell>
                    <TableCell className="text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                          appointment.confirmed
                            ? 'bg-green-900/50 text-green-300 border border-green-700'
                            : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                        }`}
                      >
                        {appointment.confirmed ? '✓ Confirmed' : '⏳ Pending'}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      <Button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        disabled={deleting === appointment.id}
                        variant="destructive"
                        size="sm"
                      >
                        {deleting === appointment.id ? 'Deleting...' : 'Delete'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="mt-6 text-gray-400 text-sm">
          Total appointments: <span className="font-semibold text-white">{appointments.length}</span>
        </div>
      </div>
    </div>
  )
}
