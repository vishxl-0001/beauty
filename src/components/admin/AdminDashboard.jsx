import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  DollarSign,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  LogOut,
  Upload,
  Sparkles,
  Heart,
  X,
  AlertCircle,
  Eye,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';

export default function AdminDashboard({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [businessDetails, setBusinessDetails] = useState(null);
  const [salonHours, setSalonHours] = useState([]);
  const [salonStats, setSalonStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Modals & form states
  const [editingService, setEditingService] = useState(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [bookingFilter, setBookingFilter] = useState('all');
  const [bookingSearch, setBookingSearch] = useState('');

  // Password change state
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordMsg, setPasswordMsg] = useState({ text: '', isError: false });

  // Upload file state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState('');
  const [newGalleryData, setNewGalleryData] = useState({
    title: '',
    categoryName: 'Hair & Color',
    filter: 'hair',
    subtitle: '',
    badge: 'New Style',
  });

  const fileInputRef = useRef(null);
  const serviceFileInputRef = useRef(null);

  // Helper for auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('norwen_admin_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch all admin data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [pubRes, bksRes] = await Promise.all([
        fetch('/api/public/data'),
        fetch('/api/admin/bookings', { credentials: 'include', headers: getAuthHeaders() }),
      ]);

      if (pubRes.ok) {
        const pubData = await pubRes.json();
        setServices(pubData.services || []);
        setGallery(pubData.gallery || []);
        setTestimonials(pubData.testimonials || []);
        setBusinessDetails(pubData.businessDetails || {});
        setSalonHours(pubData.salonHours || []);
        setSalonStats(pubData.salonStats || []);
      }

      if (bksRes.ok) {
        const bksData = await bksRes.json();
        setBookings(bksData.bookings || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      showToast('Failed to load live data from backend', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --------------------------------------------------------------------------
  // BOOKINGS ACTIONS
  // --------------------------------------------------------------------------
  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
        showToast(`Booking marked as ${status}`);
      }
    } catch (err) {
      showToast('Failed to update booking status', 'error');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        showToast('Booking deleted');
      }
    } catch (err) {
      showToast('Failed to delete booking', 'error');
    }
  };

  // --------------------------------------------------------------------------
  // SERVICES ACTIONS
  // --------------------------------------------------------------------------
  const handleSaveService = async (serviceData, isNew = false) => {
    try {
      const url = isNew ? '/api/admin/services' : `/api/admin/services/${serviceData.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(serviceData),
      });

      if (res.ok) {
        const data = await res.json();
        if (isNew) {
          setServices((prev) => [...prev, data.service]);
          setIsAddingService(false);
          showToast('New service added successfully');
        } else {
          setServices((prev) => prev.map((s) => (s.id === serviceData.id ? data.service : s)));
          setEditingService(null);
          showToast('Service updated successfully');
        }
      } else {
        showToast('Failed to save service', 'error');
      }
    } catch (err) {
      showToast('Error saving service', 'error');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        showToast('Service removed');
      }
    } catch (err) {
      showToast('Failed to delete service', 'error');
    }
  };

  // --------------------------------------------------------------------------
  // GALLERY ACTIONS & UPLOADS
  // --------------------------------------------------------------------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadAndAddToGallery = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      showToast('Please select an image file to upload', 'error');
      return;
    }
    if (!newGalleryData.title.trim()) {
      showToast('Please provide a title for the photo', 'error');
      return;
    }

    try {
      // 1. Upload photo to server
      const formData = new FormData();
      formData.append('photo', uploadFile);

      const token = localStorage.getItem('norwen_admin_token');
      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!uploadRes.ok) {
        showToast('Photo upload failed', 'error');
        return;
      }

      const uploadResult = await uploadRes.json();
      const imageUrl = uploadResult.url;

      // 2. Add to Gallery database
      const galRes = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          src: imageUrl,
          title: newGalleryData.title,
          categoryName: newGalleryData.categoryName,
          filter: newGalleryData.filter,
          subtitle: newGalleryData.subtitle,
          badge: newGalleryData.badge,
        }),
      });

      if (galRes.ok) {
        const galResult = await galRes.json();
        setGallery((prev) => [galResult.item, ...prev]);
        setIsAddingGallery(false);
        setUploadFile(null);
        setUploadPreview('');
        setNewGalleryData({
          title: '',
          categoryName: 'Hair & Color',
          filter: 'hair',
          subtitle: '',
          badge: 'New Style',
        });
        showToast('Photo uploaded and published to gallery!');
      }
    } catch (err) {
      showToast('Error uploading photo', 'error');
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!window.confirm('Delete this photo from the gallery?')) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setGallery((prev) => prev.filter((g) => g.id !== id));
        showToast('Photo deleted from gallery');
      }
    } catch (err) {
      showToast('Failed to delete photo', 'error');
    }
  };

  // --------------------------------------------------------------------------
  // SETTINGS & PASSWORD ACTIONS
  // --------------------------------------------------------------------------
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/business', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          businessDetails,
          salonHours,
          salonStats,
        }),
      });
      if (res.ok) {
        showToast('Business details & opening hours saved!');
      } else {
        showToast('Failed to save settings', 'error');
      }
    } catch (err) {
      showToast('Error saving settings', 'error');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg({ text: '', isError: false });

    if (passwordForm.newPass !== passwordForm.confirm) {
      setPasswordMsg({ text: 'New passwords do not match.', isError: true });
      return;
    }
    if (passwordForm.newPass.length < 6) {
      setPasswordMsg({ text: 'New password must be at least 6 characters.', isError: true });
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          currentPassword: passwordForm.current,
          newPassword: passwordForm.newPass,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordMsg({ text: 'Password successfully updated!', isError: false });
        setPasswordForm({ current: '', newPass: '', confirm: '' });
        showToast('Password changed successfully');
      } else {
        setPasswordMsg({ text: data.error || 'Failed to update password', isError: true });
      }
    } catch (err) {
      setPasswordMsg({ text: 'Error connecting to server', isError: true });
    }
  };

  // Filtered bookings
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = bookingFilter === 'all' || b.status === bookingFilter;
    const matchesSearch =
      b.fullName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.service.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.phone.includes(bookingSearch);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#251B12] flex flex-col">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold ${
              toast.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-[#251B12] text-white border border-[#C9A24B]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C9A24B]" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#EADBBA] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#C9A24B] to-[#C9A24B]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1">
              <img src="/images/logo.png" alt="Norwen" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-semibold text-lg sm:text-xl text-[#251B12] leading-none">
                Norwen Admin Panel
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF5EA] text-[#C9A24B] border border-[#EADBBA]">
                Live Control
              </span>
            </div>
            <p className="text-[11px] text-[#8C7355]">Logged in as Wendyl Tagaan</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchData}
            title="Refresh live data"
            className="p-2 rounded-xl bg-white border border-[#EADBBA] text-[#251B12] hover:text-[#C9A24B] hover:border-[#C9A24B] transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EADBBA] text-xs font-semibold text-[#251B12] hover:border-[#C9A24B] transition-all shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className="hidden sm:inline">View Website</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-semibold text-red-600 transition-colors shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#EADBBA] mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'bookings'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-white shadow-md shadow-[#C9A24B]/20'
                : 'bg-white text-[#251B12] hover:bg-[#FAF5EA] border border-[#EADBBA]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Bookings & Inquiries</span>
            {pendingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-[#C9A24B] font-bold text-[10px] flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-white shadow-md shadow-[#C9A24B]/20'
                : 'bg-white text-[#251B12] hover:bg-[#FAF5EA] border border-[#EADBBA]'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Services & Pricing</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-black/10">
              {services.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-white shadow-md shadow-[#C9A24B]/20'
                : 'bg-white text-[#251B12] hover:bg-[#FAF5EA] border border-[#EADBBA]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery & Photos</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-black/10">
              {gallery.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-white shadow-md shadow-[#C9A24B]/20'
                : 'bg-white text-[#251B12] hover:bg-[#FAF5EA] border border-[#EADBBA]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Salon Details & Hours</span>
          </button>
        </div>

        {/* ================================================================== */}
        {/* TAB 1: BOOKINGS & INQUIRIES */}
        {/* ================================================================== */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Top filter & search bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setBookingFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      bookingFilter === filter
                        ? 'bg-[#251B12] text-white'
                        : 'bg-white border border-[#EADBBA] text-[#251B12] hover:bg-[#FAF5EA]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-[#8C7355] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  placeholder="Search guest or phone..."
                  className="pl-9 pr-4 py-2 rounded-xl bg-white border border-[#EADBBA] text-xs text-[#251B12] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/30 w-full sm:w-60"
                />
              </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#EADBBA]">
                <Calendar className="w-12 h-12 text-[#8C7355]/40 mx-auto mb-3" />
                <h3 className="font-display text-xl font-semibold text-[#251B12]">
                  No Bookings Found
                </h3>
                <p className="text-xs text-[#8C7355] mt-1">
                  Inquiries submitted from the website booking form will appear here in real-time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-3xl bg-white border border-[#EADBBA] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                  >
                    <div>
                      {/* Status header */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {b.status}
                        </span>
                        <span className="text-[11px] text-[#8C7355]">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Guest name & treatment */}
                      <h3 className="font-display text-xl font-semibold text-[#251B12]">
                        {b.fullName}
                      </h3>
                      <p className="text-xs font-semibold text-[#C9A24B] mt-0.5">{b.service}</p>

                      {/* Date & Time */}
                      <div className="flex items-center gap-3 mt-3 text-xs text-[#251B12]/80">
                        <div className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#8C7355]" />
                          <span>{b.date}</span>
                        </div>
                        <div className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#8C7355]" />
                          <span>{b.timeSlot}</span>
                        </div>
                      </div>

                      {/* Contact row */}
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                        <a
                          href={`tel:${b.phone}`}
                          className="flex items-center gap-1 text-[#251B12] hover:text-[#C9A24B] font-medium"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
                          <span>{b.phone}</span>
                        </a>
                        <a
                          href={`mailto:${b.email}`}
                          className="flex items-center gap-1 text-[#251B12] hover:text-[#C9A24B]"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#C9A24B]" />
                          <span>{b.email}</span>
                        </a>
                      </div>

                      {/* Notes if any */}
                      {b.notes && (
                        <div className="mt-3 p-2.5 rounded-xl bg-[#FAF7EE] border border-[#EADBBA] text-xs text-[#251B12]/80">
                          <strong className="text-[#251B12]">Note:</strong> {b.notes}
                        </div>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="pt-3 border-t border-[#EADBBA] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {b.status !== 'confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {b.status !== 'completed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors"
                          >
                            Done
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                            className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteBooking(b.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: SERVICES & PRICING */}
        {/* ================================================================== */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#251B12]">
                  Services & Menu Pricing
                </h2>
                <p className="text-xs text-[#8C7355]">
                  Update starting prices, descriptions, and duration shown on the website.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingService(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="rounded-3xl bg-white border border-[#EADBBA] p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3 bg-[#EADBBA]/30">
                      <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-black/60">
                        {svc.badge}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-[#8C7355] uppercase">
                        {svc.category}
                      </span>
                      <span className="font-display font-bold text-lg text-[#C9A24B]">
                        {svc.price}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-lg text-[#251B12] leading-snug">
                      {svc.title}
                    </h3>

                    <p className="text-xs text-[#251B12]/75 line-clamp-2 mt-1">
                      {svc.description}
                    </p>

                    <div className="mt-3 pt-2 border-t border-[#EADBBA] text-[11px] text-[#8C7355]">
                      ⏱ Duration: <strong>{svc.duration}</strong>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EADBBA] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setEditingService(svc)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FAF5EA] text-xs font-semibold text-[#C9A24B] hover:bg-[#FAF5EA]"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Price & Info</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteService(svc.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                      title="Delete service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: GALLERY & PHOTO UPLOAD */}
        {/* ================================================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#251B12]">
                  Gallery Portfolio & Photo Manager
                </h2>
                <p className="text-xs text-[#8C7355]">
                  Upload new hairstyle or nail art photos from your device, or manage existing lookbook shots.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingGallery(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New Photo</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white border border-[#EADBBA] p-3 shadow-xs flex flex-col justify-between group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-2 bg-[#EADBBA]/30">
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white bg-black/60">
                      {item.categoryName}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-semibold text-sm text-[#251B12] leading-tight line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#8C7355] line-clamp-1 mt-0.5">
                      {item.subtitle || item.badge}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-[#EADBBA] flex items-center justify-between">
                    <span className="text-[10px] text-[#8C7355]">
                      {item.src.startsWith('/uploads/') ? 'Custom Upload' : 'Default Asset'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="p-1 rounded-lg text-red-500 hover:bg-red-50"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: SALON DETAILS & HOURS */}
        {/* ================================================================== */}
        {activeTab === 'settings' && businessDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Business Details & Hours */}
            <form onSubmit={handleSaveSettings} className="lg:col-span-8 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-[#EADBBA] shadow-xs space-y-4">
                <h3 className="font-display text-xl font-semibold text-[#251B12] mb-2">
                  Salon Contact & Location Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#251B12] uppercase mb-1">
                      Salon Name
                    </label>
                    <input
                      type="text"
                      value={businessDetails.name || ''}
                      onChange={(e) =>
                        setBusinessDetails({ ...businessDetails, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs text-[#251B12]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#251B12] uppercase mb-1">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      value={businessDetails.owner || ''}
                      onChange={(e) =>
                        setBusinessDetails({ ...businessDetails, owner: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs text-[#251B12]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#251B12] uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={businessDetails.phone || ''}
                      onChange={(e) =>
                        setBusinessDetails({
                          ...businessDetails,
                          phone: e.target.value,
                          phoneRaw: e.target.value.replace(/\s+/g, ''),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs text-[#251B12]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#251B12] uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={businessDetails.email || ''}
                      onChange={(e) =>
                        setBusinessDetails({ ...businessDetails, email: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs text-[#251B12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#251B12] uppercase mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={businessDetails.address || ''}
                    onChange={(e) =>
                      setBusinessDetails({ ...businessDetails, address: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs text-[#251B12]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#251B12] uppercase mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={businessDetails.instagram || ''}
                    onChange={(e) =>
                      setBusinessDetails({ ...businessDetails, instagram: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs text-[#251B12]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#251B12] uppercase">
                      Web3Forms Access Key (Instant Booking Email to Wendy)
                    </label>
                    <a
                      href="https://web3forms.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-[#A67C1E] hover:underline"
                    >
                      Get Free Key at web3forms.com ↗
                    </a>
                  </div>
                  <input
                    type="text"
                    value={businessDetails.web3formsAccessKey || ''}
                    onChange={(e) =>
                      setBusinessDetails({
                        ...businessDetails,
                        web3formsAccessKey: e.target.value.trim(),
                      })
                    }
                    placeholder="e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs font-mono text-[#251B12] bg-[#FAF5EA]/50"
                  />
                  <p className="text-[11px] text-[#8C7355] mt-1">
                    Enter the access key for Wendy's email ({businessDetails.email || 'wendylsoriano51@gmail.com'}). Every appointment booking submitted by clients will automatically be emailed to her!
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#251B12] uppercase mb-1">
                    Subheadline Tagline
                  </label>
                  <textarea
                    rows={2}
                    value={businessDetails.subheadline || ''}
                    onChange={(e) =>
                      setBusinessDetails({ ...businessDetails, subheadline: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs text-[#251B12]"
                  />
                </div>
              </div>

              {/* Opening Hours Table */}
              <div className="p-6 rounded-3xl bg-white border border-[#EADBBA] shadow-xs space-y-4">
                <h3 className="font-display text-xl font-semibold text-[#251B12]">
                  Opening Hours Schedule
                </h3>

                <div className="space-y-3">
                  {salonHours.map((slot, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <input
                        type="text"
                        value={slot.days}
                        onChange={(e) => {
                          const updated = [...salonHours];
                          updated[idx].days = e.target.value;
                          setSalonHours(updated);
                        }}
                        className="px-3 py-2 rounded-xl border border-[#EADBBA] text-xs text-[#251B12]"
                      />
                      <input
                        type="text"
                        value={slot.hours}
                        onChange={(e) => {
                          const updated = [...salonHours];
                          updated[idx].hours = e.target.value;
                          setSalonHours(updated);
                        }}
                        className="px-3 py-2 rounded-xl border border-[#EADBBA] text-xs text-[#251B12]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
              >
                Save All Salon Details
              </button>
            </form>

            {/* Right Column: Password Security Overhaul */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-[#EADBBA] shadow-xs space-y-4">
                <h3 className="font-display text-xl font-semibold text-[#251B12]">
                  Change Admin Password
                </h3>
                <p className="text-xs text-[#8C7355]">
                  Update your admin dashboard password securely.
                </p>

                {passwordMsg.text && (
                  <div
                    className={`p-3 rounded-xl text-xs ${
                      passwordMsg.isError
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {passwordMsg.text}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#251B12] mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.current}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, current: e.target.value })
                      }
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#251B12] mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPass}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, newPass: e.target.value })
                      }
                      placeholder="Minimum 6 characters"
                      className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#251B12] mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirm}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, confirm: e.target.value })
                      }
                      placeholder="Repeat new password"
                      className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#251B12] text-white text-xs font-semibold hover:bg-[#C9A24B] transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* MODAL: ADD / EDIT SERVICE */}
      {/* ==================================================================== */}
      {(editingService || isAddingService) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EADBBA] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EADBBA]">
              <h3 className="font-display text-xl font-semibold text-[#251B12]">
                {isAddingService ? 'Add New Service' : 'Edit Service & Price'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingService(null);
                  setIsAddingService(false);
                }}
                className="p-1.5 text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const serviceData = {
                  ...(editingService || {}),
                  title: formData.get('title'),
                  category: formData.get('category'),
                  price: formData.get('price'),
                  duration: formData.get('duration'),
                  badge: formData.get('badge'),
                  image: formData.get('image') || '/images/hair2.jpg',
                  description: formData.get('description'),
                  perks: (formData.get('perks') || '').split(',').map((p) => p.trim()),
                };
                handleSaveService(serviceData, isAddingService);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#251B12] mb-1">
                  Service Title *
                </label>
                <input
                  name="title"
                  defaultValue={editingService?.title || ''}
                  placeholder="e.g. Honey Blonde Balayage & Foil"
                  className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#251B12] mb-1">
                    Price (starting rate) *
                  </label>
                  <input
                    name="price"
                    defaultValue={editingService?.price || 'from $'}
                    placeholder="e.g. from $195"
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#251B12] mb-1">Duration</label>
                  <input
                    name="duration"
                    defaultValue={editingService?.duration || '60 mins'}
                    placeholder="e.g. 2 - 3 hrs"
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#251B12] mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingService?.category || 'Hair & Color'}
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                  >
                    <option value="Hair & Color">Hair & Color</option>
                    <option value="Styling & Cuts">Styling & Cuts</option>
                    <option value="Natural Nail Care">Natural Nail Care</option>
                    <option value="Hair & Care">Hair & Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#251B12] mb-1">Badge</label>
                  <input
                    name="badge"
                    defaultValue={editingService?.badge || 'Popular'}
                    placeholder="e.g. Guest Favorite"
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#251B12] mb-1">Image URL</label>
                <input
                  name="image"
                  defaultValue={editingService?.image || '/images/hair2.jpg'}
                  placeholder="/images/hair2.jpg or /uploads/..."
                  className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#251B12] mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={2}
                  defaultValue={editingService?.description || ''}
                  placeholder="Detailed description of the salon treatment..."
                  className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#251B12] mb-1">
                  Perks (comma-separated)
                </label>
                <input
                  name="perks"
                  defaultValue={(editingService?.perks || []).join(', ')}
                  placeholder="Gloss toner included, Scalp massage, Bouncy finish"
                  className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                />
              </div>

              <div className="pt-3 border-t border-[#EADBBA] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    setIsAddingService(false);
                  }}
                  className="px-4 py-2 rounded-xl border border-[#EADBBA] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-white text-xs font-semibold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: UPLOAD PHOTO TO GALLERY */}
      {/* ==================================================================== */}
      {isAddingGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EADBBA]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EADBBA]">
              <h3 className="font-display text-xl font-semibold text-[#251B12]">
                Upload Photo to Gallery
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddingGallery(false);
                  setUploadFile(null);
                  setUploadPreview('');
                }}
                className="p-1.5 text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadAndAddToGallery} className="space-y-4">
              {/* File upload drag/select box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-[#E6C36E] hover:border-[#C9A24B] rounded-2xl p-4 text-center transition-colors bg-[#FAF7EE]"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />

                {uploadPreview ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden mx-auto max-h-40">
                    <img src={uploadPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="py-6">
                    <Upload className="w-8 h-8 text-[#C9A24B] mx-auto mb-2 animate-bounce" />
                    <p className="text-xs font-semibold text-[#251B12]">
                      Click to choose an image from your device
                    </p>
                    <p className="text-[10px] text-[#8C7355] mt-1">PNG, JPG, or WebP up to 10MB</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#251B12] mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  value={newGalleryData.title}
                  onChange={(e) => setNewGalleryData({ ...newGalleryData, title: e.target.value })}
                  placeholder="e.g. Violet Money-Piece Balayage"
                  className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#251B12] mb-1">Category</label>
                  <select
                    value={newGalleryData.categoryName}
                    onChange={(e) => {
                      const val = e.target.value;
                      let filter = 'hair';
                      if (val.includes('Nail')) filter = 'nails';
                      else if (val.includes('Styling')) filter = 'styling';
                      else if (val.includes('Studio')) filter = 'studio';
                      setNewGalleryData({ ...newGalleryData, categoryName: val, filter });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                  >
                    <option value="Hair & Color">Hair & Color</option>
                    <option value="Styling & Cuts">Styling & Cuts</option>
                    <option value="Natural Nail Care">Natural Nail Care</option>
                    <option value="Studio & Team">Studio & Team</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#251B12] mb-1">Badge</label>
                  <input
                    type="text"
                    value={newGalleryData.badge}
                    onChange={(e) => setNewGalleryData({ ...newGalleryData, badge: e.target.value })}
                    placeholder="e.g. Trend Alert"
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#251B12] mb-1">
                  Subtitle / Notes
                </label>
                <input
                  type="text"
                  value={newGalleryData.subtitle}
                  onChange={(e) =>
                    setNewGalleryData({ ...newGalleryData, subtitle: e.target.value })
                  }
                  placeholder="Short description of the look..."
                  className="w-full px-3 py-2 rounded-xl border border-[#EADBBA] text-xs"
                />
              </div>

              <div className="pt-3 border-t border-[#EADBBA] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingGallery(false)}
                  className="px-4 py-2 rounded-xl border border-[#EADBBA] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-white text-xs font-semibold"
                >
                  Upload & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
