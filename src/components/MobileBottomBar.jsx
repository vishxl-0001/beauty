import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { businessDetails } from '../data/content';

export default function MobileBottomBar({ onBookClick }) {
  return (
    <nav
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#EADBBA] px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl shadow-amber-950/20"
    >
      <div className="grid grid-cols-4 gap-1 items-center">
        {/* Call Wendy */}
        <a
          href={`tel:${businessDetails.phoneRaw}`}
          aria-label="Call Wendy"
          className="flex flex-col items-center justify-center py-1 text-center text-[#251B12] hover:text-[#A67C1E] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#FAF5EA] border border-[#EADBBA] flex items-center justify-center mb-0.5">
            <Phone className="w-4 h-4 text-[#C9A24B]" />
          </div>
          <span className="text-[10px] font-medium tracking-tight">Call</span>
        </a>

        {/* WhatsApp / SMS */}
        <a
          href={`sms:${businessDetails.phoneRaw}?&body=Hi Wendy, I would like to inquire about booking a salon appointment at Norwen.`}
          aria-label="Send SMS to Norwen Salon"
          className="flex flex-col items-center justify-center py-1 text-center text-[#251B12] hover:text-[#A67C1E] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#FAF5EA] border border-[#EADBBA] flex items-center justify-center mb-0.5">
            <MessageCircle className="w-4 h-4 text-[#8C7355]" />
          </div>
          <span className="text-[10px] font-medium tracking-tight">SMS</span>
        </a>

        {/* Book Now (Hero CTA) */}
        <button
          type="button"
          onClick={onBookClick}
          aria-label="Book salon appointment"
          className="flex flex-col items-center justify-center py-1 text-center group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#B38728] text-white flex items-center justify-center mb-0.5 shadow-md shadow-[#C9A24B]/30 group-active:scale-90 transition-transform">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#A67C1E] tracking-tight">Book</span>
        </button>

        {/* Instagram Profile */}
        <a
          href={businessDetails.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Norwen Salon on Instagram"
          className="flex flex-col items-center justify-center py-1 text-center text-[#251B12] hover:text-[#A67C1E] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#FAF5EA] border border-[#EADBBA] flex items-center justify-center mb-0.5">
            <InstagramIcon className="w-4 h-4 text-[#C9A24B]" />
          </div>
          <span className="text-[10px] font-medium tracking-tight">Instagram</span>
        </a>
      </div>
    </nav>
  );
}
