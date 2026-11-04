/**
 * =============================================================================
 * NORWEN BEAUTY SALON - EDITABLE CONTENT REPOSITORY
 * =============================================================================
 * Real confirmed salon services, verified pricing, authentic client reviews,
 * and opening hours for Wendyl ("Wendy") Tagaan at Norwen Beauty Salon.
 */

export const businessDetails = {
  name: 'Norwen Beauty Salon',
  tagline: 'Where Beauty Meets Elegance',
  subheadline:
    'Experience bespoke hair design, rich dimensional color, restorative hair spa rituals, relaxing foot care, and gentle beauty treatments with Wendy in Terrace End, Palmerston North.',
  owner: 'Wendyl Tagaan',
  ownerNickname: 'Wendy',
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
  web3formsAccessKey: '',
  googleMapsUrl:
    'https://maps.google.com/maps?q=98+Napier+Road,+Terrace+End,+Palmerston+North+4410,+New+Zealand&t=&z=15&ie=UTF8&iwloc=&output=embed',
  copyrightYear: 2026,
};

// Trust badges & marquee keywords
export const marqueeItems = [
  'Haircut & Styling',
  'Color & Highlights',
  'Perm & Straightening',
  'Hair Spa & Keratin',
  'Deep Conditioning',
  'Threading & Waxing',
  'Manicure & Pedicure',
  'We Care For Our Clients & Our People',
];

export const trustChips = [
  'Terrace End, Palmerston North',
  'Affordable & Beautiful Haircare',
  'One-on-One Care with Wendy',
  'We Take Care of Our Clients',
];

// Salon Stats
export const salonStats = [
  { value: 1250, suffix: '+', label: 'Happy Glow-Ups', helper: 'Devoted local guests' },
  { value: 9, suffix: '+', label: 'Years Artistry', helper: 'Skilled styling & beauty care' },
  { value: 3400, suffix: '+', label: 'Treatments Given', helper: 'Cuts, colors, spa & nails' },
  { value: 100, suffix: '%', label: 'Heartfelt Care', helper: 'Warm, unhurried attention' },
];

/**
 * SALON SERVICES & VERIFIED PRICING
 * Exactly as provided by client with matching named images and human POV framing
 */
export const salonServices = [
  {
    id: 'haircut-styling',
    title: 'Haircut and Styling',
    category: 'HairCare',
    price: 'Starts at $25',
    duration: '45 - 60 mins',
    image: '/images/Haircare(Haircut and Styling).png',
    objectPosition: 'center 25%',
    badge: 'Popular',
    description:
      'Professional precision haircut tailored to your natural hair texture and face shape, finished with a fresh, bouncy blow-dry style.',
    perks: ['Personal hair consultation', 'Scalp wash & prep', 'Bouncy blow-dry styling'],
  },
  {
    id: 'color-highlights',
    title: 'Color and Highlights',
    category: 'HairCare',
    price: 'Starts at $80',
    duration: '2 - 3.5 hrs',
    image: '/images/Haircare(Color and Highlights).png',
    objectPosition: 'center 30%',
    badge: 'Client Favorite',
    description:
      'Luminous dimensional foils, seamless balayage, or vibrant full color coverage tailored to brighten your complexion and add healthy radiance.',
    perks: ['Custom shade formulation', 'Radiant gloss glaze toner', 'Affordable luxury color'],
  },
  {
    id: 'perm-straightening',
    title: 'Perm and Straightening',
    category: 'HairCare',
    price: 'Starts at $70',
    duration: '2 - 3 hrs',
    image: '/images/Haircare(Perm and Straightening).png',
    objectPosition: 'center 25%',
    badge: 'Texture Mastery',
    description:
      'Transform your natural hair: gorgeous bouncy, defined curls with a gentle perm, or ultra-silky, smooth chemical straightening for easy daily styling.',
    perks: ['Gentle softening formula', 'Heat protectant seal', 'Long-lasting wave or silk finish'],
  },
  {
    id: 'hair-spa',
    title: 'Hair Spa',
    category: 'Treatments',
    price: 'Starts at $60',
    duration: '45 mins',
    image: '/images/Treatments(Hair Spa).png',
    objectPosition: 'center 35%',
    badge: 'Restorative',
    description:
      'A deeply restorative spa ritual combining rich botanical moisture with an invigorating scalp massage to revive dull, stressed, or dry tresses.',
    perks: ['Invigorating scalp acupressure', 'Warm herbal steam wrap', 'Intensive hydration therapy'],
  },
  {
    id: 'keratin-treatment',
    title: 'Keratin Treatment',
    category: 'Treatments',
    price: 'Starts at $80',
    duration: '2 - 2.5 hrs',
    image: '/images/Treatments(Keratin Treatment).png',
    objectPosition: 'center 30%',
    badge: 'Anti-Frizz Shine',
    description:
      'Intensive protein smoothing therapy that seals damaged cuticles, eliminates stubborn humidity frizz, and imparts radiant glass-like shine.',
    perks: ['Eliminates 95% of frizz', 'Dramatically cuts drying time', 'Results last for months'],
  },
  {
    id: 'deep-conditioning',
    title: 'Deep Conditioning',
    category: 'Treatments',
    price: 'Starts at $40',
    duration: '30 mins',
    image: '/images/Treatments(Deep Conditioning).png',
    objectPosition: 'center 30%',
    badge: 'Quick Glow',
    description:
      'Instant targeted hydration and lipid replenishment to restore softness, combability, and healthy bounce to dry or heat-styled hair.',
    perks: ['Protein & lipid infusion', 'Instant detangling & gloss', 'Scalp soothing massage'],
  },
  {
    id: 'threading',
    title: 'Threading',
    category: 'Face Care',
    price: 'Starts at $30',
    duration: '20 - 30 mins',
    image: '/images/Face Care(Threading).png',
    objectPosition: 'center 35%',
    badge: 'Precision Shape',
    description:
      'Gentle, ultra-precise facial hair threading for crisp, clean eyebrow shaping, upper lip, and facial grooming without chemicals or harsh peeling.',
    perks: ['Gentle on sensitive skin', 'Razor-sharp brow contouring', 'Soothing aloe vera aftercare'],
  },
  {
    id: 'waxing',
    title: 'Waxing',
    category: 'Body Care',
    price: 'Starts at $30',
    duration: '30 - 45 mins',
    image: '/images/BodyCare(waxing).png',
    objectPosition: 'center 35%',
    badge: 'Silky Smooth',
    description:
      'Hygienic, comfortable body waxing using premium skin-calming wax formulas for silky, touchable smoothness that lasts for weeks.',
    perks: ['Hygienic single-use applicators', 'Pre & post-wax calming elixirs', 'Silky, long-lasting results'],
  },
  {
    id: 'manicure-pedicure',
    title: 'Manicure & Pedicure',
    category: 'Nail Care',
    price: 'Starts at $25',
    duration: '45 - 60 mins',
    image: '/images/NailCare(Manicure & Pedicure).jpeg',
    objectPosition: 'center 40%',
    badge: 'Natural Nails Only',
    description:
      'Pampering natural nail cleaning, meticulous cuticle care, soothing foot spa massage, and a clean, healthy natural finish. (Natural nail cleaning and foot care only, no nail art designs).',
    perks: ['Natural nail cleaning & shaping', 'Relaxing foot spa & foot massage', 'Nourishing cuticle care & clean finish'],
  },
];

// Why Choose Norwen Highlights
export const whyChooseUs = [
  {
    id: 'artisan',
    icon: 'Sparkles',
    title: 'Affordable & High Quality',
    description:
      'Exceptional salon-quality haircuts, vivid colors, and spa treatments at accessible prices everyone in Palmerston North can enjoy.',
  },
  {
    id: 'quality',
    icon: 'Crown',
    title: 'We Care For Our Clients',
    description:
      '“We take care of our clients and our people.” Wendyl listens attentively to your wishes so you always leave feeling refreshed and delighted.',
  },
  {
    id: 'atmosphere',
    icon: 'Heart',
    title: 'Serene Boutique Sanctuary',
    description:
      'An intimate, fairy-lit salon on Napier Road where you can completely unwind with warm tea, foot spa therapy, and personalized pampering.',
  },
  {
    id: 'bespoke',
    icon: 'Smile',
    title: 'Full Head-to-Toe Beauty',
    description:
      'From haircuts and keratin treatments to manicures, pedicures, threading, and waxing—everything you need in one friendly local studio.',
  },
];

/**
 * AUTHENTIC CLIENT TESTIMONIALS
 * Real verified guest feedback for Wendy with proof screenshot images
 */
export const testimonials = [
  {
    id: 1,
    name: 'Rhudna Honey',
    location: 'Palmerston North',
    treatment: 'Color and Highlights',
    rating: 5,
    quote:
      '100 percent very legitimate, I love my hair color and it was very affordable. Please book wendy, if you are looking for an affordable and beautiful hair color.',
    date: 'Verified Client',
    proofImage: '/images/testimonials/Rhudna Honey.png',
  },
  {
    id: 2,
    name: 'Marites Alamil',
    location: 'Terrace End',
    treatment: 'Foot Spa Massage & Pedicure',
    rating: 5,
    quote:
      'Wendy did it very well in taking care of my feet, the foot spa massage and pedicure is really great, That’s why I always come back for an appointment. Thank You Wendy .',
    date: 'Verified Client',
    proofImage: '/images/testimonials/Marites Alamil.png',
  },
  {
    id: 3,
    name: 'DC',
    location: 'Palmerston North',
    treatment: 'Regular Haircut & Styling',
    rating: 5,
    quote:
      'Wendy always take care of my hair when it comes to regular haircuts, I save a lot of money while having a good hair cut.',
    date: 'Verified Client',
    proofImage: '/images/testimonials/DC.png',
  },
];

/**
 * SALON OPENING HOURS
 * Exact schedule provided by client
 */
export const salonHours = [
  { days: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
  { days: 'Saturday & Sunday', hours: '2:30 PM – 8:00 PM' },
];

/**
 * ABOUT THE FOUNDER COPY
 */
export const aboutStory = {
  eyebrow: 'Meet Your Stylist',
  heading: 'Wendyl (Wendy) Tagaan',
  role: 'Founder, Master Hair Stylist & Beauty Artist',
  signature: 'Wendyl Tagaan',
  paragraphs: [
    'Norwen Beauty Salon was created with a clear, heartfelt motto: “We take care of our clients and our people.” Located in Terrace End, Palmerston North, Wendy welcomes every guest like family.',
    'Whether you need a quick regular haircut, a beautiful affordable color transformation, a soothing foot spa with pedicure, or gentle facial threading and waxing, Wendy takes personal pride in delivering top-tier care without salon markups.',
    'Step into our friendly boutique sanctuary, relax in a calm environment, and let us help you look and feel your absolute best.',
  ],
  quote: '“We take care of our clients and our people — beautiful care should always be heartfelt and affordable.”',
};
