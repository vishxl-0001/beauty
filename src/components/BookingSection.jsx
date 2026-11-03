import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle2, Heart, AlertCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { salonServices, businessDetails } from '../data/content';
import { salonImages } from '../data/images';

export default function BookingSection({ preSelectedService }) {
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

  // Update selected service when prop changes
  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, service: preSelectedService }));
      // Scroll smoothly to booking if requested
      const bookingEl = document.querySelector('#booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preSelectedService]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate front-end validation & submission delay
    setTimeout(() => {
      // TODO: connect to backend/email service (e.g. Cloudflare Worker, Resend, or booking API)
      console.log('Front-end booking inquiry submitted:', formData);

      // Trigger celebration confetti with pink, rose gold & gold colors
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E65D73', '#C9A24B', '#F8A5B2', '#D9A58B', '#FFFFFF'],
        });
      } catch (err) {
        // Fallback silently if canvas not supported
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
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
    <section id="booking" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#FFFDFB] via-[#FFF5F7] to-[#FFFDFB]">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#F8E1E4]/50 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#F6EBDD]/60 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F3] border border-[#F8E1E4] text-xs font-semibold text-[#E65D73] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Reserve Your Salon Chair</span>
          </div>

          <h2 className="text-fluid-h2 font-display font-medium text-[#3B2230] tracking-tight mb-4">
            Book Your Appointment
          </h2>

          <p className="text-sm sm:text-base text-[#3B2230]/75 leading-relaxed font-normal">
            Take a moment for yourself. Choose your desired treatment and date, and Wendyl will reach out to confirm your booking and welcome you.
          </p>
        </div>

        {/* Main Booking Container */}
        <div className="relative rounded-3xl glass-panel p-6 sm:p-10 md:p-12 border border-[#F8E1E4] shadow-2xl shadow-rose-950/5">
          {/* Subtle top brand decoration */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#F8E1E4]/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFF0F3] border border-[#F8E1E4] flex items-center justify-center p-1">
                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-display font-semibold text-base text-[#3B2230]">
                  Norwen Beauty Salon
                </p>
                <p className="text-xs text-[#B76E79]">Terrace End, Palmerston North</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#E65D73] font-medium bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#F8E1E4]">
              <Heart className="w-3.5 h-3.5 fill-[#E65D73]" />
              <span>Glow Up With Us</span>
            </div>
          </div>

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
                    <label className="block text-xs font-semibold text-[#3B2230] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B76E79]">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: null });
                        }}
                        placeholder="e.g. Jessica Smith"
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#3B2230] placeholder-[#3B2230]/40 focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#F8E1E4] focus:ring-[#E65D73]/30 focus:border-[#E65D73]'
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
                    <label className="block text-xs font-semibold text-[#3B2230] uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B76E79]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: null });
                        }}
                        placeholder="e.g. +64 21 000 0000"
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#3B2230] placeholder-[#3B2230]/40 focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#F8E1E4] focus:ring-[#E65D73]/30 focus:border-[#E65D73]'
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
                    <label className="block text-xs font-semibold text-[#3B2230] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B76E79]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: null });
                        }}
                        placeholder="e.g. jessica@example.co.nz"
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#3B2230] placeholder-[#3B2230]/40 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#F8E1E4] focus:ring-[#E65D73]/30 focus:border-[#E65D73]'
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
                    <label className="block text-xs font-semibold text-[#3B2230] uppercase tracking-wider mb-2">
                      Select Treatment *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => {
                          setFormData({ ...formData, service: e.target.value });
                          if (errors.service) setErrors({ ...errors, service: null });
                        }}
                        className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm text-[#3B2230] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                          errors.service
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#F8E1E4] focus:ring-[#E65D73]/30 focus:border-[#E65D73]'
                        }`}
                      >
                        <option value="">-- Choose a Service --</option>
                        {salonServices.map((svc) => (
                          <option key={svc.id} value={svc.title}>
                            {svc.title} ({svc.price})
                          </option>
                        ))}
                        <option value="Custom Consultation & Styling">
                          Custom Consultation & Styling (Tailored)
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#B76E79]">
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
                    <label className="block text-xs font-semibold text-[#3B2230] uppercase tracking-wider mb-2">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B76E79]">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          if (errors.date) setErrors({ ...errors, date: null });
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#3B2230] focus:outline-none focus:ring-2 transition-all ${
                          errors.date
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#F8E1E4] focus:ring-[#E65D73]/30 focus:border-[#E65D73]'
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
                    <label className="block text-xs font-semibold text-[#3B2230] uppercase tracking-wider mb-2">
                      Preferred Time Slot *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B76E79]">
                        <Clock className="w-4 h-4" />
                      </div>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => {
                          setFormData({ ...formData, timeSlot: e.target.value });
                          if (errors.timeSlot) setErrors({ ...errors, timeSlot: null });
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white border text-sm text-[#3B2230] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                          errors.timeSlot
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-[#F8E1E4] focus:ring-[#E65D73]/30 focus:border-[#E65D73]'
                        }`}
                      >
                        <option value="">-- Choose a Time --</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#B76E79]">
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

                {/* Notes / Inspiration */}
                <div>
                  <label className="block text-xs font-semibold text-[#3B2230] uppercase tracking-wider mb-2">
                    Notes or Style Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell Wendyl about your hair length, prior color treatments, or nail inspiration..."
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#F8E1E4] text-sm text-[#3B2230] placeholder-[#3B2230]/40 focus:outline-none focus:ring-2 focus:ring-[#E65D73]/30 focus:border-[#E65D73] transition-all"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-[#B76E79] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>No pre-payment required for booking requests</span>
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-gradient-to-r from-[#E65D73] via-[#D97D8D] to-[#C9A24B] text-white font-semibold text-sm shadow-lg shadow-[#E65D73]/25 hover:shadow-xl hover:shadow-[#E65D73]/35 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Reserving your spot...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Submit Booking Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Success State Screen */
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#FFF0F3] border-2 border-[#E65D73] flex items-center justify-center mb-6 shadow-lg shadow-[#E65D73]/20">
                  <CheckCircle2 className="w-10 h-10 text-[#E65D73] animate-pulse" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[#E65D73] mb-1">
                  Request Received
                </span>

                <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#3B2230] mb-3">
                  Thank You, {formData.fullName}!
                </h3>

                <p className="text-sm sm:text-base text-[#3B2230]/80 max-w-lg mb-6 leading-relaxed font-normal">
                  Your appointment inquiry for <strong className="text-[#E65D73]">{formData.service}</strong> on{' '}
                  <strong>{formData.date}</strong> at <strong>{formData.timeSlot}</strong> has been received. Wendyl will reach out directly to confirm your booking!
                </p>

                <div className="p-4 rounded-2xl bg-white border border-[#F8E1E4] max-w-md w-full text-left text-xs text-[#3B2230] space-y-1.5 mb-8 shadow-xs">
                  <p><strong>Confirmation Contact:</strong> {formData.phone} • {formData.email}</p>
                  <p><strong>Salon Address:</strong> {businessDetails.address}</p>
                  <p><strong>Owner:</strong> Wendyl Tagaan ({businessDetails.phone})</p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-white border border-[#F8E1E4] text-[#3B2230] text-xs font-semibold hover:border-[#E65D73] transition-all shadow-xs"
                >
                  Book Another Treatment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
