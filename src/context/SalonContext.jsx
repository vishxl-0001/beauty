import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  businessDetails as initialBusinessDetails,
  salonServices as initialServices,
  testimonials as initialTestimonials,
  salonHours as initialHours,
  salonStats as initialStats,
} from '../data/content';
import { galleryItems as initialGallery } from '../data/images';

const SalonContext = createContext();

export function SalonProvider({ children }) {
  const [businessDetails, setBusinessDetails] = useState(initialBusinessDetails);
  const [services, setServices] = useState(initialServices);
  const [gallery, setGallery] = useState(initialGallery);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [salonHours, setSalonHours] = useState(initialHours);
  const [salonStats, setSalonStats] = useState(initialStats);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live data from backend API
  const refreshData = async () => {
    try {
      const res = await fetch('/api/public/data');
      if (res.ok) {
        const data = await res.json();
        if (data.businessDetails) setBusinessDetails(data.businessDetails);
        if (data.services && data.services.length > 0) setServices(data.services);
        if (data.gallery && data.gallery.length > 0) setGallery(data.gallery);
        if (data.testimonials && data.testimonials.length > 0) setTestimonials(data.testimonials);
        if (data.salonHours && data.salonHours.length > 0) setSalonHours(data.salonHours);
        if (data.salonStats && data.salonStats.length > 0) setSalonStats(data.salonStats);
      }
    } catch (err) {
      console.log('Backend not reachable or running in static mode, using default salon data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Submit appointment inquiry to backend
  const submitBooking = async (bookingData) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      return { success: res.ok, data };
    } catch (err) {
      console.warn('Booking API offline, falling back to front-end confirmation:', err);
      return { success: true, fallback: true };
    }
  };

  return (
    <SalonContext.Provider
      value={{
        businessDetails,
        services,
        gallery,
        testimonials,
        salonHours,
        salonStats,
        isLoading,
        refreshData,
        submitBooking,
      }}
    >
      {children}
    </SalonContext.Provider>
  );
}

export function useSalon() {
  return useContext(SalonContext);
}
