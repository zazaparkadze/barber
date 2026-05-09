import Link from "next/link"
import { Button } from "@/components/ui/button"
import { address, phone, email } from "@/app/config/address"
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Scissors,
  Sparkles,
} from "lucide-react"

export default function Page() {
  return (
    <main
      // className="min-h-screen bg-[linear-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.16),_transparent_35%),linear-gradient(180deg,#0b1122_0%,#02040d_100%)] text-white">
      className="min-h-screen text-white"
      style={{
        background: `
      linear-gradient(circle at top, rgba(255,255,255,0.08), transparent 50%),
      radial-gradient(circle at bottom right, rgba(251,191,36,0.16), transparent 35%),
      linear-gradient(180deg, #0b1122 0%, #02040d 100%)
    `,
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-8 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm tracking-[0.32em] text-amber-300/80 uppercase">
              Barber Shop
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Crafting sharp looks with precision and polish.
            </h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-400 text-slate-950 hover:bg-amber-300"
            >
              <Link href="/reserve">Book now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Admin</Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-2 text-sm font-semibold tracking-[0.24em] text-amber-200 uppercase">
              premium cut + grooming
            </span>
            <div className="space-y-5">
              <h2 className="text-5xl leading-tight font-semibold tracking-tight text-white sm:text-6xl">
                Your next cut should feel effortless and look unforgettable.
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                Discover modern barber services in a relaxed, refined
                space—sharp fades, precise beard work, and grooming that keeps
                you looking polished all week.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-amber-400 text-slate-950 hover:bg-amber-300"
              >
                <Link href="/reserve">Reserve a seat</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">Services</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_120px_-60px_rgba(255,255,255,0.2)] backdrop-blur-xl">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-400/15 text-amber-200">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm tracking-[0.24em] text-slate-400 uppercase">
                  Signature service
                </p>
                <p className="text-xl font-semibold text-white">
                  The Classic Cut
                </p>
              </div>
            </div>
            <ul className="mt-8 space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                Precision fade or scissor cut shaped to your signature style.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                Full finish with hot towel shave, beard trim, and styling.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
                Relaxed lounge atmosphere with premium product touches.
              </li>
            </ul>
            <div className="mt-8 rounded-3xl bg-white/5 p-6 text-slate-200 ring-1 ring-white/10">
              <p className="text-sm tracking-[0.2em] text-slate-400 uppercase">
                Open daily
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                9 AM — 8 PM
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Walk-ins welcome. Appointments recommended.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pb-10 md:grid-cols-3">
          {[
            {
              title: "Haircuts",
              description:
                "Modern fades, skin tapers, scissor cuts, and tailored styling shaped to your face.",
            },
            {
              title: "Beard & Shaves",
              description:
                "Precision beard sculpting, hot towel shaves, and grooming packages for a polished finish.",
            },
            {
              title: "Grooming",
              description:
                "Product recommendations, detailing, and maintenance advice for your best look.",
            },
          ].map((service) => (
            <article
              key={service.title}
              className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-amber-400/20 hover:bg-slate-950"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-400/15 text-amber-300">
                <Scissors className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-slate-400">{service.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 sm:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-sm tracking-[0.24em] text-amber-300/80 uppercase">
              About Barber Shop
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              A modern grooming destination with a classic feel.
            </h2>
            <p className="max-w-xl leading-8 text-slate-300">
              We combine experienced barbers, premium tools, and a relaxed
              setting to deliver sharp results you can feel confident in. Every
              visit is designed around comfort, precise service, and personal
              attention.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-[1.75rem] bg-slate-950/75 p-8 text-slate-300 ring-1 ring-white/10">
            <div className="space-y-2">
              <p className="text-sm tracking-[0.24em] text-slate-400 uppercase">
                Address
              </p>
              <p>
                {address.street}, {address.city}, {address.country}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm tracking-[0.24em] text-slate-400 uppercase">
                Call
              </p>
              <p>{phone}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm tracking-[0.24em] text-slate-400 uppercase">
                Email
              </p>
              <p>{email}</p>
            </div>
            <Button
              className="mt-4 w-full justify-center gap-2 bg-amber-400 text-slate-950 hover:bg-amber-300"
              size="lg"
            >
              Get directions <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <footer className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Barber Shop. Crafted for confidence.</p>
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
            <span className="inline-flex items-center gap-2 text-slate-300">
              <MapPin className="h-4 w-4" /> {address.street}, {address.city}
            </span>
            <span className="inline-flex items-center gap-2 text-slate-300">
              <CalendarDays className="h-4 w-4" /> Open daily 9 AM — 8 PM
            </span>
          </div>
        </footer>
      </div>
    </main>
  )
}
