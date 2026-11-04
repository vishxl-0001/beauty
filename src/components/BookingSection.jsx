import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle2, Heart, AlertCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSalon } from '../context/SalonContext';

// Smart service title resolver to guarantee 100% auto-fill for any clicked card or look
const resolveServiceTitle = (inputTitle, availableServices = []) => {
  if (!inputTitle || typeof inputTitle !== 'string') return '';
  const clean = inputTitle.trim().toLowerCase();

  // 1. Direct exact match
  const exact = availableServices.find(
    (s) => s.title.toLowerCase() === clean || s.id.toLowerCase() === clean
  );
  if (exact) return exact.title;

  // 2. Intelligent keyword mapping for gallery looks / styles
  if (clean.includes('haircut') || clean.includes('cut') || clean.includes('blowout') || clean.includes('curling') || clean.includes('styling')) {
    const s = availableServices.find((x) => x.title.toLowerCase().includes('haircut'));
    if (s) return s.title;
  }
  if (clean.includes('color') || clean.includes('highlight') || clean.includes('balayage') || clean.includes('blonde') || clean.includes('violet') || clean.includes('emerald') || clean.includes('underlights')) {
    const s = availableServices.find((x) => x.title.toLowerCase().includes('color'));
    if (s) return s.title;
  }
  if (clean.includes('perm') || clean.includes('straight') || clean.includes('texture')) {
    const s = availableServices.find((x) => x.title.toLowerCase().includes('perm'));
    if (s) return s.title;
  }
  if (clean.includes('hair spa') || clean.includes('scalp') || clean.includes('basin')) {
    const s = availableServices.find((x) => x.title.toLowerCase().includes('spa'));
    if (s) return s.title;
  }
  if (clean.includes('keratin') || clean.includes('frizz') || clean.includes('protein smoothing')) {
    const s = availableServices.find((x) => x.title.toLowerCase().includes('keratin'));
    if (s) return s.title;
  }
  if (clean.includes('conditioning') || clean.includes('mask') || clean.includes('hydration')) {
    const s = availableServices.find((x) => x.title.toLowerCase().includes('conditioning'));
    if (s) return s.title;
  }
  if (clean.includes('threading') || clean.includes('brow') || clean.includes('facial hair')) {
    const s = availableServices.find((x) => x.title.toLowerCase().includes('threading'));
    if (s) return s.title;
  }
  if (clean.includes('waxing') || clean.includes('body care') || clean.includes('smooth skin')) {
    const s = availableServices.find((x) => x.title.toLowerCase().includes('waxing'));
    if (s) return s.title;
  }
  if (clean.includes('manicure') || clean.includes('pedicure') || clean.includes('nail') || clean.includes('french') || clean.includes('pearl')) {
    const s = availableServices.find((x) => x.title.toLowerCase().includes('manicure'));
    if (s) return s.title;
  }

  // Fallback to the exact title
  return inputTitle;
};

export default function BookingSection({ preSelectedService }) {
  const { services, businessDetails, submitBooking } = useSalon();
  const salonServices = services;
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    timeSlot: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill selected service whenever user selects any service anywhere
  useEffect(() => {
    if (preSelectedService) {
      const rawTitle =
        typeof preSelectedService === 'object' && preSelectedService !== null
          ? preSelectedService.title
          : preSelectedService;
      if (!rawTitle) return;

      const resolved = resolveServiceTitle(rawTitle, salonServices);
      setFormData((prev) => ({ ...prev, service: resolved }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next.service;
        return next;
      });

      // Scroll smoothly to booking
      const bookingEl = document.querySelector('#booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }

      // Automatically place cursor on Full Name so the user just types their details
      setTimeout(() => {
        const nameInput = document.querySelector('#booking-fullName');
        if (nameInput) {
          nameInput.focus();
        }
      }, 550);
    }
  }, [preSelectedService, salonServices]);

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '12:00 PM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM (Thu only)',
  ];

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your phone number';
    } else if (!/^[0-9+\s()-]{7,16}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format';
    }
    if (!formData.service) errs.service = 'Please choose a treatment';
    if (!formData.date) errs.date = 'Please select a preferred date';
    if (!formData.timeSlot) errs.timeSlot = 'Please select a preferred time slot';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // 1. Connect to backend API: POST /api/bookings
      await submitBooking(formData);

      // 2. Dispatch email to Wendy via Web3Forms
      const accessKey =
        businessDetails?.web3formsAccessKey ||
        import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (accessKey) {
        try {
          const web3Data = new FormData();
          web3Data.append('access_key', accessKey);
          web3Data.append('subject', `✨ New Salon Appointment Request: ${formData.service} - ${formData.fullName}`);
          web3Data.append('from_name', 'Norwen Beauty Salon Bookings');
          web3Data.append('replyto', formData.email);
          web3Data.append('Client Name', formData.fullName);
          web3Data.append('Phone Number', formData.phone);
          web3Data.append('Email Address', formData.email);
          web3Data.append('Requested Treatment', formData.service);
          web3Data.append('Requested Date', formData.date);
          web3Data.append('Preferred Time Slot', formData.timeSlot);
          web3Data.append('Notes / Hair Goals', formData.notes || 'None specified');
          web3Data.append('Studio Location', '98 Napier Road, Terrace End, Palmerston North');

          const w3Res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: web3Data,
          });
          const w3Json = await w3Res.json();
          if (w3Json.success) {
            console.log('Web3Forms: Email dispatched successfully to Wendy!', w3Json);
          } else {
            console.warn('Web3Forms notice:', w3Json.message);
          }
        } catch (emailErr) {
          console.warn('Web3Forms email delivery notice:', emailErr);
        }
      } else {
        console.info('Web3Forms access key not set. Set it in Admin Dashboard Settings or .env');
      }

      // Trigger celebration confetti with royal gold & champagne colors
      try {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#C9A24B', '#E6C36E', '#B38728', '#FFFFFF'],
        });
      } catch (err) {
        // Fallback silently if canvas not supported
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Booking submission error:', err);
      setIsSubmitting(false);
      setIsSubmitted(true); // Still show user confirmation
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      timeSlot: '',
      notes: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="booking" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EA] to-[#FFFDF9]">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#EADBBA]/50 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#F6EBDD]/60 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EA] border border-[#EADBBA] text-xs font-semibold text-[#A67C1E] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Reserve Your Salon Chair</span>
          </div>

          <h2 className="text-fluid-h2 font-display font-medium text-[#251B12] tracking-tight mb-4">
            Book Your Appointment
          </h2>

          <p className="text-sm sm:text-base text-[#251B12]/75 leading-relaxed font-normal">
            Take a moment for yourself. Choose your desired treatment and date, and Wendy will reach out to confirm your booking and welcome you.
          </p>
        </div>

        {/* Main Booking Container */}
        <div className="relative rounded-3xl glass-panel p-6 sm:p-10 md:p-12 border border-[#EADBBA] shadow-2xl shadow-amber-950/5">
          {/* Subtle top brand decoration */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#EADBBA]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EA] border border-[#EADBBA] flex items-center justify-center p-1">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-display font-semibold text-base text-[#251B12]">
                  Norwen Beauty Salon
                </p>
                <p className="text-xs text-[#8C7355]">Terrace End, Palmerston North</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#A67C1E] font-semibold bg-[#FAF5EA] px-3 py-1 rounded-full border border-[#EADBBA]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Glow Up With Us</span>
            </div>
          </div>

          {/* Auto-filled service notification chip */}
          {formData.service && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-3.5 rounded-2xl bg-[#FAF5EA] border border-[#EADBBA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <span className="text-xs sm:text-sm text-[#251B12]">
                  Auto-Filled Treatment:{' '}
                  <strong className="text-[#A67C1E] font-semibold">{formData.service}</strong>
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#8C7355]">
                ✓ Service selected — enter your details below to confirm
              </span>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="booking-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                {/* Row 1: Full Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="booking-fullName"
                      className="block text-xs font-semibold text-[#251B12] uppercase tracking-wider mb-2"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7355]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="booking-fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: null });
                        }}
                        placeholder="e.g. Jessica Smith"
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#251B12] placeholder-[#251B12]/40 focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#EADBBA] focus:ring-[#C9A24B]/30 focus:border-[#C9A24B]'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-xs font-semibold text-[#251B12] uppercase tracking-wider mb-2"
                    >
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7355]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="booking-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: null });
                        }}
                        placeholder="e.g. +64 21 000 0000"
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#251B12] placeholder-[#251B12]/40 focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#EADBBA] focus:ring-[#C9A24B]/30 focus:border-[#C9A24B]'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Service */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-xs font-semibold text-[#251B12] uppercase tracking-wider mb-2"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7355]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="booking-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: null });
                        }}
                        placeholder="e.g. jessica@example.co.nz"
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#251B12] placeholder-[#251B12]/40 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#EADBBA] focus:ring-[#C9A24B]/30 focus:border-[#C9A24B]'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-service"
                      className="block text-xs font-semibold text-[#251B12] uppercase tracking-wider mb-2"
                    >
                      Select Treatment *
                    </label>
                    <div className="relative">
                      <select
                        id="booking-service"
                        value={formData.service}
                        onChange={(e) => {
                          setFormData({ ...formData, service: e.target.value });
                          if (errors.service) setErrors({ ...errors, service: null });
                        }}
                        className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#251B12] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                          errors.service
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#EADBBA] focus:ring-[#C9A24B]/30 focus:border-[#C9A24B]'
                        }`}
                      >
                        <option value="">-- Choose a Service --</option>
                        {salonServices.map((svc) => (
                          <option key={svc.id} value={svc.title}>
                            {svc.title} ({svc.price})
                          </option>
                        ))}
                        {/* If a custom look was pre-selected, dynamically display it as valid option */}
                        {formData.service &&
                          !salonServices.some((s) => s.title === formData.service) && (
                            <option value={formData.service}>{formData.service}</option>
                          )}
                        <option value="Custom Consultation & Styling">
                          Custom Consultation & Styling (Tailored)
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#8C7355]">
                        ▼
                      </div>
                    </div>
                    {errors.service && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.service}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Preferred Date & Time Slot */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-xs font-semibold text-[#251B12] uppercase tracking-wider mb-2"
                    >
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7355]">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        id="booking-date"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (errors.date) setErrors({ ...errors, date: null });
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#251B12] focus:outline-none focus:ring-2 transition-all ${
                          errors.date
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#EADBBA] focus:ring-[#C9A24B]/30 focus:border-[#C9A24B]'
                        }`}
                      />
                    </div>
                    {errors.date && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.date}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-timeSlot"
                      className="block text-xs font-semibold text-[#251B12] uppercase tracking-wider mb-2"
                    >
                      Preferred Time Slot *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C7355]">
                        <Clock className="w-4 h-4" />
                      </div>
                      <select
                        id="booking-timeSlot"
                        value={formData.timeSlot}
                        onChange={(e) => {
                          setFormData({ ...formData, timeSlot: e.target.value });
                          if (errors.timeSlot) setErrors({ ...errors, timeSlot: null });
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#251B12] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                          errors.timeSlot
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#EADBBA] focus:ring-[#C9A24B]/30 focus:border-[#C9A24B]'
                        }`}
                      >
                        <option value="">-- Choose a Time --</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#8C7355]">
                        ▼
                      </div>
                    </div>
                    {errors.timeSlot && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.timeSlot}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 4: Personal Notes or Hair Goals */}
                <div>
                  <label
                    htmlFor="booking-notes"
                    className="block text-xs font-semibold text-[#251B12] uppercase tracking-wider mb-2"
                  >
                    Special Requests or Hair Goals (Optional)
                  </label>
                  <textarea
                    id="booking-notes"
                    rows="3"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell Wendy about your hair length, previous color treatments, or any special requests..."
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#EADBBA] text-sm text-[#251B12] placeholder-[#251B12]/40 focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/30 focus:border-[#C9A24B] transition-all"
                  />
                </div>

                {/* Submit Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-[#8C7355] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>No deposit required today. Wendy will contact you to confirm.</span>
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFB76C] to-[#B38728] text-white font-semibold text-sm shadow-lg shadow-[#C9A24B]/25 hover:shadow-xl hover:shadow-[#C9A24B]/35 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Booking Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Success Confirmation Card */
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#FAF5EA] border-2 border-[#C9A24B] flex items-center justify-center mb-6 shadow-lg shadow-[#C9A24B]/20">
                  <CheckCircle2 className="w-10 h-10 text-[#C9A24B] animate-pulse" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#A67C1E] mb-1">
                  Booking Request Received!
                </span>

                <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#251B12] mb-3">
                  Thank You, {formData.fullName}!
                </h3>

                <p className="text-sm sm:text-base text-[#251B12]/80 max-w-lg mb-6 leading-relaxed font-normal">
                  Your appointment inquiry for <strong className="text-[#A67C1E]">{formData.service}</strong> on{' '}
                  <span className="font-semibold text-[#251B12]">{formData.date}</span> at{' '}
                  <span className="font-semibold text-[#251B12]">{formData.timeSlot}</span> has been received. Wendy will review your slot and contact you shortly at{' '}
                  <span className="underline font-medium text-[#251B12]">{formData.phone}</span>.
                </p>

                <div className="p-4 rounded-2xl bg-white border border-[#EADBBA] max-w-md w-full text-left text-xs text-[#251B12] space-y-1.5 mb-8 shadow-xs">
                  <p className="font-semibold text-[#A67C1E]">✦ Next Steps:</p>
                  <p>1. Keep your phone handy for a quick SMS / Call confirmation.</p>
                  <p>2. Salon address: 98 Napier Road, Terrace End, Palmerston North.</p>
                  <p>3. If you need urgent changes, call Wendy directly at {businessDetails.phone}.</p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-white border border-[#EADBBA] text-[#251B12] text-xs font-semibold hover:border-[#C9A24B] transition-all shadow-xs"
                >
                  Book Another Appointment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
