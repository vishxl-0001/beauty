/**
 * =============================================================================
 * NORWEN BEAUTY SALON - IMAGE CATALOG & SECTION MAPPING
 * =============================================================================
 * Every image is analyzed, calibrated from a human point-of-view (POV),
 * and precisely matched to services, gallery items, testimonials, and brand sections.
 */

export const salonImages = {
  // Brand Logo & Mark
  logo: {
    id: 'logo',
    src: '/images/Norwen Beauty Salon Floral Logo.png',
    fallbackSrc: '/images/logo.png',
    alt: 'Norwen Beauty Salon floral emblem and elegant gold typography',
    title: 'Norwen Beauty Salon Brand Mark',
    section: 'Header, Hero Badge, Footer, Preloader, Admin',
    aspectRatio: '1/1',
  },

  // Owner Portrait - Calibrated for human eye-level eye contact
  owner: {
    id: 'owner',
    src: '/images/owner.png',
    alt: 'Wendyl (Wendy) Tagaan, founder and master beauty stylist at Norwen Beauty Salon',
    title: 'Wendyl Tagaan - Founder & Creative Director',
    section: 'About Section (Main Arch Portrait)',
    aspectRatio: '0.84',
    objectPosition: 'center 20%', // Human POV: face and eyes framed naturally in arch
  },

  // Storefront & Studio Location
  storefront: {
    id: 'storefront',
    src: '/images/salon.jpg',
    alt: 'Physical storefront sign for Norwen Salon with fairy lights at 98 Napier Road, Terrace End',
    title: 'Norwen Salon Storefront & Studio',
    section: 'Location & Contact, About Authenticity Stamp',
    aspectRatio: '1.33',
    objectPosition: 'center center',
  },

  // Live Salon In-Action Moments
  salonStylingMoment: {
    id: 'salon-styling-moment',
    src: '/images/Salon Styling Session with Curling Iron.png',
    alt: 'Wendyl expertly styling client hair with curling iron in salon',
    title: 'Curling Iron Artistry & Styling Session',
    category: 'styling',
    section: 'Hero Feature & Gallery',
    aspectRatio: '1363/1154',
    objectPosition: 'center 25%', // Human POV: hands and curling iron in action on locks
  },

  salonTreatmentMoment: {
    id: 'salon-treatment-moment',
    src: '/images/Salon Hair Treatment Moment.png',
    alt: 'Relaxing scalp wash and hair spa basin treatment at Norwen Beauty Salon',
    title: 'Hair Spa Scalp Basin Experience',
    category: 'hair',
    section: 'About Section & Gallery',
    aspectRatio: '1309/1202',
    objectPosition: 'center 30%', // Human POV: comfortable basin massage angle
  },

  // Specific Named Services Images (Analyzed and mapped to exact titles)
  haircutStyling: {
    id: 'service-haircut',
    src: '/images/Haircare(Haircut and Styling).png',
    alt: 'Precision haircut and voluminous layered blowout styling',
    title: 'Haircut and Styling',
    category: 'styling',
    section: 'Services (HairCare)',
    aspectRatio: '1/1',
    objectPosition: 'center 25%', // Human POV: highlights facial framing and hair volume
  },

  colorHighlights: {
    id: 'service-color',
    src: '/images/Haircare(Color and Highlights).png',
    alt: 'Rich golden blonde dimensional foil highlights and balayage',
    title: 'Color and Highlights',
    category: 'hair',
    section: 'Services (HairCare)',
    aspectRatio: '1/1',
    objectPosition: 'center 30%', // Human POV: crowns down through shimmering gradient tones
  },

  permStraightening: {
    id: 'service-perm',
    src: '/images/Haircare(Perm and Straightening).png',
    alt: 'Silky smooth keratin straightening and gloss bounce',
    title: 'Perm and Straightening',
    category: 'hair',
    section: 'Services (HairCare)',
    aspectRatio: '1/1',
    objectPosition: 'center 25%', // Human POV: showcases hair alignment and sleek texture
  },

  hairSpa: {
    id: 'service-hairspa',
    src: '/images/Treatments(Hair Spa).png',
    alt: 'Deep scalp acupressure massage and nourishing hair spa therapy',
    title: 'Hair Spa',
    category: 'treatments',
    section: 'Services (Treatments)',
    aspectRatio: '1/1',
    objectPosition: 'center 35%', // Human POV: soothing basin pampering
  },

  keratinTreatment: {
    id: 'service-keratin',
    src: '/images/Treatments(Keratin Treatment).png',
    alt: 'Mirror-shine keratin protein smoothing treatment sealing cuticles',
    title: 'Keratin Treatment',
    category: 'treatments',
    section: 'Services (Treatments)',
    aspectRatio: '1/1',
    objectPosition: 'center 30%', // Human POV: lustrous shine along hair strands
  },

  deepConditioning: {
    id: 'service-deepconditioning',
    src: '/images/Treatments(Deep Conditioning).png',
    alt: 'Intensive hydrating hair mask and lipid repair treatment',
    title: 'Deep Conditioning',
    category: 'treatments',
    section: 'Services (Treatments)',
    aspectRatio: '1/1',
    objectPosition: 'center 30%', // Human POV: rich conditioning formula being worked in
  },

  threading: {
    id: 'service-threading',
    src: '/images/Face Care(Threading).png',
    alt: 'Gentle facial threading for crisp eyebrow contouring and smooth skin',
    title: 'Threading',
    category: 'face',
    section: 'Services (Face Care)',
    aspectRatio: '1/1',
    objectPosition: 'center 35%', // Human POV: eyebrow arch and gentle thread precision
  },

  waxing: {
    id: 'service-waxing',
    src: '/images/BodyCare(waxing).png',
    alt: 'Gentle hygienic body waxing leaving silky soft skin',
    title: 'Waxing',
    category: 'body',
    section: 'Services (Body Care)',
    aspectRatio: '1/1',
    objectPosition: 'center 35%', // Human POV: delicate soothing application
  },

  manicurePedicure: {
    id: 'service-manicure-pedicure',
    src: '/images/NailCare(Manicure & Pedicure).jpeg',
    alt: 'Pampering manicure and rejuvenating foot spa pedicure with glossy polish',
    title: 'Manicure & Pedicure',
    category: 'nails',
    section: 'Services (Nail Care)',
    aspectRatio: '1/1',
    objectPosition: 'center 40%', // Human POV: pristine nail shaping and foot spa care
  },

  // Additional Portfolio Photography
  hairPurpleBalayage: {
    id: 'hair1',
    src: '/images/hair1.jpg',
    alt: 'Client smiling with vibrant violet peekaboo money-piece balayage on long dark waves',
    title: 'Violet Dimension Balayage',
    category: 'hair',
    section: 'Gallery',
    aspectRatio: '3/4',
    objectPosition: 'center 25%',
  },

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

  hairEmeraldUnderlights: {
    id: 'hair3',
    src: '/images/hair3.jpg',
    alt: 'Vibrant emerald green and turquoise peekaboo underlights on dark wavy hair',
    title: 'Emerald Wave Creative Underlights',
    category: 'hair',
    section: 'Why Choose Us Banner, Gallery',
    aspectRatio: '3/4',
    objectPosition: 'center 40%',
  },

  hairLayeredBlowout: {
    id: 'hair4',
    src: '/images/hair4.jpg',
    alt: 'Rich chocolate brunette blowout with voluminous flipped layers beside carved salon screen',
    title: 'Luxury Tiered Layer Blowout',
    category: 'styling',
    section: 'Gallery',
    aspectRatio: '1/1',
    objectPosition: 'center 35%',
  },

  hairBackBlowout: {
    id: 'hair5',
    src: '/images/hair5.jpg',
    alt: 'Cascading bounciness and healthy gloss of layered dark blowout curls from behind',
    title: 'Signature Gloss Waves',
    category: 'styling',
    section: 'Gallery',
    aspectRatio: '1/1',
    objectPosition: 'center 45%',
  },

  nailsCutePastel: {
    id: 'nails1',
    src: '/images/nails1.jpg',
    alt: 'Handcrafted pastel press-on tips with cute bunny art, ribbons, polka dots, and daisies',
    title: 'Kawaii Pastel Hand-Painted Nail Tips',
    category: 'nails',
    section: 'Gallery',
    aspectRatio: '4/5',
    objectPosition: 'center center',
  },

  nailsPearlFrench: {
    id: 'nails2',
    src: '/images/nails2.jpg',
    alt: 'Glossy almond French manicure adorned with delicate pearl bead embellishments',
    title: 'Luxe Pearl Almond French Manicure',
    category: 'nails',
    section: 'Hero Accent Chip, Gallery',
    aspectRatio: '1/1',
    objectPosition: 'center center',
  },

  nailsPopArtHeart: {
    id: 'nails3',
    src: '/images/nails3.jpg',
    alt: 'Pop-art comic style almond nails with bold black outlines and a glossy red heart accent',
    title: 'Pop-Art Red Heart Manicure',
    category: 'nails',
    section: 'Gallery',
    aspectRatio: '1/1',
    objectPosition: 'center center',
  },

  // Testimonials Proof Screenshots
  testimonialRhudna: {
    id: 'test-rhudna',
    src: '/images/testimonials/Rhudna Honey.png',
    alt: 'Verified client review from Rhudna Honey praising Wendy for affordable hair color',
    title: 'Review by Rhudna Honey',
    section: 'Testimonials Proof',
    aspectRatio: '1513/1040',
    objectPosition: 'center center',
  },

  testimonialMarites: {
    id: 'test-marites',
    src: '/images/testimonials/Marites Alamil.png',
    alt: 'Verified client review from Marites Alamil praising Wendy for foot spa and pedicure',
    title: 'Review by Marites Alamil',
    section: 'Testimonials Proof',
    aspectRatio: '1511/1041',
    objectPosition: 'center center',
  },

  testimonialDC: {
    id: 'test-dc',
    src: '/images/testimonials/DC.png',
    alt: 'Verified client review from DC praising Wendy for regular haircuts and affordability',
    title: 'Review by DC',
    section: 'Testimonials Proof',
    aspectRatio: '1509/1042',
    objectPosition: 'center center',
  },
};

/**
 * Rich Living Gallery catalog containing all salon imagery
 */
export const galleryItems = [
  {
    ...salonImages.hairHoneyBlonde,
    categoryName: 'Hair & Color',
    filter: 'hair',
    subtitle: 'Sun-kissed champagne dimensional foil work & gloss glaze',
    badge: 'Signature Style',
  },
  {
    ...salonImages.colorHighlights,
    categoryName: 'Hair & Color',
    filter: 'hair',
    subtitle: 'Luminous multidimensional highlights tailored to complexion',
    badge: 'Guest Love',
  },
  {
    ...salonImages.salonStylingMoment,
    categoryName: 'Styling & Cuts',
    filter: 'styling',
    subtitle: 'Live curling iron styling session in our Terrace End studio',
    badge: 'In Action',
  },
  {
    ...salonImages.manicurePedicure,
    categoryName: 'Nails & Art',
    filter: 'nails',
    subtitle: 'Rejuvenating foot spa soak, cuticle care & glossy pedicure',
    badge: 'Guest Love',
  },
  {
    ...salonImages.haircutStyling,
    categoryName: 'Styling & Cuts',
    filter: 'styling',
    subtitle: 'Precision shaping and soft layered bounce blow-dry',
    badge: 'Starts at $25',
  },
  {
    ...salonImages.nailsPearlFrench,
    categoryName: 'Nails & Art',
    filter: 'nails',
    subtitle: 'Hand-set micro pearls on sheer nude almond tips',
    badge: 'Most Requested',
  },
  {
    ...salonImages.salonTreatmentMoment,
    categoryName: 'Treatments',
    filter: 'hair',
    subtitle: 'Deep botanical hydration & invigorating scalp basin therapy',
    badge: 'Restorative',
  },
  {
    ...salonImages.hairLayeredBlowout,
    categoryName: 'Styling & Cuts',
    filter: 'styling',
    subtitle: 'Signature 90s bouncy layered blowout with heat seal',
    badge: 'Popular',
  },
  {
    ...salonImages.keratinTreatment,
    categoryName: 'Treatments',
    filter: 'hair',
    subtitle: 'Anti-humidity protein smoothing therapy for glass-like shine',
    badge: 'Starts at $80',
  },
  {
    ...salonImages.threading,
    categoryName: 'Face & Body',
    filter: 'studio',
    subtitle: 'Gentle facial threading for clean, sculpted eyebrow contours',
    badge: 'Precision',
  },
  {
    ...salonImages.hairPurpleBalayage,
    categoryName: 'Hair & Color',
    filter: 'hair',
    subtitle: 'Custom violet money-piece with seamless melt',
    badge: 'Creative Color',
  },
  {
    ...salonImages.nailsCutePastel,
    categoryName: 'Nails & Art',
    filter: 'nails',
    subtitle: 'Bespoke hand-painted characters & pastel florals',
    badge: 'Cute & Playful',
  },
  {
    ...salonImages.waxing,
    categoryName: 'Face & Body',
    filter: 'studio',
    subtitle: 'Skin-calming hygienic body waxing with gentle aftercare',
    badge: 'Silky Smooth',
  },
  {
    ...salonImages.nailsPopArtHeart,
    categoryName: 'Nails & Art',
    filter: 'nails',
    subtitle: 'Bold graphic line art with glossy red heart center',
    badge: 'Trend Alert',
  },
  {
    ...salonImages.owner,
    categoryName: 'Studio & Team',
    filter: 'studio',
    subtitle: 'Founder & Master Stylist Wendyl Tagaan welcoming you',
    badge: 'Meet Wendy',
  },
  {
    ...salonImages.storefront,
    categoryName: 'Studio & Team',
    filter: 'studio',
    subtitle: 'Our welcoming salon boutique at 98 Napier Road, Terrace End',
    badge: 'Our Studio',
  },
];
