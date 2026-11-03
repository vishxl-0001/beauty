# Norwen Beauty Salon — Full-Stack Website & Admin Control Center

A bespoke, mobile-first website and content management system created for **Norwen Beauty Salon** (Terrace End, Palmerston North, New Zealand), founded and operated by master stylist **Wendyl Tagaan**.

---

## 🌸 Business Information Reference

- **Business Name:** Norwen Beauty Salon
- **Founder & Master Stylist:** Wendyl Tagaan
- **Phone:** `+64 274 801 855` (Click-to-call: `tel:+64274801855`)
- **Email:** `wendylsoriano51@gmail.com` (Click-to-email: `mailto:wendylsoriano51@gmail.com`)
- **Studio Address:** 98 Napier Road, Terrace End, Palmerston North 4410, New Zealand
- **Instagram:** [https://www.instagram.com/wendyltagaan](https://www.instagram.com/wendyltagaan) (`@wendyltagaan`)
- **Language:** English

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Full-Stack Development
```bash
npm run dev
```
This simultaneously launches:
- **Express Backend API:** `http://localhost:5000` (REST API, uploads, session authentication, atomic JSON database)
- **Vite React Frontend:** `http://localhost:5173` (Website with live proxy to backend API)

### 3. Production Build & Start
```bash
npm run build
npm start
```
Starts the production server serving both the API endpoints and the compiled frontend at `http://localhost:5000`.

---

## 🔐 Admin Control Center & Login

The website features an integrated, password-protected administrative console for managing every aspect of the salon in real-time.

### Accessing the Admin Panel
1. Navigate to: **`http://localhost:5173/#admin`**
2. Or click the **Shield Icon** in the top navbar, or **"Staff Login"** in the website footer.

### Default Admin Credentials
- **Username:** `admin`
- **Password:** `NorwenAdmin2026!`

*(You can change this password anytime in the **Salon Details & Hours** tab inside the admin panel).*

---

## 🛠️ Admin Panel Capabilities

### 1. 📅 Bookings & Inquiries Manager
- Real-time list of all appointment requests submitted via the website form.
- Filter inquiries by status: **All**, **Pending**, **Confirmed**, **Completed**, or **Cancelled**.
- Guest details: full name, phone (click-to-call), email, selected treatment, preferred date, time slot, notes, and timestamp.
- One-click status updates and delete controls.

### 2. 💇‍♀️ Services & Pricing Management
- View, edit, or add salon services.
- **Update Prices:** Change starting rates (e.g. from `$185` to whatever price is desired) and see it update immediately across the client-facing website.
- Edit service titles, descriptions, categories, durations, badges, and perks.
- Upload custom service photos or reference gallery images.

### 3. 🖼️ Gallery & Photo Uploads
- **Upload Photos:** Drag & drop or select PNG, JPG, or WebP files directly from your computer or phone.
- Categorize photos (**Hair & Color**, **Styling & Cuts**, **Nails & Art**, **Studio & Team**).
- Add titles, subtitles, and badges (e.g., *Trend Alert*, *Guest Love*).
- **Delete Photos:** Deletes the photo from the gallery and removes uploaded files from disk.

### 4. ⚙️ Salon Details, Hours & Security
- Edit salon phone number, email address, physical location, and Instagram profile.
- Update the daily opening hours schedule.
- Securely update the admin account password using cryptographic verification.

---

## 🖼️ Complete Image Mapping Catalog

Every image in `/images` is utilized across the demo:

| Filename | Type & Dimensions | Section Assignment | Subject & Visual Role |
| :--- | :--- | :--- | :--- |
| `Norwen Beauty Salon Floral Logo.png` (`logo.png`) | PNG (1254×1254) | **Navbar, Preloader, Hero Stamp, Footer** | Official brand mark: silhouette with floral vines & butterflies |
| `owner.png` | PNG (1148×1370) | **About Section (Main Arch) & Gallery** | Portrait of founder Wendyl Tagaan in floral attire |
| `salon.jpg` | JPEG (512×384) | **About Proof Stamp, Location & Contact** | Real storefront sign with fairy lights at 98 Napier Road |
| `hair2.jpg` | JPEG (1440×1920) | **Hero (Main Arch), Services & Gallery** | Silky honey & champagne blonde balayage waves |
| `nails2.jpg` | JPEG (1440×1440) | **Hero Floating Chip, Services & Gallery** | Couture pearl-embellished French almond manicure |
| `hair1.jpg` | JPEG (1440×1920) | **Services (Creative Color) & Gallery** | Violet money-piece peekaboo balayage waves |
| `hair4.jpg` | JPEG (3871×3871) | **Services (Blowouts) & Gallery** | Voluminous tiered layered blowout with carved salon screen |
| `nails1.jpg` | JPEG (1440×1800) | **Services (Nail Art) & Gallery** | Hand-painted pastel press-on tips with cute bunny & bows |
| `hair3.jpg` | JPEG (3072×4096) | **Why Choose Us Accent Banner & Gallery** | Vivid emerald & turquoise creative underlights |
| `hair5.jpg` | JPEG (4095×4096) | **Services (Hair Spa) & Gallery** | Cascading full back view of glossy dark blowout curls |
| `nails3.jpg` | JPEG (1440×1440) | **Gallery & Booking Visual Accent** | Pop-art red & nude heart nails with bold black outlines |

---

## 📂 Project Architecture

```
├── public/
│   ├── images/          # Default salon photography and brand assets
│   └── uploads/         # Admin-uploaded client photos & hairstyles
├── server/
│   ├── auth.js          # HMAC-SHA256 session token system & password hashing
│   ├── db.js            # Atomic JSON database manager
│   ├── server.js        # Express REST API (public data, bookings, admin CRUD, file uploads)
│   └── data/
│       └── db.json      # Persistent salon database
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx       # Branded luxury login screen
│   │   │   └── AdminDashboard.jsx   # Full CRUD control panel (bookings, services, photos, hours)
│   │   ├── About.jsx
│   │   ├── BookingSection.jsx       # Connected to POST /api/bookings with confetti
│   │   ├── ContactLocation.jsx
│   │   ├── FloatingParticles.jsx
│   │   ├── Footer.jsx
│   │   ├── Gallery.jsx
│   │   ├── Hero.jsx
│   │   ├── Lightbox.jsx
│   │   ├── MarqueeStrip.jsx
│   │   ├── MobileBottomBar.jsx
│   │   ├── Navbar.jsx
│   │   ├── Preloader.jsx
│   │   ├── Services.jsx
│   │   ├── SparkleCursor.jsx
│   │   ├── Testimonials.jsx
│   │   └── WhyChooseUs.jsx
│   ├── context/
│   │   └── SalonContext.jsx         # Live data synchronization between backend and frontend
│   ├── data/
│   │   ├── content.js
│   │   └── images.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## 📱 Mobile-First Quality

- **Thumb-Friendly Sticky Bottom Bar:** Quick actions for Call, SMS, Book, and Instagram.
- **Safe Area Insets:** Automatically accounts for iPhone home indicators (`env(safe-area-inset-bottom)`).
- **Responsive Breakpoints:** 360px, 390px, 430px, 768px, 1024px, and 1280px+.
- **Touch Gestures:** Swipe-friendly gallery lightbox and testimonials carousel.
- **Zero Horizontal Scrolling:** Strict fluid widths and clamp typography.
