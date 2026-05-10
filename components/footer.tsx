import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function Footer() {
  return (
    <section className="mt-20 rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 text-center shadow-[0_40px_120px_-60px_rgba(255,255,255,0.15)] backdrop-blur-lg">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
              <Star className="h-8 w-8" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Ready for your transformation?
              </h2>
              <p className="text-lg text-slate-300">
                Book your appointment today and experience the difference of
                professional barber services.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-amber-400 text-slate-950 hover:bg-amber-300"
              >
                <Link href="/reserve">Book your appointment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Learn more about us</Link>
              </Button>
            </div>
          </div>
        </section>
  )
}
