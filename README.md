# Norwen Beauty Salon — Luxury Boutique Website Demo

A bespoke, mobile-first front-end demonstration website created for **Norwen Beauty Salon** (Terrace End, Palmerston North, New Zealand), founded and operated by master stylist **Wendyl Tagaan**.

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

### 2. Start Development Server
```bash
npm run dev
```
The site will be live at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 🎨 Design Direction: "Luxury but Cute"

- **Aesthetic:** VVIP boutique sanctuary with an airy, feminine, high-end feel and playful cuteness.
- **Color Palette (tailored to salon photography):**
  - **Blush Pink:** `#F8E1E4` / `#FDF4F5` (Soft romantic warmth)
  - **Rose Gold & Coral Rose:** `#E65D73` / `#B76E79` / `#D9A58B` (Derived directly from brand floral logo)
  - **Champagne & Sand Beige:** `#F6EBDD` / `#FBF5EE` (Balayage hair & pearl tones)
  - **Warm Ivory Background:** `#FFFDFB` (Pristine, clean canvas)
  - **Deep Plum Text:** `#3B2230` / `#271420` (High contrast, elegant readability)
  - **Luxe Gold Accent:** `#C9A24B` (Foil highlights and sparkle accents)
- **Typography:**
  - **Headings:** *Cormorant Garamond* (Google Fonts serif display)
  - **Body:** *Plus Jakarta Sans* (Clean, modern rounded sans)
  - **Accents & Signatures:** *Great Vibes* (Romantic cursive script)

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

## ✏️ How to Edit Content & Prices

All client text is centralized in **one single file**: `src/data/content.js`.

### 1. Update Salon Contact & Address
Edit `businessDetails` in `src/data/content.js`:
```javascript
export const businessDetails = {
  phone: '+64 274 801 855',
  email: 'wendylsoriano51@gmail.com',
  address: '98 Napier Road, Terrace End, Palmerston North 4410, New Zealand',
  instagram: 'https://www.instagram.com/wendyltagaan',
  // ...
};
```

### 2. Update Services & Pricing
Edit `salonServices` in `src/data/content.js`:
```javascript
{
  id: 'balayage-foil',
  title: 'Signature Balayage & Foil Dimension',
  category: 'Hair & Color',
  price: 'from $185', // <-- EDIT STARTING PRICE HERE
  duration: '2.5 - 3.5 hrs',
  description: '...',
  perks: ['...']
}
```

### 3. Update Opening Hours
Edit `salonHours` in `src/data/content.js`:
```javascript
export const salonHours = [
  { days: 'Monday – Wednesday', hours: '9:00 AM – 5:30 PM' },
  { days: 'Thursday (Late Night)', hours: '9:00 AM – 7:30 PM' },
  // ...
];
```

### 4. Update Images
Replace files inside `public/images/` and update references in `src/data/images.js`.

---

## 📱 Mobile-First Features

- **Thumb-Friendly Sticky Bottom Bar:** Quick actions for Call, SMS, Book, and Instagram.
- **Safe Area Insets:** Automatically accounts for iPhone home indicators (`env(safe-area-inset-bottom)`).
- **Responsive Breakpoints Tested:** 360px, 390px, 430px, 768px, 1024px, and 1280px+.
- **Touch Gestures:** Swipe-friendly gallery lightbox and testimonials carousel.
- **Zero Horizontal Scrolling:** Strict fluid widths and clamp typography.

---

## ⚠️ Placeholders Requiring Client Confirmation

1. **Service Menu & Starting Rates:** Balayage (`from $185`), Creative Vivids (`from $160`), Layered Cut & Blowout (`from $75`), Pearl French Nails (`from $85`), Hand-Painted Art (`from $95`), Botanical Hair Spa (`from $65`).
2. **Opening Hours:** Mon–Wed 9–5:30, Thu late night 9–7:30, Fri 9–6, Sat 9:30–4:30, Sun Closed.
3. **Founder Story & Bio:** Exact years of experience and personal salon background notes.
4. **Client Testimonials:** Generic first-name reviews (`Sophie M.`, `Chloe T.`, etc.) to be replaced or verified with actual client feedback.
5. **Stats Counters:** 1,250+ Happy Clients, 9+ Years Artistry, 3,400+ Treatments.
