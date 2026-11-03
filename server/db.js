import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data', 'db.json');

// Initial seed data
const initialData = {
  admin: {
    username: 'admin',
    // Default password: NorwenAdmin2026!
    passwordHash: '$2b$10$XPROUNog2XNq7iu7xC6bfuZPG3d4Vgm3SALQzGwQenmOvqMybBYiO',
    name: 'Wendyl Tagaan',
    updatedAt: new Date().toISOString(),
  },
  businessDetails: {
    name: 'Norwen Beauty Salon',
    tagline: 'Where Beauty Meets Elegance',
    subheadline:
      'Experience bespoke hair design, luminous balayage, and couture nail artistry in an intimate, relaxing boutique sanctuary in Terrace End, Palmerston North.',
    owner: 'Wendyl Tagaan',
    ownerRole: 'Founder & Master Stylist',
    phone: '+64 274 801 855',
    phoneRaw: '+64274801855',
    email: 'wendylsoriano51@gmail.com',
    address: '98 Napier Road, Terrace End, Palmerston North 4410, New Zealand',
    addressShort: '98 Napier Road, Terrace End, Palmerston North',
    city: 'Palmerston North',
    country: 'New Zealand',
    instagram: 'https://www.instagram.com/wendyltagaan',
    instagramHandle: '@wendyltagaan',
    googleMapsUrl:
      'https://maps.google.com/maps?q=98+Napier+Road,+Terrace+End,+Palmerston+North+4410,+New+Zealand&t=&z=15&ie=UTF8&iwloc=&output=embed',
    copyrightYear: 2026,
  },
  salonHours: [
    { days: 'Monday – Wednesday', hours: '9:00 AM – 5:30 PM' },
    { days: 'Thursday (Late Night)', hours: '9:00 AM – 7:30 PM' },
    { days: 'Friday', hours: '9:00 AM – 6:00 PM' },
    { days: 'Saturday', hours: '9:30 AM – 4:30 PM' },
    { days: 'Sunday', hours: 'Closed / By Special Appointment' },
  ],
  salonStats: [
    { value: 1250, suffix: '+', label: 'Happy Glow-Ups', helper: 'Devoted local clients' },
    { value: 9, suffix: '+', label: 'Years Artistry', helper: 'Mastery in styling & nails' },
    { value: 3400, suffix: '+', label: 'Treatments Given', helper: 'Precision cuts, color & art' },
    { value: 100, suffix: '%', label: 'Boutique Care', helper: 'Warm, unhurried service' },
  ],
  services: [
    {
      id: 'balayage-foil',
      title: 'Signature Balayage & Foil Dimension',
      category: 'Hair & Color',
      price: 'from $185',
      duration: '2.5 - 3.5 hrs',
      image: '/images/hair2.jpg',
      badge: 'Guest Favorite',
      description:
        'Seamless honey, champagne, or cool blonde hand-painted transitions customized to your skin tone and natural fall, sealed with a luminous gloss glaze.',
      perks: ['Bond-protecting treatment', 'Gloss toner included', 'Signature bouncy finish'],
    },
    {
      id: 'creative-vivids',
      title: 'Creative Color & Peekaboo Underlights',
      category: 'Hair & Color',
      price: 'from $160',
      duration: '2 - 3 hrs',
      image: '/images/hair1.jpg',
      badge: 'Artistic Specialty',
      description:
        'Expressive jewel tones—rich violet money pieces, mystical emerald underlights, and pastel pops that peek through your everyday style.',
      perks: ['Vibrant fade-resistant pigments', 'Precision lightening', 'Hydration color mask'],
    },
    {
      id: 'layered-blowout',
      title: 'Precision Layered Cut & 90s Bouncy Blowout',
      category: 'Styling & Cuts',
      price: 'from $75',
      duration: '60 mins',
      image: '/images/hair4.jpg',
      badge: 'Everyday Luxury',
      description:
        'Face-framing textured layers designed to maximize natural volume and movement, finished with a salon-grade hot round brush thermal blowout.',
      perks: ['Relaxing scalp massage wash', 'Eleven Australia styling elixir', 'Long-lasting wave hold'],
    },
    {
      id: 'pearl-french-nails',
      title: 'Couture Pearl French Almond Manicure',
      category: 'Nails & Art',
      price: 'from $85',
      duration: '75 mins',
      image: '/images/nails2.jpg',
      badge: 'Bridal & Red Carpet',
      description:
        'Glossy almond or sculpted gel nails with pristine micro-French tips, individually hand-embellished with iridescent pearl beads and crystal drops.',
      perks: ['Cuticle detox & nourishment', 'Strengthening builder gel', 'High-gloss anti-scratch topcoat'],
    },
    {
      id: 'handpainted-nailart',
      title: 'Kawaii & Bespoke Hand-Painted Nail Art',
      category: 'Nails & Art',
      price: 'from $95',
      duration: '90 mins',
      image: '/images/nails1.jpg',
      badge: 'Playful & Cute',
      description:
        'Intricate micro-artistry: cute bunny characters, retro 3D bows, pastel florals, or bold pop-art graphics tailored to your whimsical aesthetic.',
      perks: ['Hand-drawn custom artwork', 'Custom press-on options available', 'Long-wear gel durability'],
    },
    {
      id: 'restorative-hair-spa',
      title: 'Botanical Hair & Scalp Rejuvenation',
      category: 'Hair & Care',
      price: 'from $65',
      duration: '45 mins',
      image: '/images/hair5.jpg',
      badge: 'Restorative',
      description:
        'Deep restorative lipid infusion to repair heat damage, rehydrate dry ends, and restore mirror-like shine and silkiness to stressed tresses.',
      perks: ['Warm herbal towel wrap', 'Invigorating scalp acupressure', 'Leave-in moisture shield'],
    },
  ],
  gallery: [
    {
      id: 'hair2',
      src: '/images/hair2.jpg',
      title: 'Signature Champagne Balayage',
      categoryName: 'Hair & Color',
      filter: 'hair',
      subtitle: 'Sun-kissed dimensional foil work & gloss glaze',
      badge: 'Signature Style',
      alt: 'Silky honey and ash blonde dimensional balayage waves cascading down in salon',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'nails2',
      src: '/images/nails2.jpg',
      title: 'Luxe Pearl Almond French Manicure',
      categoryName: 'Nails & Art',
      filter: 'nails',
      subtitle: 'Hand-set micro pearls on sheer nude base',
      badge: 'Most Requested',
      alt: 'Glossy almond French manicure adorned with delicate pearl bead embellishments',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'hair4',
      src: '/images/hair4.jpg',
      title: 'Luxury Tiered Layer Blowout',
      categoryName: 'Styling & Cuts',
      filter: 'styling',
      subtitle: 'Signature 90s bouncy layered blowout with heat seal',
      badge: 'Popular',
      alt: 'Rich chocolate brunette blowout with voluminous flipped layers beside carved salon screen',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'nails1',
      src: '/images/nails1.jpg',
      title: 'Kawaii Pastel Hand-Painted Nail Tips',
      categoryName: 'Nails & Art',
      filter: 'nails',
      subtitle: 'Bespoke hand-painted characters & pastel florals',
      badge: 'Cute & Playful',
      alt: 'Handcrafted pastel press-on tips with cute bunny art, ribbons, polka dots, and daisies',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'hair1',
      src: '/images/hair1.jpg',
      title: 'Violet Dimension Balayage',
      categoryName: 'Hair & Color',
      filter: 'hair',
      subtitle: 'Custom violet money-piece with seamless melt',
      badge: 'Creative Color',
      alt: 'Client smiling with vibrant violet peekaboo money-piece balayage on long dark waves',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'hair5',
      src: '/images/hair5.jpg',
      title: 'Signature Gloss Waves',
      categoryName: 'Styling & Cuts',
      filter: 'styling',
      subtitle: 'Cascading thermal curl finish with mirror shine',
      badge: 'Hair Care',
      alt: 'Cascading bounciness and healthy gloss of layered dark blowout curls from behind',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'nails3',
      src: '/images/nails3.jpg',
      title: 'Pop-Art Red Heart Manicure',
      categoryName: 'Nails & Art',
      filter: 'nails',
      subtitle: 'Bold graphic line art with glossy red heart center',
      badge: 'Trend Alert',
      alt: 'Pop-art comic style almond nails with bold black outlines and a glossy red heart accent',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'hair3',
      src: '/images/hair3.jpg',
      title: 'Emerald Wave Creative Underlights',
      categoryName: 'Hair & Color',
      filter: 'hair',
      subtitle: 'Hidden vivid emerald tone under rich brunette waves',
      badge: 'Vivids',
      alt: 'Vibrant emerald green and turquoise peekaboo underlights on dark wavy hair',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'owner',
      src: '/images/owner.png',
      title: 'Founder Wendyl Tagaan',
      categoryName: 'Studio & Team',
      filter: 'studio',
      subtitle: 'Founder & Master Stylist Wendyl Tagaan welcoming you',
      badge: 'Meet Wendyl',
      alt: 'Wendyl Tagaan, founder and master beauty stylist at Norwen Beauty Salon',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'storefront',
      src: '/images/salon.jpg',
      title: 'Salon Sanctuary at 98 Napier Rd',
      categoryName: 'Studio & Team',
      filter: 'studio',
      subtitle: 'Our welcoming salon boutique at 98 Napier Road, Terrace End',
      badge: 'Our Sanctuary',
      alt: 'Physical storefront sign for Norwen Salon with fairy lights at 98 Napier Road, Terrace End',
      createdAt: new Date().toISOString(),
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Sophie M.',
      location: 'Palmerston North',
      treatment: 'Signature Balayage & Cut',
      rating: 5,
      quote:
        'Wendyl completely transformed my hair! The balayage is so soft and blended perfectly with zero harsh lines. The salon is such a lovely, calming place—I left feeling like royalty.',
      date: 'Recent Guest',
    },
    {
      id: 2,
      name: 'Chloe T.',
      location: 'Terrace End',
      treatment: 'Pearl French Nails',
      rating: 5,
      quote:
        'The pearl almond nails are pure perfection! I got non-stop compliments at my sister’s engagement. Wendyl is gentle, meticulous, and so talented with hand-placed details.',
      date: 'Recent Guest',
    },
    {
      id: 3,
      name: 'Aimee L.',
      location: 'Manawatū',
      treatment: 'Layered Cut & Blowout',
      rating: 5,
      quote:
        'Finally found a stylist who truly understands bouncy layers without taking away my length! The blowout held for almost a whole week. Wendyl is warm, attentive, and so sweet.',
      date: 'Recent Guest',
    },
    {
      id: 4,
      name: 'Jessica K.',
      location: 'Palmerston North',
      treatment: 'Emerald Peekaboo & Nail Art',
      rating: 5,
      quote:
        'I wanted something playful yet work-appropriate, and the emerald underlights Wendyl designed are stunning! Plus, the cute hand-drawn nail art is pure joy. Highly recommend!',
      date: 'Recent Guest',
    },
  ],
  bookings: [
    {
      id: 'bk_demo_1',
      fullName: 'Emma Watson',
      phone: '+64 21 892 411',
      email: 'emma.w@example.co.nz',
      service: 'Signature Balayage & Foil Dimension',
      date: '2026-11-06',
      timeSlot: '10:30 AM',
      notes: 'First time visiting! Looking for soft honey dimension.',
      status: 'confirmed',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'bk_demo_2',
      fullName: 'Sarah Jenkins',
      phone: '+64 27 554 902',
      email: 'sarah.j@example.co.nz',
      service: 'Couture Pearl French Almond Manicure',
      date: '2026-11-07',
      timeSlot: '01:30 PM',
      notes: 'Bridal prep for weekend wedding celebration.',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
  ],
};

// Initialize DB if not present
export function initDB() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

export function getDB() {
  initDB();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json, returning initial data fallback:', err);
    return initialData;
  }
}

export function saveDB(data) {
  initDB();
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}
