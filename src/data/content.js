/**
 * =============================================================================
 * NORWEN BEAUTY SALON - EDITABLE CONTENT REPOSITORY
 * =============================================================================
 * All client-facing text, business credentials, services, pricing, hours,
 * and testimonials live in this single file for effortless updates.
 *
 * NOTE FOR CLIENT / WENDYL:
 * Items flagged with [CONFIRM WITH CLIENT] or "placeholder" are preliminary demo
 * values based on salon photo evidence and should be confirmed before public launch.
 */

export const businessDetails = {
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
    'https://www.google.com/maps?q=98+Napier+Road,+Terrace+End,+Palmerston+North+4410,+New+Zealand&output=embed',
  copyrightYear: 2026,
};

// Trust badges & marquee keywords
export const marqueeItems = [
  'Signature Balayage',
  'Luxe Blowouts',
  'Custom Nail Art',
  'Pearl French Nails',
  'Creative Vivid Color',
  'Bridal Glam',
  'Gentle Care',
  'Palmerston North Sanctuary',
];

export const trustChips = [
  'Terrace End, Palmerston North',
  'One-on-One Personalized Attention',
  'Premium Professional Haircare',
  'Relaxing Boutique Experience',
];

// Animated Stats (Sample numbers - confirm with client)
export const salonStats = [
  { value: 1250, suffix: '+', label: 'Happy Glow-Ups', helper: 'Devoted local clients' },
  { value: 9, suffix: '+', label: 'Years Artistry', helper: 'Mastery in styling & nails' },
  { value: 3400, suffix: '+', label: 'Treatments Given', helper: 'Precision cuts, color & art' },
  { value: 100, suffix: '%', label: 'Boutique Care', helper: 'Warm, unhurried service' },
];

/**
 * SALON SERVICES
 * Inferred from studio photographs (hair cuts, balayage, creative color, nails).
 * [PLACEHOLDER PRICING - CONFIRM WITH CLIENT]
 */
export const salonServices = [
  {
    id: 'balayage-foil',
    title: 'Signature Balayage & Foil Dimension',
    category: 'Hair & Color',
    price: 'from $185', // placeholder, confirm with client
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
    price: 'from $160', // placeholder, confirm with client
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
    price: 'from $75', // placeholder, confirm with client
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
    price: 'from $85', // placeholder, confirm with client
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
    price: 'from $95', // placeholder, confirm with client
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
    price: 'from $65', // placeholder, confirm with client
    duration: '45 mins',
    image: '/images/hair5.jpg',
    badge: 'Restorative',
    description:
      'Deep restorative lipid infusion to repair heat damage, rehydrate dry ends, and restore mirror-like shine and silkiness to stressed tresses.',
    perks: ['Warm herbal towel wrap', 'Invigorating scalp acupressure', 'Leave-in moisture shield'],
  },
];

// Why Choose Norwen Highlights
export const whyChooseUs = [
  {
    id: 'artisan',
    icon: 'Sparkles',
    title: 'Artisan Attention to Detail',
    description:
      'Every foil, brush stroke, and pearl accent is carefully placed. Wendyl takes the time to understand your individual hair and nail goals.',
  },
  {
    id: 'quality',
    icon: 'Crown',
    title: 'Salon-Grade Formulations',
    description:
      'We exclusively use premium, cruelty-free professional hair elixirs and high-grade nail systems that nourish and protect your natural beauty.',
  },
  {
    id: 'atmosphere',
    icon: 'Heart',
    title: 'Serene Boutique Ambience',
    description:
      'Escape busy shopping malls. Our Terrace End studio offers a peaceful, fairy-lit sanctuary where you can truly unwind with tea and warm hospitality.',
  },
  {
    id: 'bespoke',
    icon: 'Smile',
    title: 'Custom Cute & Luxe Styles',
    description:
      'From timeless red carpet pearl French tips to expressive vibrant peekaboo color, we bring your unique dream look to life with joy and flair.',
  },
];

/**
 * CLIENT TESTIMONIALS
 * Generic first-name-only demo reviews illustrating typical customer feedback.
 * [DEMO TESTIMONIALS - CONFIRM WITH CLIENT]
 */
export const testimonials = [
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
];

/**
 * SALON OPENING HOURS
 * [PLACEHOLDER - CONFIRM WITH CLIENT]
 */
export const salonHours = [
  { days: 'Monday – Wednesday', hours: '9:00 AM – 5:30 PM' },
  { days: 'Thursday (Late Night)', hours: '9:00 AM – 7:30 PM' },
  { days: 'Friday', hours: '9:00 AM – 6:00 PM' },
  { days: 'Saturday', hours: '9:30 AM – 4:30 PM' },
  { days: 'Sunday', hours: 'Closed / By Special Appointment' },
];

/**
 * ABOUT THE FOUNDER COPY
 * [PLACEHOLDER NARRATIVE - CONFIRM WITH CLIENT]
 */
export const aboutStory = {
  eyebrow: 'Meet Your Stylist',
  heading: 'Wendyl Tagaan',
  role: 'Founder, Master Hair Stylist & Nail Artist',
  signature: 'Wendyl Tagaan',
  paragraphs: [
    'Norwen Beauty Salon was created with a clear, heartfelt vision: to provide Palmerston North with an intimate boutique sanctuary where beauty feels uplifting, personalized, and genuinely indulgent.',
    'Led by master stylist Wendyl Tagaan, our studio blends modern salon craftsmanship—from luminous multi-dimensional balayage to delicate, hand-embellished pearl nail art—with the warmth of a true neighborhood pampering experience.',
    'Whether you are visiting for a restorative blowout, an artistic vivid hair transformation, or custom kawaii nails that spark everyday joy, you will always receive our undivided attention, gentle care, and a warm cup of herbal tea.',
  ],
  quote: '“True beauty blooms when you give yourself permission to relax, recharge, and be pampered with love.”',
};
