import Link from "next/link"
import ReservationForm from "@/components/reservation-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ReservePage() {
  return (
    <main className="min-h-screen  bg-slate-900 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),
    _transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.16),
    _transparent_35%),linear-gradient(180deg,#0b1122_0%,#02040d_100%)] text-white">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_-60px_rgba(255,255,255,0.15)] backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-300/80">Reserve your seat</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Secure your next appointment with ease.
            </h1>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
            </Link>
          </Button>
        </div>
        <ReservationForm />
      </div>
    </main>
  )
}
