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
  {
    "days": "Monday – Friday",
    "hours": "9:00 AM – 6:00 PM"
  },
  {
    "days": "Saturday & Sunday",
    "hours": "2:30 PM – 8:00 PM"
  }
],
  salonStats: [
    { value: 1250, suffix: '+', label: 'Happy Glow-Ups', helper: 'Devoted local clients' },
    { value: 9, suffix: '+', label: 'Years Artistry', helper: 'Mastery in styling & nails' },
    { value: 3400, suffix: '+', label: 'Treatments Given', helper: 'Precision cuts, color & art' },
    { value: 100, suffix: '%', label: 'Boutique Care', helper: 'Warm, unhurried service' },
  ],
  services: [
  {
    "id": "haircut-styling",
    "title": "Haircut and Styling",
    "category": "HairCare",
    "price": "Starts at $25",
    "duration": "45 - 60 mins",
    "image": "/images/Haircare(Haircut and Styling).png",
    "badge": "Popular",
    "description": "Professional precision haircut tailored to your natural hair texture and face shape, finished with a fresh, bouncy blow-dry style.",
    "perks": [
      "Personal hair consultation",
      "Scalp wash & prep",
      "Bouncy blow-dry styling"
    ]
  },
  {
    "id": "color-highlights",
    "title": "Color and Highlights",
    "category": "HairCare",
    "price": "Starts at $80",
    "duration": "2 - 3.5 hrs",
    "image": "/images/Haircare(Color and Highlights).png",
    "badge": "Client Favorite",
    "description": "Luminous dimensional foils, seamless balayage, or vibrant full color coverage tailored to brighten your complexion and add healthy radiance.",
    "perks": [
      "Custom shade formulation",
      "Radiant gloss glaze toner",
      "Affordable luxury color"
    ]
  },
  {
    "id": "perm-straightening",
    "title": "Perm and Straightening",
    "category": "HairCare",
    "price": "Starts at $70",
    "duration": "2 - 3 hrs",
    "image": "/images/Haircare(Perm and Straightening).png",
    "badge": "Texture Mastery",
    "description": "Transform your natural hair: gorgeous bouncy, defined curls with a gentle perm, or ultra-silky, smooth chemical straightening for easy daily styling.",
    "perks": [
      "Gentle softening formula",
      "Heat protectant seal",
      "Long-lasting wave or silk finish"
    ]
  },
  {
    "id": "hair-spa",
    "title": "Hair Spa",
    "category": "Treatments",
    "price": "Starts at $60",
    "duration": "45 mins",
    "image": "/images/Treatments(Hair Spa).png",
    "badge": "Restorative",
    "description": "A deeply restorative spa ritual combining rich botanical moisture with an invigorating scalp massage to revive dull, stressed, or dry tresses.",
    "perks": [
      "Invigorating scalp acupressure",
      "Warm herbal steam wrap",
      "Intensive hydration therapy"
    ]
  },
  {
    "id": "keratin-treatment",
    "title": "Keratin Treatment",
    "category": "Treatments",
    "price": "Starts at $80",
    "duration": "2 - 2.5 hrs",
    "image": "/images/Treatments(Keratin Treatment).png",
    "badge": "Anti-Frizz Shine",
    "description": "Intensive protein smoothing therapy that seals damaged cuticles, eliminates stubborn humidity frizz, and imparts radiant glass-like shine.",
    "perks": [
      "Eliminates 95% of frizz",
      "Dramatically cuts drying time",
      "Results last for months"
    ]
  },
  {
    "id": "deep-conditioning",
    "title": "Deep Conditioning",
    "category": "Treatments",
    "price": "Starts at $40",
    "duration": "30 mins",
    "image": "/images/hair2.jpg",
    "badge": "Quick Glow",
    "description": "Instant targeted hydration and lipid replenishment to restore softness, combability, and healthy bounce to dry or heat-styled hair.",
    "perks": [
      "Protein & lipid infusion",
      "Instant detangling & gloss",
      "Scalp soothing massage"
    ]
  },
  {
    "id": "threading",
    "title": "Threading",
    "category": "Face Care",
    "price": "Starts at $30",
    "duration": "20 - 30 mins",
    "image": "/images/Face Care(Threading).png",
    "badge": "Precision Shape",
    "description": "Gentle, ultra-precise facial hair threading for crisp, clean eyebrow shaping, upper lip, and facial grooming without chemicals or harsh peeling.",
    "perks": [
      "Gentle on sensitive skin",
      "Razor-sharp brow contouring",
      "Soothing aloe vera aftercare"
    ]
  },
  {
    "id": "waxing",
    "title": "Waxing",
    "category": "Body Care",
    "price": "Starts at $30",
    "duration": "30 - 45 mins",
    "image": "/images/BodyCare(waxing).png",
    "badge": "Silky Smooth",
    "description": "Hygienic, comfortable body waxing using premium skin-calming wax formulas for silky, touchable smoothness that lasts for weeks.",
    "perks": [
      "Hygienic single-use applicators",
      "Pre & post-wax calming elixirs",
      "Silky, long-lasting results"
    ]
  },
  {
    "id": "manicure-pedicure",
    "title": "Manicure & Pedicure",
    "category": "Nail Care",
    "price": "Starts at $25",
    "duration": "45 - 60 mins",
    "image": "/images/NailCare(Manicure & Pedicure).jpeg",
    "badge": "Guest Love",
    "description": "Pampering nail shaping, meticulous cuticle care, soothing foot spa massage, and long-lasting glossy polish for beautifully rejuvenated hands and feet.",
    "perks": [
      "Relaxing foot spa & foot massage",
      "Nail shaping & buffing",
      "High-shine durable finish"
    ]
  }
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
    "id": 1,
    "name": "Rhudna Honey",
    "location": "Palmerston North",
    "treatment": "Color and Highlights",
    "rating": 5,
    "quote": "100 percent very legitimate, I love my hair color and it was very affordable. Please book wendy, if you are looking for an affordable and beautiful hair color",
    "date": "Verified Client"
  },
  {
    "id": 2,
    "name": "Marites Alamil",
    "location": "Terrace End",
    "treatment": "Foot Spa Massage & Pedicure",
    "rating": 5,
    "quote": "Wendy did it very well in taking care of my feet, the foot spa massage and pedicure is really great,That’s why I always come back for an appointment. Thank You Wendy .",
    "date": "Verified Client"
  },
  {
    "id": 3,
    "name": "DC",
    "location": "Palmerston North",
    "treatment": "Regular Haircut & Styling",
    "rating": 5,
    "quote": "Wendy always take care of my hair when it comes to regular haircuts, I save a lot of money while having a good hair cut",
    "date": "Verified Client"
  }
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
