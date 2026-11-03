import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getDB, saveDB } from './db.js';
import {
  hashPassword,
  comparePassword,
  generateToken,
  requireAdmin,
} from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const uploadsDir = path.join(projectRoot, 'public', 'uploads');

// Ensure uploads folder exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Static file serving for uploads and public images
app.use('/uploads', express.static(uploadsDir));
app.use('/images', express.static(path.join(projectRoot, 'public', 'images')));

// Multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|svg\+xml/;
    const mimeCheck = allowed.test(file.mimetype);
    const extCheck = allowed.test(path.extname(file.originalname).toLowerCase());
    if (mimeCheck || extCheck) {
      return cb(null, true);
    }
    cb(new Error('Only image files (JPG, PNG, WebP, GIF, SVG) are allowed'));
  },
});

// ============================================================================
// PUBLIC API ROUTES
// ============================================================================

/**
 * GET /api/public/data
 * Returns all active content (services, gallery, businessDetails, hours, etc.)
 */
app.get('/api/public/data', (req, res) => {
  try {
    const db = getDB();
    res.json({
      businessDetails: db.businessDetails,
      services: db.services,
      gallery: db.gallery,
      testimonials: db.testimonials,
      salonHours: db.salonHours,
      salonStats: db.salonStats,
    });
  } catch (err) {
    console.error('Failed to get public data:', err);
    res.status(500).json({ error: 'Failed to retrieve salon data' });
  }
});

/**
 * POST /api/bookings
 * Public submission of appointment inquiries
 */
app.post('/api/bookings', (req, res) => {
  try {
    const { fullName, phone, email, service, date, timeSlot, notes } = req.body;

    if (!fullName || !phone || !email || !service || !date || !timeSlot) {
      return res.status(400).json({ error: 'Please provide all required booking fields.' });
    }

    const db = getDB();
    const newBooking = {
      id: `bk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service: service.trim(),
      date,
      timeSlot,
      notes: (notes || '').trim(),
      status: 'pending', // pending, confirmed, completed, cancelled
      createdAt: new Date().toISOString(),
    };

    db.bookings = [newBooking, ...(db.bookings || [])];
    saveDB(db);

    res.status(201).json({
      success: true,
      message: 'Booking request received successfully',
      booking: newBooking,
    });
  } catch (err) {
    console.error('Failed to create booking:', err);
    res.status(500).json({ error: 'Internal server error processing booking' });
  }
});

// ============================================================================
// AUTHENTICATION ROUTES
// ============================================================================

/**
 * POST /api/auth/login
 */
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const db = getDB();
    const admin = db.admin;

    if (username.trim() !== admin.username || !comparePassword(password, admin.passwordHash)) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = generateToken({
      username: admin.username,
      name: admin.name,
      role: 'admin',
    });

    // Set secure cookie
    res.cookie('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 3600 * 1000, // 12 hours
    });

    res.json({
      success: true,
      token,
      user: {
        username: admin.username,
        name: admin.name,
        role: 'admin',
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

/**
 * POST /api/auth/logout
 */
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('admin_session');
  res.json({ success: true, message: 'Logged out successfully' });
});

/**
 * GET /api/auth/me
 */
app.get('/api/auth/me', requireAdmin, (req, res) => {
  const db = getDB();
  res.json({
    authenticated: true,
    user: {
      username: db.admin.username,
      name: db.admin.name,
      role: 'admin',
    },
  });
});

/**
 * POST /api/auth/change-password
 */
app.post('/api/auth/change-password', requireAdmin, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const db = getDB();
    if (!comparePassword(currentPassword, db.admin.passwordHash)) {
      return res.status(400).json({ error: 'Current password does not match.' });
    }

    db.admin.passwordHash = hashPassword(newPassword);
    db.admin.updatedAt = new Date().toISOString();
    saveDB(db);

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// ============================================================================
// PROTECTED ADMIN MANAGEMENT ROUTES
// ============================================================================

/**
 * GET /api/admin/bookings
 */
app.get('/api/admin/bookings', requireAdmin, (req, res) => {
  const db = getDB();
  res.json({ bookings: db.bookings || [] });
});

/**
 * PATCH /api/admin/bookings/:id
 */
app.patch('/api/admin/bookings/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const db = getDB();

    const bookingIndex = (db.bookings || []).findIndex((b) => b.id === id);
    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (status) db.bookings[bookingIndex].status = status;
    if (notes !== undefined) db.bookings[bookingIndex].notes = notes;
    db.bookings[bookingIndex].updatedAt = new Date().toISOString();

    saveDB(db);
    res.json({ success: true, booking: db.bookings[bookingIndex] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

/**
 * DELETE /api/admin/bookings/:id
 */
app.delete('/api/admin/bookings/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    db.bookings = (db.bookings || []).filter((b) => b.id !== id);
    saveDB(db);
    res.json({ success: true, message: 'Booking removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

/**
 * POST /api/admin/upload
 * Single or multiple photo uploads
 */
app.post('/api/admin/upload', requireAdmin, upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
    });
  } catch (err) {
    console.error('File upload error:', err);
    res.status(500).json({ error: 'File upload failed' });
  }
});

/**
 * DELETE /api/admin/upload
 */
app.delete('/api/admin/upload', requireAdmin, (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ error: 'Filename is required' });

    // Prevent directory traversal
    const safeName = path.basename(filename);
    const targetPath = path.join(uploadsDir, safeName);

    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }
    res.json({ success: true, message: 'File deleted from disk' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

/**
 * SERVICES MANAGEMENT
 */
app.post('/api/admin/services', requireAdmin, (req, res) => {
  try {
    const { title, category, price, duration, image, badge, description, perks } = req.body;
    if (!title || !price) {
      return res.status(400).json({ error: 'Title and price are required' });
    }

    const db = getDB();
    const newService = {
      id: `svc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      category: category || 'Hair & Styling',
      price: price.trim(),
      duration: duration || '60 mins',
      image: image || '/images/hair2.jpg',
      badge: badge || 'New Treatment',
      description: (description || '').trim(),
      perks: Array.isArray(perks) ? perks : (perks || '').split(',').map((p) => p.trim()).filter(Boolean),
    };

    db.services = [...(db.services || []), newService];
    saveDB(db);
    res.status(201).json({ success: true, service: newService });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add service' });
  }
});

app.put('/api/admin/services/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, price, duration, image, badge, description, perks } = req.body;
    const db = getDB();

    const idx = (db.services || []).findIndex((s) => s.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Service not found' });

    db.services[idx] = {
      ...db.services[idx],
      title: title !== undefined ? title.trim() : db.services[idx].title,
      category: category !== undefined ? category : db.services[idx].category,
      price: price !== undefined ? price.trim() : db.services[idx].price,
      duration: duration !== undefined ? duration : db.services[idx].duration,
      image: image !== undefined ? image : db.services[idx].image,
      badge: badge !== undefined ? badge : db.services[idx].badge,
      description: description !== undefined ? description.trim() : db.services[idx].description,
      perks: Array.isArray(perks) ? perks : db.services[idx].perks,
      updatedAt: new Date().toISOString(),
    };

    saveDB(db);
    res.json({ success: true, service: db.services[idx] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

app.delete('/api/admin/services/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    db.services = (db.services || []).filter((s) => s.id !== id);
    saveDB(db);
    res.json({ success: true, message: 'Service removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

/**
 * GALLERY MANAGEMENT
 */
app.post('/api/admin/gallery', requireAdmin, (req, res) => {
  try {
    const { src, title, categoryName, filter, subtitle, badge, alt } = req.body;
    if (!src || !title) {
      return res.status(400).json({ error: 'Photo source and title are required' });
    }

    const db = getDB();
    const newItem = {
      id: `gal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      src,
      title: title.trim(),
      categoryName: categoryName || 'Hair & Color',
      filter: filter || 'hair',
      subtitle: subtitle || '',
      badge: badge || 'Salon Creation',
      alt: alt || title,
      createdAt: new Date().toISOString(),
    };

    db.gallery = [newItem, ...(db.gallery || [])];
    saveDB(db);
    res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add gallery photo' });
  }
});

app.delete('/api/admin/gallery/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const itemToDelete = (db.gallery || []).find((g) => g.id === id);

    // If it's an uploaded file in /uploads/, also delete from disk
    if (itemToDelete && itemToDelete.src && itemToDelete.src.startsWith('/uploads/')) {
      const filename = path.basename(itemToDelete.src);
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Could not unlink gallery image from disk:', e);
        }
      }
    }

    db.gallery = (db.gallery || []).filter((g) => g.id !== id);
    saveDB(db);
    res.json({ success: true, message: 'Photo deleted from gallery' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

/**
 * BUSINESS SETTINGS & OPENING HOURS
 */
app.put('/api/admin/business', requireAdmin, (req, res) => {
  try {
    const { businessDetails, salonHours, salonStats } = req.body;
    const db = getDB();

    if (businessDetails) {
      db.businessDetails = {
        ...db.businessDetails,
        ...businessDetails,
      };
    }
    if (salonHours) db.salonHours = salonHours;
    if (salonStats) db.salonStats = salonStats;

    saveDB(db);
    res.json({
      success: true,
      message: 'Business settings saved',
      businessDetails: db.businessDetails,
      salonHours: db.salonHours,
      salonStats: db.salonStats,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update business settings' });
  }
});

/**
 * TESTIMONIALS MANAGEMENT
 */
app.post('/api/admin/testimonials', requireAdmin, (req, res) => {
  try {
    const { name, location, treatment, rating, quote } = req.body;
    if (!name || !quote) {
      return res.status(400).json({ error: 'Name and quote are required' });
    }

    const db = getDB();
    const newTestimonial = {
      id: Date.now(),
      name: name.trim(),
      location: (location || 'Palmerston North').trim(),
      treatment: (treatment || 'Salon Treatment').trim(),
      rating: Number(rating) || 5,
      quote: quote.trim(),
      date: 'Recent Guest',
    };

    db.testimonials = [newTestimonial, ...(db.testimonials || [])];
    saveDB(db);
    res.status(201).json({ success: true, testimonial: newTestimonial });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
});

app.delete('/api/admin/testimonials/:id', requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id);
    const db = getDB();
    db.testimonials = (db.testimonials || []).filter((t) => t.id !== id);
    saveDB(db);
    res.json({ success: true, message: 'Testimonial removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// Production & fallback: serve built static files from dist
const distPath = path.join(projectRoot, 'dist');
if (process.env.NODE_ENV === 'production' || fs.existsSync(path.join(distPath, 'index.html'))) {
  app.use(express.static(distPath));
  app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌸 Norwen Beauty Salon Server running on port ${PORT}`);
});
