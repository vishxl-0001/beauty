import React from 'react';
import { Phone, Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { businessDetails } from '../data/content';

export default function MobileBottomBar({ onBookClick }) {
  return (
    <aside
      aria-label="Mobile quick action navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/92 backdrop-blur-xl border-t border-[#F8E1E4] px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl shadow-rose-950/20"
    >
      <div className="grid grid-cols-4 gap-2 items-center max-w-md mx-auto">
        {/* 1. Quick Call */}
        <a
          href={`tel:${businessDetails.phoneRaw}`}
          className="flex flex-col items-center justify-center py-1 text-center text-[#3B2230] hover:text-[#E65D73] transition-colors"
          aria-label="Call salon directly"
        >
          <div className="w-10 h-10 rounded-full bg-[#FFF0F3] border border-[#F8E1E4] flex items-center justify-center mb-0.5">
            <Phone className="w-4 h-4 text-[#E65D73]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Call</span>
        </a>

        {/* 2. Message / SMS */}
        <a
          href={`sms:${businessDetails.phoneRaw}?body=Hi%20Wendyl,%20I'd%20like%20to%20inquire%20about%20a%20salon%20appointment`}
          className="flex flex-col items-center justify-center py-1 text-center text-[#3B2230] hover:text-[#E65D73] transition-colors"
          aria-label="Send SMS message to salon"
        >
          <div className="w-10 h-10 rounded-full bg-[#FFF0F3] border border-[#F8E1E4] flex items-center justify-center mb-0.5">
            <MessageCircle className="w-4 h-4 text-[#B76E79]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Message</span>
        </a>

        {/* 3. Book Now (Hero CTA) */}
        <button
          type="button"
          onClick={onBookClick}
          className="flex flex-col items-center justify-center py-1 text-center group"
          aria-label="Book appointment now"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E65D73] to-[#C9A24B] text-white flex items-center justify-center mb-0.5 shadow-md shadow-[#E65D73]/30 group-active:scale-90 transition-transform">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#E65D73] tracking-tight">Book</span>
        </button>

        {/* 4. Instagram */}
        <a
          href={businessDetails.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-center text-[#3B2230] hover:text-[#E65D73] transition-colors"
          aria-label="View salon Instagram profile"
        >
          <div className="w-10 h-10 rounded-full bg-[#FFF0F3] border border-[#F8E1E4] flex items-center justify-center mb-0.5">
            <InstagramIcon className="w-4 h-4 text-[#E65D73]" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Instagram</span>
        </a>
      </div>
    </aside>
  );
}
