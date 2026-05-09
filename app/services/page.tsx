import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, DollarSign, Scissors, Star } from "lucide-react"

const services = [
  {
    id: "classic-cut",
    name: "Classic Cut",
    price: "$35",
    duration: "30 min",
    description: "Traditional barber cut with precision fade, neck shave, and styling. Perfect for the timeless gentleman.",
    features: ["Precision fade", "Neck shave", "Hot towel finish", "Styling"],
    images: [
      "/api/placeholder/400/500?style=classic-1",
      "/api/placeholder/400/500?style=classic-2",
      "/api/placeholder/400/500?style=classic-3"
    ]
  },
  {
    id: "fade",
    name: "Fade",
    price: "$40",
    duration: "30 min",
    description: "Modern fade with clean lines and tapered sides. Available in various lengths and styles.",
    features: ["Custom fade", "Tapered sides", "Clean lines", "Modern styling"],
    images: [
      "/api/placeholder/400/500?style=fade-1",
      "/api/placeholder/400/500?style=fade-2",
      "/api/placeholder/400/500?style=fade-3"
    ]
  },
  {
    id: "beard-trim",
    name: "Beard Trim",
    price: "$25",
    duration: "20 min",
    description: "Professional beard sculpting and maintenance. Includes hot towel treatment and beard oil.",
    features: ["Beard sculpting", "Hot towel", "Beard oil", "Maintenance advice"],
    images: [
      "/api/placeholder/400/500?style=beard-1",
      "/api/placeholder/400/500?style=beard-2",
      "/api/placeholder/400/500?style=beard-3"
    ]
  },
  {
    id: "hot-towel-shave",
    name: "Hot Towel Shave",
    price: "$45",
    duration: "40 min",
    description: "Luxurious straight razor shave with hot towel treatment. The ultimate grooming experience.",
    features: ["Straight razor", "Hot towel", "Premium products", "Relaxing experience"],
    images: [
      "/api/placeholder/400/500?style=shave-1",
      "/api/placeholder/400/500?style=shave-2",
      "/api/placeholder/400/500?style=shave-3"
    ]
  },
  {
    id: "grooming-package",
    name: "Grooming Package",
    price: "$75",
    duration: "60 min",
    description: "Complete grooming experience including haircut, beard trim, and facial treatment.",
    features: ["Full haircut", "Beard trim", "Facial treatment", "Premium products"],
    images: [
      "/api/placeholder/400/500?style=package-1",
      "/api/placeholder/400/500?style=package-2",
      "/api/placeholder/400/500?style=package-3"
    ]
  }
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_
    transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.16),_transparent_35%),
    linear-gradient(180deg,#0b1122_0%,#02040d_100%)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_-60px_rgba(255,255,255,0.15)] backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-300/80">Our services</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Professional cuts and grooming services.
            </h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="bg-amber-400 text-slate-950 hover:bg-amber-300">
              <Link href="/reserve">Book appointment</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
              </Link>
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <section
              key={service.id}
              className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Service Info */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-400/15 text-amber-300">
                      <Scissors className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-semibold text-white">{service.name}</h2>
                      <div className="flex items-center gap-4 text-slate-400">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {service.price}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {service.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg leading-8 text-slate-300 max-w-xl">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-slate-300">
                        <div className="h-2 w-2 rounded-full bg-amber-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="bg-amber-400 text-slate-950 hover:bg-amber-300"
                >
                  <Link href={`/reserve?service=${service.id}`}>
                    Book {service.name}
                  </Link>
                </Button>
              </div>

              {/* Service Images */}
              <div className={`grid gap-4 sm:grid-cols-3 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                {service.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="aspect-3/4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/50 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.5)]"
                  >
                    <div className="h-full w-full bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <div className="text-center text-slate-400">
                        <Scissors className="mx-auto h-8 w-8 mb-2" />
                        <p className="text-xs uppercase tracking-wider">
                          {service.name}
                        </p>
                        <p className="text-xs opacity-75">Style {imageIndex + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action */}
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
                Book your appointment today and experience the difference of professional barber services.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-amber-400 text-slate-950 hover:bg-amber-300">
                <Link href="/reserve">Book your appointment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Learn more about us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}