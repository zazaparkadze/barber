/* import { Scissors } from "lucide-react" */
import ServiceInfo from "./service-info"
import Images from "next/image"

export default function Service({ services }: { services: Service[] }) {
  return (
    <div className="space-y-16">
      {services[0].images[0].includes("api") &&
        services.map((service, index) => (
          <section
            key={service.id}
            className={`grid gap-8 lg:grid-cols-2 lg:items-center text-xl ${
              index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            <ServiceInfo service={service} index={index} />
            {/* Service Images */}
            <div
              className={`grid gap-4 sm:grid-cols-3 text-xl ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
            >
              {service.images.map((image, imageIndex) => {
               
                return (
                  <div
                    key={imageIndex}
                    className="aspect-3/4 overflow-auto rounded-[1.5rem] border border-white/10 bg-slate-900/50 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.5)]"
                  >
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-800 to-slate-900 text-center text-slate-400">
                      <Images
                        src={image}
                        alt={`${service.name} style ${imageIndex + 1}`}
                        width={400}
                        height={500}
                        unoptimized
                        className="object-cover object-center text-xl"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      {services[0].images[0].includes("images") &&
        services.map((service, index) => (
          <section
            key={service.id}
            className={`grid content-center gap-8 lg:grid-cols-2 lg:items-center ${
              index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            <ServiceInfo service={service} index={index} />
            {/* Service Images */}
            <div
              className={`grid gap-4 sm:grid-cols-3 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
            >
              {service.images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="aspect-4/4 w-45 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/50 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.5)]"
                >
                  <Images
                    src={image}
                    alt={`${service.name} style ${imageIndex + 1}`}
                    width={400}
                    height={500}
                    className="object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
    </div>
  )
}
