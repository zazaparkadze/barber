import { Clock, DollarSign, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServiceInfo({service, index}: {service: Service, index: number}) {
  return (
     <div
            className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-400/15 text-amber-300">
                  <Scissors className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-white">
                    {service.name}
                  </h2>
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

              <p className="max-w-xl text-lg leading-8 text-slate-300">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3 text-slate-300"
                  >
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
  )
}
