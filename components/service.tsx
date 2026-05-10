import { Scissors } from "lucide-react"
import ServiceInfo from "./service-info"

export default function Service({ services }: { services: Service[] }) {
  return (
    <div className="space-y-16">
      {services.map((service, index) => (
        <section
          key={service.id}
          className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
            index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Service Info */}
         <ServiceInfo service={service} index={index} />
          {/* Service Images */}
          <div
            className={`grid gap-4 sm:grid-cols-3 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
          >
             
            {service.images.map((image, imageIndex) => (
                <div
                key={imageIndex}
                className="aspect-3/4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/50 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.5)]"
                >
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-800 to-slate-900">
                  <div className="text-center text-slate-400">
                    <Scissors className="mx-auto mb-2 h-8 w-8" />
                    <p className="text-xs tracking-wider uppercase">
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
  )
}
