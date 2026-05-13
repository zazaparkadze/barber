import { services } from "@/app/config/services"
import { services_new } from "@/app/config/services-new"
import Header from "@/components/services-header"
import Footer from "@/components/footer"
import Service from "@/components/service"

export default function ServicesPage() {
  return (
    <main className="bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_ transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.16),_transparent_35%), linear-gradient(180deg,#0b1122_0%,#02040d_100%)] min-h-screen text-white text-3xl">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <Header />
        {/* Services Grid */}
        <div className="space-y-16 text-2xl">
          <Service services={services} />
          <Service services={services_new} />
        </div>
        {/* Call to Action */}
        <Footer />
      </div>
    </main>
  )
}
