import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Sparkles, ExternalLink, Heart } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { useSalon } from '../context/SalonContext';
import { salonImages } from '../data/images';

export default function ContactLocation() {
  const { businessDetails, salonHours } = useSalon();
  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-white/70">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-[#EADBBA]/40 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EA] border border-[#EADBBA] text-xs font-semibold text-[#C9A24B] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Visit Our Studio</span>
          </div>

          <h2 className="text-fluid-h2 font-display font-medium text-[#251B12] tracking-tight mb-4">
            Find Us in Palmerston North
          </h2>

          <p className="text-sm sm:text-base text-[#251B12]/75 leading-relaxed font-normal">
            Located conveniently along Napier Road in Terrace End with ample street parking. Step inside our tranquil, fairy-lit salon space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Cards & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Info Card */}
            <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-[#EADBBA] space-y-5">
              <h3 className="font-display text-xl font-semibold text-[#251B12] flex items-center justify-between">
                <span>Salon Details</span>
                <span className="text-xs font-semibold text-[#8C7355] font-sans">Terrace End</span>
              </h3>

              {/* Phone */}
              <a
                href={`tel:${businessDetails.phoneRaw}`}
                className="group flex items-start gap-3.5 p-3 rounded-2xl bg-white hover:bg-[#FAF5EA] border border-[#EADBBA] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EA] border border-[#EADBBA] flex items-center justify-center shrink-0 text-[#C9A24B] group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#8C7355] uppercase tracking-wider block">
                    Phone / Call Studio
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-[#251B12] group-hover:text-[#C9A24B] transition-colors">
                    {businessDetails.phone}
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${businessDetails.email}`}
                className="group flex items-start gap-3.5 p-3 rounded-2xl bg-white hover:bg-[#FAF5EA] border border-[#EADBBA] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EA] border border-[#EADBBA] flex items-center justify-center shrink-0 text-[#C9A24B] group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[11px] font-semibold text-[#8C7355] uppercase tracking-wider block">
                    Email Inquiries
                  </span>
                  <span className="font-semibold text-xs sm:text-sm text-[#251B12] group-hover:text-[#C9A24B] transition-colors truncate block">
                    {businessDetails.email}
                  </span>
                </div>
              </a>

              {/* Physical Address */}
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-[#EADBBA]">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EA] border border-[#EADBBA] flex items-center justify-center shrink-0 text-[#C9A24B]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#8C7355] uppercase tracking-wider block">
                    Studio Location
                  </span>
                  <span className="font-medium text-xs sm:text-sm text-[#251B12] leading-snug block">
                    {businessDetails.address}
                  </span>
                </div>
              </div>

              {/* Instagram Follow Card */}
              <a
                href={businessDetails.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#DFB76C] to-[#B38728] text-white text-xs sm:text-sm font-semibold flex items-center justify-between shadow-md shadow-[#C9A24B]/20 hover:shadow-lg hover:shadow-[#C9A24B]/30 transition-all active:scale-98 group"
              >
                <div className="flex items-center gap-2">
                  <InstagramIcon className="w-4 h-4" />
                  <span>Follow {businessDetails.instagramHandle}</span>
                </div>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Opening Hours Card */}
            <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-[#EADBBA]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#251B12]">
                  <Clock className="w-4 h-4 text-[#C9A24B]" />
                  <h3 className="font-display text-lg font-semibold">Opening Hours</h3>
                </div>
                <span className="text-[10px] text-[#C9A24B] uppercase font-bold tracking-wider">
                  Weekly Schedule
                </span>
              </div>

              <div className="divide-y divide-[#EADBBA]/60 text-xs sm:text-sm">
                {salonHours.map((slot, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between">
                    <span className="text-[#251B12]/85 font-medium">{slot.days}</span>
                    <span className="font-semibold text-[#251B12]">{slot.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps & Storefront Photo Showcase */}
          <div className="lg:col-span-7 space-y-6">
            {/* Google Maps Embed */}
            <div className="rounded-3xl overflow-hidden glass-panel border border-[#EADBBA] shadow-xl p-2 relative">
              <div className="w-full h-[320px] sm:h-[380px] rounded-[22px] overflow-hidden bg-[#EADBBA]/30 relative">
                <iframe
                  title="Norwen Beauty Salon Google Maps Location"
                  src="https://maps.google.com/maps?q=98+Napier+Road,+Terrace+End,+Palmerston+North+4410,+New+Zealand&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Map Footer Bar */}
              <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0" />
                  <span className="font-semibold text-[#251B12]">
                    98 Napier Road, Terrace End, Palmerston North 4410
                  </span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=98+Napier+Road+Terrace+End+Palmerston+North`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A24B] hover:underline font-semibold flex items-center gap-1 shrink-0"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Storefront Authenticity Card with salon.jpg */}
            <div className="p-4 sm:p-5 rounded-3xl glass-panel border border-[#EADBBA] flex flex-col sm:flex-row items-center gap-5">
              <div className="w-full sm:w-44 h-28 rounded-2xl overflow-hidden shrink-0 border border-[#EADBBA] shadow-xs">
                <img
                  src={salonImages.storefront.src}
                  alt={salonImages.storefront.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C9A24B] mb-1">
                  <Heart className="w-3.5 h-3.5 fill-[#C9A24B]" />
                  <span>Welcome to Our Sanctuary</span>
                </div>
                <h4 className="font-display text-lg font-semibold text-[#251B12] leading-snug">
                  Look for the fairy-lit Norwen Salon sign
                </h4>
                <p className="text-xs text-[#251B12]/75 mt-1 leading-relaxed">
                  Step in and make yourself at home. Warm hospitality and custom care await you at 98 Napier Road.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
