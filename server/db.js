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
      'Experience bespoke hair design, rich dimensional color, restorative hair spa rituals, relaxing foot care, and gentle natural beauty treatments with Wendy in Terrace End, Palmerston North.',
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
    "id": "hair2",
    "src": "/images/hair2.jpg",
    "alt": "Silky honey and ash blonde dimensional balayage waves cascading down in salon",
    "title": "Signature Champagne Balayage",
    "categoryName": "Hair & Color",
    "filter": "hair",
    "subtitle": "Sun-kissed champagne dimensional foil work & gloss glaze",
    "badge": "Signature Style",
    "aspectRatio": "3/4",
    "objectPosition": "center 30%"
  },
  {
    "id": "service-color",
    "src": "/images/Haircare(Color and Highlights).png",
    "alt": "Rich golden blonde dimensional foil highlights and balayage",
    "title": "Color and Highlights",
    "categoryName": "Hair & Color",
    "filter": "hair",
    "subtitle": "Luminous multidimensional highlights tailored to complexion",
    "badge": "Guest Love",
    "aspectRatio": "1/1",
    "objectPosition": "center 30%"
  },
  {
    "id": "salon-styling-moment",
    "src": "/images/Salon Styling Session with Curling Iron.png",
    "alt": "Wendyl expertly styling client hair with curling iron in salon",
    "title": "Curling Iron Artistry & Styling Session",
    "categoryName": "Styling & Cuts",
    "filter": "styling",
    "subtitle": "Live curling iron styling session in our Terrace End studio",
    "badge": "In Action",
    "aspectRatio": "1363/1154",
    "objectPosition": "center 25%"
  },
  {
    "id": "service-manicure-pedicure",
    "src": "/images/NailCare(Manicure & Pedicure).jpeg",
    "alt": "Pampering natural nail cleaning, shaping, and rejuvenating foot spa pedicure",
    "title": "Natural Nail Cleaning & Foot Spa Pedicure",
    "categoryName": "Natural Nail Care",
    "filter": "nails",
    "subtitle": "Gentle natural nail cleaning, cuticle care, and soothing foot spa soak (no false designs)",
    "badge": "Natural Nails Only",
    "aspectRatio": "1/1",
    "objectPosition": "center 40%"
  },
  {
    "id": "service-haircut",
    "src": "/images/Haircare(Haircut and Styling).png",
    "alt": "Precision haircut and voluminous layered blowout styling",
    "title": "Haircut and Styling",
    "categoryName": "Styling & Cuts",
    "filter": "styling",
    "subtitle": "Precision shaping and soft layered bounce blow-dry",
    "badge": "Starts at $25",
    "aspectRatio": "1/1",
    "objectPosition": "center 25%"
  },
  {
    "id": "salon-treatment-moment",
    "src": "/images/Salon Hair Treatment Moment.png",
    "alt": "Relaxing scalp wash and hair spa basin treatment at Norwen Beauty Salon",
    "title": "Hair Spa Scalp Basin Experience",
    "categoryName": "Treatments",
    "filter": "hair",
    "subtitle": "Deep botanical hydration & invigorating scalp basin therapy",
    "badge": "Restorative",
    "aspectRatio": "1309/1202",
    "objectPosition": "center 30%"
  },
  {
    "id": "hair4",
    "src": "/images/hair4.jpg",
    "alt": "Rich chocolate brunette blowout with voluminous flipped layers beside carved salon screen",
    "title": "Luxury Tiered Layer Blowout",
    "categoryName": "Styling & Cuts",
    "filter": "styling",
    "subtitle": "Signature 90s bouncy layered blowout with heat seal",
    "badge": "Popular",
    "aspectRatio": "1/1",
    "objectPosition": "center 35%"
  },
  {
    "id": "service-keratin",
    "src": "/images/Treatments(Keratin Treatment).png",
    "alt": "Mirror-shine keratin protein smoothing treatment sealing cuticles",
    "title": "Keratin Treatment",
    "categoryName": "Treatments",
    "filter": "hair",
    "subtitle": "Anti-humidity protein smoothing therapy for glass-like shine",
    "badge": "Starts at $80",
    "aspectRatio": "1/1",
    "objectPosition": "center 30%"
  },
  {
    "id": "service-threading",
    "src": "/images/Face Care(Threading).png",
    "alt": "Gentle facial threading for crisp eyebrow contouring and smooth skin",
    "title": "Threading",
    "categoryName": "Face & Body",
    "filter": "studio",
    "subtitle": "Gentle facial threading for clean, sculpted eyebrow contours",
    "badge": "Precision",
    "aspectRatio": "1/1",
    "objectPosition": "center 35%"
  },
  {
    "id": "hair1",
    "src": "/images/hair1.jpg",
    "alt": "Client smiling with vibrant violet peekaboo money-piece balayage on long dark waves",
    "title": "Violet Dimension Balayage",
    "categoryName": "Hair & Color",
    "filter": "hair",
    "subtitle": "Custom violet money-piece with seamless melt",
    "badge": "Creative Color",
    "aspectRatio": "3/4",
    "objectPosition": "center 25%"
  },
  {
    "id": "service-waxing",
    "src": "/images/BodyCare(waxing).png",
    "alt": "Gentle hygienic body waxing leaving silky soft skin",
    "title": "Waxing",
    "categoryName": "Face & Body",
    "filter": "studio",
    "subtitle": "Skin-calming hygienic body waxing with gentle aftercare",
    "badge": "Silky Smooth",
    "aspectRatio": "1/1",
    "objectPosition": "center 35%"
  },
  {
    "id": "hair3",
    "src": "/images/hair3.jpg",
    "alt": "Vibrant emerald green and turquoise peekaboo underlights on dark wavy hair",
    "title": "Emerald Wave Creative Underlights",
    "categoryName": "Hair & Color",
    "filter": "hair",
    "subtitle": "Hidden vivid emerald tone under rich brunette waves",
    "badge": "Creative Color",
    "aspectRatio": "3/4",
    "objectPosition": "center 40%"
  },
  {
    "id": "owner",
    "src": "/images/owner.png",
    "alt": "Wendyl (Wendy) Tagaan, founder and master beauty stylist at Norwen Beauty Salon",
    "title": "Wendyl Tagaan - Founder & Creative Director",
    "categoryName": "Studio & Team",
    "filter": "studio",
    "subtitle": "Founder & Master Stylist Wendyl Tagaan welcoming you",
    "badge": "Meet Wendy",
    "aspectRatio": "0.84",
    "objectPosition": "center 20%"
  },
  {
    "id": "storefront",
    "src": "/images/salon.jpg",
    "alt": "Physical storefront sign for Norwen Salon with fairy lights at 98 Napier Road, Terrace End",
    "title": "Norwen Salon Storefront & Studio",
    "categoryName": "Studio & Team",
    "filter": "studio",
    "subtitle": "Our welcoming salon boutique at 98 Napier Road, Terrace End",
    "badge": "Our Studio",
    "aspectRatio": "1.33",
    "objectPosition": "center center"
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
