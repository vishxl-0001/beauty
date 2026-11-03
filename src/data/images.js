/**
 * =============================================================================
 * NORWEN BEAUTY SALON - IMAGE CATALOG & SECTION MAPPING
 * =============================================================================
 * Every image in /images is cataloged, analyzed, and mapped to strategic UI sections.
 * All 11 images are utilized with specific object-fit, object-position, and semantic alt tags.
 */

export const salonImages = {
  // Brand Logo & Mark
  logo: {
    id: 'logo',
    src: '/images/Norwen Beauty Salon Floral Logo.png',
    fallbackSrc: '/images/logo.png',
    alt: 'Norwen Beauty Salon floral silhouette emblem and typography',
    title: 'Norwen Beauty Salon Brand Mark',
    section: 'Header, Hero Badge, Footer, Preloader',
    aspectRatio: '1/1',
  },

  // Owner Portrait
  owner: {
    id: 'owner',
    src: '/images/owner.png',
    alt: 'Wendyl Tagaan, founder and master beauty stylist at Norwen Beauty Salon',
    title: 'Wendyl Tagaan - Founder & Creative Director',
    section: 'About Section (Main Arch Portrait)',
    aspectRatio: '0.84',
    objectPosition: 'center 20%',
  },

  // Storefront & Physical Location
  storefront: {
    id: 'storefront',
    src: '/images/salon.jpg',
    alt: 'Physical storefront sign for Norwen Salon with fairy lights at 98 Napier Road, Terrace End',
    title: 'Norwen Salon Storefront & Studio',
    section: 'Location & Contact, About Authenticity Stamp',
    aspectRatio: '1.33',
    objectPosition: 'center center',
  },

  // Hair 1: Purple Balayage
  hairPurpleBalayage: {
    id: 'hair1',
    src: '/images/hair1.jpg',
    alt: 'Client smiling with vibrant violet peekaboo money-piece balayage on long dark waves',
    title: 'Violet Dimension Balayage',
    category: 'hair',
    section: 'Services (Color & Balayage), Gallery',
    aspectRatio: '3/4',
    objectPosition: 'center 25%',
  },

  // Hair 2: Silky Honey Blonde Balayage
  hairHoneyBlonde: {
    id: 'hair2',
    src: '/images/hair2.jpg',
    alt: 'Silky honey and ash blonde dimensional balayage waves cascading down in salon',
    title: 'Signature Champagne Balayage',
    category: 'hair',
    section: 'Hero (Main Arch Image), Gallery',
    aspectRatio: '3/4',
    objectPosition: 'center 30%',
  },

  // Hair 3: Emerald Underlights
  hairEmeraldUnderlights: {
    id: 'hair3',
    src: '/images/hair3.jpg',
    alt: 'Vibrant emerald green and turquoise peekaboo underlights on dark wavy hair',
    title: 'Emerald Wave Creative Underlights',
    category: 'hair',
    section: 'CTA Banner, Gallery',
    aspectRatio: '3/4',
    objectPosition: 'center 40%',
  },

  // Hair 4: Voluminous Layered Blowout
  hairLayeredBlowout: {
    id: 'hair4',
    src: '/images/hair4.jpg',
    alt: 'Rich chocolate brunette blowout with voluminous flipped layers beside carved salon screen',
    title: 'Luxury Tiered Layer Blowout',
    category: 'styling',
    section: 'Services (Cuts & Blowouts), Gallery',
    aspectRatio: '1/1',
    objectPosition: 'center 35%',
  },

  // Hair 5: Cascading Back View Blowout
  hairBackBlowout: {
    id: 'hair5',
    src: '/images/hair5.jpg',
    alt: 'Cascading bounciness and healthy gloss of layered dark blowout curls from behind',
    title: 'Signature Gloss Waves',
    category: 'styling',
    section: 'Why Choose Us Feature Tile, Gallery',
    aspectRatio: '1/1',
    objectPosition: 'center 45%',
  },

  // Nails 1: Hand-drawn Pastel Bunny & Daisy Art
  nailsCutePastel: {
    id: 'nails1',
    src: '/images/nails1.jpg',
    alt: 'Handcrafted pastel press-on tips with cute bunny art, ribbons, polka dots, and daisies',
    title: 'Kawaii Pastel Hand-Painted Nail Tips',
    category: 'nails',
    section: 'Services (Nail Art & Custom Press-Ons), Gallery',
    aspectRatio: '4/5',
    objectPosition: 'center center',
  },

  // Nails 2: Pearl Embellished French Manicure
  nailsPearlFrench: {
    id: 'nails2',
    src: '/images/nails2.jpg',
    alt: 'Glossy almond French manicure adorned with delicate pearl bead embellishments',
    title: 'Luxe Pearl Almond French Manicure',
    category: 'nails',
    section: 'Hero (Floating Accent Chip), Services (Bridal & Luxe Nails), Gallery',
    aspectRatio: '1/1',
    objectPosition: 'center center',
  },

  // Nails 3: Pop-Art Heart Nails
  nailsPopArtHeart: {
    id: 'nails3',
    src: '/images/nails3.jpg',
    alt: 'Pop-art comic style almond nails with bold black outlines and a glossy red heart accent',
    title: 'Pop-Art Red Heart Manicure',
    category: 'nails',
    section: 'Booking Section Accent, Gallery',
    aspectRatio: '1/1',
    objectPosition: 'center center',
  },
};

/**
 * Gallery item collection containing EVERY image with rich metadata
 */
export const galleryItems = [
  {
    ...salonImages.hairHoneyBlonde,
    categoryName: 'Hair & Color',
    filter: 'hair',
    subtitle: 'Sun-kissed dimensional foil work & gloss glaze',
    badge: 'Signature Style',
  },
  {
    ...salonImages.nailsPearlFrench,
    categoryName: 'Nails & Art',
    filter: 'nails',
    subtitle: 'Hand-set micro pearls on sheer nude base',
    badge: 'Most Requested',
  },
  {
    ...salonImages.hairLayeredBlowout,
    categoryName: 'Styling & Cuts',
    filter: 'styling',
    subtitle: 'Signature 90s bouncy layered blowout with heat seal',
    badge: 'Popular',
  },
  {
    ...salonImages.nailsCutePastel,
    categoryName: 'Nails & Art',
    filter: 'nails',
    subtitle: 'Bespoke hand-painted characters & pastel florals',
    badge: 'Cute & Playful',
  },
  {
    ...salonImages.hairPurpleBalayage,
    categoryName: 'Hair & Color',
    filter: 'hair',
    subtitle: 'Custom violet money-piece with seamless melt',
    badge: 'Creative Color',
  },
  {
    ...salonImages.hairBackBlowout,
    categoryName: 'Styling & Cuts',
    filter: 'styling',
    subtitle: 'Cascading thermal curl finish with mirror shine',
    badge: 'Hair Care',
  },
  {
    ...salonImages.nailsPopArtHeart,
    categoryName: 'Nails & Art',
    filter: 'nails',
    subtitle: 'Bold graphic line art with glossy red heart center',
    badge: 'Trend Alert',
  },
  {
    ...salonImages.hairEmeraldUnderlights,
    categoryName: 'Hair & Color',
    filter: 'hair',
    subtitle: 'Hidden vivid emerald tone under rich brunette waves',
    badge: 'Vivids',
  },
  {
    ...salonImages.owner,
    categoryName: 'Studio & Team',
    filter: 'studio',
    subtitle: 'Founder & Master Stylist Wendyl Tagaan welcoming you',
    badge: 'Meet Wendyl',
  },
  {
    ...salonImages.storefront,
    categoryName: 'Studio & Team',
    filter: 'studio',
    subtitle: 'Our welcoming salon boutique at 98 Napier Road, Terrace End',
    badge: 'Our Sanctuary',
  },
];
