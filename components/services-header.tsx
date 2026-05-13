import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Header() {
  return (
    <div className="mb-12 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_-60px_rgba(255,255,255,0.15)] backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm tracking-[0.24em] text-amber-300/80 uppercase">
          Our services
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Professional cuts and grooming services.
        </h1>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          asChild
          size="lg"
          className="bg-amber-400 text-slate-950 hover:bg-amber-300"
        >
          <Link href="/reserve">Book appointment</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
        </Button>
      </div>
    </div>
  )
}
