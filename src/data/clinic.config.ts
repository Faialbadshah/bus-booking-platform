import type { ClinicConfig } from '@/types/clinic';

// ─────────────────────────────────────────────────────
// PER-CLINIC DATA FILE
// To build for a new clinic: edit everything below +
// drop in real photos. No component code changes needed.
// ─────────────────────────────────────────────────────

export const clinic: ClinicConfig = {
  brand: {
    name: 'Smile Studio',
    tagline: 'See your smile transformation before you book.',
    phone: '919199000000', // E.164 without +, for wa.me link
    address: '42, MG Road, Koramangala, Bengaluru 560034',
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.6!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSmile+Studio!5e0!3m2!1sen!2sin!4v0',
    hours: 'Mon–Sat  10 am – 9 pm  |  Sun  11 am – 5 pm',
    googleReviewCount: 424,
    googleRating: 4.9,
  },

  tokens: {
    colorAccent: '#C7A271',   // champagne — warmth + premium
    colorAction: '#1F5E57',   // teal — healthy, converts
    colorCanvas: '#F6F4F0',   // enamel — clean trustworthy canvas
    colorInk: '#1B1A22',      // deep near-black
    fontDisplay: 'Fraunces',  // soft optical serif
    fontBody: 'Inter',
    logoUrl: '/logo.svg',
  },

  trust: [
    {
      icon: 'microscope',
      title: 'Advanced technology',
      line: 'Digital X-rays, CEREC same-day crowns, and 3D smile preview before any work begins.',
    },
    {
      icon: 'shield',
      title: 'Sterilisation you can see',
      line: 'Autoclave-certified instruments, single-use consumables, and open-door hygiene checks.',
    },
    {
      icon: 'award',
      title: '12+ years of cosmetic cases',
      line: 'Over 3,000 smile transformations across veneers, implants, and aligners.',
    },
    {
      icon: 'clock',
      title: 'Same-day appointments',
      line: 'Most cosmetic consultations available within 24 hours, zero wait-list.',
    },
  ],

  doctors: [
    {
      name: 'Dr. Priya Nair',
      creds: 'MDS — Prosthodontics & Implantology | 12 yrs',
      bio: 'Trained at Manipal College of Dental Sciences. Fellowship in Aesthetic Dentistry, New York. 3,000+ smile cases. She photographs every result, and that before-and-after gallery is this site.',
      photo: '/placeholders/doctor.svg',
    },
    {
      name: 'Dr. Arjun Mehta',
      creds: 'BDS — Orthodontics | 8 yrs',
      bio: 'Specialist in clear aligners and braces for adults. His motto: finish faster than you expected, keep it for life.',
      photo: '/placeholders/doctor.svg',
    },
  ],

  procedures: [
    {
      id: 'gaps',
      problemLabel: 'Gaps in my front teeth',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Composite bonding / Veneers',
      whatItIs:
        'A tooth-coloured resin or ultra-thin ceramic shell bonded directly to the front of the tooth, closing the gap in a single visit.',
      whoItsFor:
        'Anyone with a visible space between the two upper front teeth (or multiple gaps), who wants a same-day fix without braces.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹8,000 – ₹15,000 per tooth',
      recovery: 'Same day — eat normally within 2 hours',
      faq: [
        { q: 'Does it hurt?', a: 'No. Bonding requires no drilling, no injections. You will feel gentle polishing and light curing.' },
        { q: 'How long does it last?', a: 'Composite bonding lasts 5–7 years with normal care. Porcelain veneers last 12–15 years.' },
      ],
    },
    {
      id: 'stained',
      problemLabel: 'My teeth look stained',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Professional teeth whitening',
      whatItIs:
        'A clinical-grade peroxide gel activated by LED light, lifting stains 8–10 shades in one 60-minute session.',
      whoItsFor:
        'Anyone whose teeth have yellowed from coffee, tea, wine, or tobacco — and who wants instant visible results without a tray kit.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹6,000 – ₹12,000',
      recovery: 'Avoid staining food for 48 hours. No downtime.',
      faq: [
        { q: 'Will my teeth become sensitive?', a: 'Some mild sensitivity for 24 hours is common. We apply a desensitising gel that cuts this significantly.' },
        { q: 'How long do results last?', a: '1–2 years with normal diet. Top-up sessions are much cheaper.' },
      ],
    },
    {
      id: 'crooked',
      problemLabel: 'Crooked smile',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Clear aligners (Invisalign / local)',
      whatItIs:
        'A series of custom, removable clear trays that move teeth 0.25 mm at a time — invisible in conversation and out for eating.',
      whoItsFor:
        'Adults and teens with mild-to-moderate crowding or spacing who want to straighten teeth without metal brackets.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹60,000 – ₹1,50,000 (full course)',
      recovery: 'No recovery. Wear 22 hrs/day; average treatment 6–18 months.',
      faq: [
        { q: 'Can I eat normally?', a: 'Yes. Remove the trays to eat and drink anything except water.' },
        { q: "What's the difference between Invisalign and other aligners?", a: 'Invisalign has the most clinical data. Local brands cost less and work well for simpler cases. We\'ll recommend based on your X-ray.' },
      ],
    },
    {
      id: 'missing',
      problemLabel: 'I\'m missing a tooth',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Dental implant',
      whatItIs:
        'A titanium screw placed in the jawbone that acts as an artificial root, topped with a natural-looking ceramic crown.',
      whoItsFor:
        'Anyone with a single missing tooth who wants a permanent solution that looks, feels, and functions like a real tooth.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹30,000 – ₹60,000 (implant + crown)',
      recovery: '3–6 months for implant to fuse; crown placed on top in a single later appointment.',
      faq: [
        { q: 'Is the surgery painful?', a: 'No. Done under local anaesthesia. Post-op: mild soreness for 2–3 days, managed with over-the-counter pain relief.' },
        { q: 'How long does an implant last?', a: 'Implants are designed to be lifetime replacements. The crown on top may need replacement after 15–20 years.' },
      ],
    },
    {
      id: 'yellow',
      problemLabel: 'Yellow teeth',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Power whitening + enamel polish',
      whatItIs:
        'Combination of high-concentration in-chair whitening and micro-abrasion polish to remove surface yellow layer.',
      whoItsFor: 'Anyone whose natural tooth colour has shifted yellow with age or habits.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹7,000 – ₹14,000',
      recovery: 'No downtime. Avoid turmeric and red wine for 48 hours.',
      faq: [
        { q: 'Are results permanent?', a: 'Whitening is not permanent, but touch-up sessions maintain the result easily.' },
      ],
    },
    {
      id: 'chipped',
      problemLabel: 'Chipped tooth',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Composite resin repair',
      whatItIs:
        'Tooth-coloured resin sculpted directly onto the chipped area, shaped, and cured with UV light — finished in under an hour.',
      whoItsFor: 'Anyone with a small chip from an accident, nail-biting, or biting hard food.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹2,000 – ₹6,000',
      recovery: 'Same day. Avoid biting hard objects directly on the repair.',
      faq: [
        { q: 'Will people notice the repair?', a: 'No — the resin is colour-matched to your exact tooth shade.' },
      ],
    },
    {
      id: 'gummy',
      problemLabel: 'Too much gum when I smile',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Gum contouring (laser)',
      whatItIs:
        'A diode laser reshapes the gum line in a single 30-minute session, revealing more of each tooth and balancing the smile.',
      whoItsFor:
        'Anyone who feels their gums cover too much of their teeth when they smile — known as a gummy smile.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹8,000 – ₹20,000',
      recovery: '3–5 days of mild soreness. Full healing in 2 weeks.',
      faq: [
        { q: 'Is it painful?', a: 'The area is numbed before treatment. The laser also seals as it cuts, so there\'s minimal bleeding.' },
      ],
    },
    {
      id: 'whiter',
      problemLabel: 'I want whiter teeth',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Take-home whitening kit (custom trays)',
      whatItIs:
        'Custom-fit trays filled with a professional-grade whitening gel you wear for 30–60 minutes daily at home.',
      whoItsFor:
        'Anyone who wants to whiten gradually and maintain results themselves, without repeated clinic visits.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹4,000 – ₹8,000',
      recovery: 'No downtime. Results visible in 7–10 days.',
      faq: [
        { q: 'Why custom trays and not strips?', a: 'Custom trays cover every surface evenly. Store strips miss the edges and can cause uneven whitening.' },
      ],
    },
    {
      id: 'old-fillings',
      problemLabel: 'Old silver fillings showing',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Tooth-coloured composite / ceramic inlays',
      whatItIs:
        'Old amalgam fillings removed and replaced with white composite or ceramic inlays that blend with your natural tooth colour.',
      whoItsFor:
        'Anyone whose dark fillings are visible when they talk or laugh, or who is concerned about older amalgam material.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹3,000 – ₹10,000 per tooth',
      recovery: 'Same day. Mild sensitivity for 24 hours is normal.',
      faq: [
        { q: 'Is mercury removal safe?', a: 'Yes — we follow SMART protocol (Safe Amalgam Removal Technique) with rubber dam and high-volume evacuation.' },
      ],
    },
    {
      id: 'crowded',
      problemLabel: 'Crowded / overlapping teeth',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Clear aligners or fixed braces',
      whatItIs:
        'A planned sequence of movements — either via clear trays or traditional brackets — to create space and align each tooth.',
      whoItsFor: 'Anyone with overlapping front teeth who has never had orthodontic treatment, or whose teeth have shifted after prior treatment.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹45,000 – ₹1,20,000',
      recovery: 'No recovery. Expect 8–24 months depending on the case.',
      faq: [
        { q: "What if I've had braces before?", a: 'Relapse is common. A retainer and a short aligner course usually restores alignment.' },
      ],
    },
    {
      id: 'uneven',
      problemLabel: 'Uneven or short teeth',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Porcelain veneers',
      whatItIs:
        'Ultra-thin ceramic shells (0.5 mm) bonded to the front surface of teeth, instantly correcting size, shape, and colour.',
      whoItsFor:
        'Anyone who wants a comprehensive smile design — changing the shape, length, and colour of multiple teeth at once.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹12,000 – ₹25,000 per tooth',
      recovery: '2 visits over 2 weeks. Mild sensitivity while temporaries are in place.',
      faq: [
        { q: 'Do I have to shave my teeth?', a: 'We remove 0.5 mm of enamel — roughly the thickness of a contact lens. This is minimal and permanent, which is why veneers are a considered decision.' },
        { q: 'How long do veneers last?', a: '12–15 years with normal care. Avoid biting nails, bottle caps, or ice.' },
      ],
    },
    {
      id: 'sensitivity',
      problemLabel: 'Sensitive / painful teeth',
      tileImage: '/placeholders/tile.svg',
      procedureName: 'Desensitisation + root cause diagnosis',
      whatItIs:
        'A full diagnostic session to identify the cause (gum recession, enamel wear, cracked tooth) followed by targeted treatment.',
      whoItsFor: 'Anyone who winces at cold drinks, sweet food, or brushing — especially if it has been going on for weeks.',
      beforeImg: '/placeholders/before.svg',
      afterImg: '/placeholders/after.svg',
      costRange: '₹1,500 – ₹5,000 (diagnosis + first treatment)',
      recovery: 'Depends on cause. Many cases resolve in one appointment.',
      faq: [
        { q: 'Can I keep using my sensitivity toothpaste?', a: 'Sensitivity toothpaste masks the symptom. It is better to find and treat the cause so the sensitivity does not worsen.' },
      ],
    },
  ],

  faq: [
    {
      q: 'How do I know which treatment is right for me?',
      a: 'Book a free 20-minute consultation. We take photos and an X-ray (if needed) and show you a digital smile preview. No obligation to proceed.',
    },
    {
      q: 'How much does a cosmetic procedure cost?',
      a: 'Costs vary widely by treatment and case complexity. See each procedure card for realistic ranges. We never quote a final price without examining you first.',
    },
    {
      q: 'Will it hurt?',
      a: 'Most cosmetic treatments (whitening, bonding, veneers) require no injections. For implants and extractions, local anaesthesia is used. Post-procedure discomfort is typically mild and managed with standard pain relief.',
    },
    {
      q: 'How many visits will I need?',
      a: 'Whitening and bonding: 1 visit. Veneers: 2 visits. Implants: 2–3 visits over 3–6 months. Clear aligners: 1 fitting visit + periodic check-ins every 6–8 weeks.',
    },
    {
      q: 'Do you offer payment plans?',
      a: 'Yes — 0% EMI for 3–12 months on treatments above ₹15,000, via most major credit cards and BNPL apps.',
    },
  ],
};
