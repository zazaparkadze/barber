'use client'

import { address } from '@/app/config/address'

export default function DirectionsMap() {
  const encodedAddress = encodeURIComponent(
    `${address.street}, ${address.city}, ${address.country}`
  )

  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.8263842088606!2d34.85706!3d31.96239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151daa7e0a0a0a0b%3A0x1234567890abcdef!2s${encodedAddress}!5e0!3m2!1sen!2s!4v1234567890`

  return (
    <div className="w-full rounded-[1.5rem] overflow-hidden border border-white/10 shadow-lg">
      <iframe
        src={embedUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Barber Shop Location"
      />
    </div>
  )
}

