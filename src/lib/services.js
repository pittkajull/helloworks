/**
 * Data 5 layanan HelloWorks — dipakai di section Services (baris bisa diklik)
 * dan halaman layanan (/services/:slug).
 *
 * Setiap layanan punya: hero (headline English + sub lokal), scope (yang
 * kami kerjain), works (karya pilihan), dan CTA. Konten dua bahasa ({ id, en })
 * karena bentuknya terstruktur — sama seperti members.js.
 *
 * Semua konten masih DRAFT/placeholder — ganti sesuai data asli (project,
 * contoh karya, dan deskripsi layanan yang beneran).
 */

export const SERVICES = [
  {
    slug: 'website',
    num: '01',
    title: 'Custom Website',
    descKey: 'services.d1',
    hero: { head1: 'Websites', head2: 'with a', accent: 'story.' },
    decoWords: ['Landing pages', 'Company profile', 'Personal sites', 'Microsites'],
    marquee: ['Landing pages', 'Company profile', 'Personal sites', 'Microsites'],
    heroSub: {
      id: 'Website yang gak cuma bagus dilihat, tapi punya cerita dan fungsi serius — dari landing page bisnis sampai website personal.',
      en: "Websites that aren't just good-looking — they tell a story and do real work, from business landing pages to personal sites.",
    },
    mascot: { id: 'Mau bikin website?', en: 'Need a website?' },
    scopeHead: { id: 'Yang kami kerjain.', en: 'What we do.' },
    scope: [
      {
        t: { id: 'Landing page bisnis', en: 'Business landing page' },
        d: {
          id: 'Halaman yang ngubah pengunjung jadi lead — cepat, jelas, dan fokus konversi.',
          en: 'A page that turns visitors into leads — fast, clear, and conversion-focused.',
        },
      },
      {
        t: { id: 'Company profile', en: 'Company profile' },
        d: {
          id: 'Website resmi yang nyeritain brand, produk, dan tim secara rapi.',
          en: "An official site that tells your brand, products, and team story cleanly.",
        },
      },
      {
        t: { id: 'Website personal', en: 'Personal website' },
        d: {
          id: 'Personal branding, portfolio, atau blog yang berkesan dan gampang diinget.',
          en: 'Personal branding, a portfolio, or a blog that leaves an impression.',
        },
      },
      {
        t: { id: 'Microsite campaign', en: 'Campaign microsite' },
        d: {
          id: 'Landing khusus event, promo, atau pre-order — fokus satu tujuan.',
          en: 'A dedicated page for events, promos, or pre-orders — one clear goal.',
        },
      },
    ],
    works: [
      {
        cat: 'Website · Merch',
        title: 'Merchdrop',
        d: {
          id: 'Microsite pre-order merch yang ngurus stok, invoice, dan ongkir otomatis.',
          en: 'A pre-order merch microsite that handles stock, invoices, and shipping automatically.',
        },
      },
      {
        cat: 'Web Design',
        title: 'Personal Landing Page',
        d: {
          id: 'Landing page personal dengan cerita yang jelas — fokus ke konversi.',
          en: 'A personal landing page with a clear story — built to convert.',
        },
      },
      {
        cat: 'Design',
        title: 'Framer Starter',
        d: {
          id: 'Component kit landing page biar project website gak mulai dari nol.',
          en: 'A landing page component kit so website projects never start from zero.',
        },
      },
    ],
    cta: {
      head1: { id: 'Punya project', en: 'Got a' },
      head2: { id: 'website?', en: 'website project?' },
      sub: {
        id: 'Ceritain kebutuhan websitenya — kami bantu dari nol sampai online.',
        en: 'Tell us what your website needs — we help from zero to live.',
      },
    },
  },

  {
    slug: 'design',
    num: '02',
    title: 'Design & Branding',
    descKey: 'services.d2',
    hero: { head1: 'Design that', head2: 'stops the', accent: 'scroll.' },
    decoWords: ['Identity', 'Posters', 'Campaigns', 'Brand kits'],
    marquee: ['Identity', 'Posters', 'Campaigns', 'Brand kits'],
    heroSub: {
      id: 'Poster, branding, sampai visual campaign yang bikin orang berhenti scroll — dan inget brand kamu.',
      en: 'Posters, branding, and campaign visuals that stop the scroll — and make people remember your brand.',
    },
    mascot: { id: 'Gambar jadi deh', en: 'We design it' },
    scopeHead: { id: 'Yang kami desain.', en: 'What we design.' },
    scope: [
      {
        t: { id: 'Logo & identitas', en: 'Logo & identity' },
        d: {
          id: 'Logo, warna, tipografi, sampai tone of voice yang konsisten.',
          en: 'Logo, color, typography, and a consistent tone of voice.',
        },
      },
      {
        t: { id: 'Poster & flyer', en: 'Posters & flyers' },
        d: {
          id: 'Material cetak untuk event, promo, atau promosi produk.',
          en: 'Print materials for events, promos, or product launches.',
        },
      },
      {
        t: { id: 'Visual campaign', en: 'Campaign visuals' },
        d: {
          id: 'Set visual yang ngebangun cerita campaign di semua kanal.',
          en: 'A visual set that carries your campaign story across channels.',
        },
      },
      {
        t: { id: 'Social media kit', en: 'Social media kit' },
        d: {
          id: 'Template konten sosial media biar feed tetap konsisten.',
          en: 'Social content templates that keep your feed consistent.',
        },
      },
    ],
    works: [
      {
        cat: 'Branding',
        title: 'HelloWorks Identity',
        d: {
          id: 'Identitas visual studio dari nol — nama, cerita, warna, sampai tone of voice.',
          en: "The studio's visual identity from scratch — name, story, colors, tone of voice.",
        },
      },
      {
        cat: 'Campaign',
        title: "'Never Stop Building' Visuals",
        d: {
          id: 'Set visual kampanye yang ngebangun identitas studio di media sosial.',
          en: "A campaign visual set building the studio's identity on social media.",
        },
      },
      {
        cat: 'Print',
        title: 'Poster Series',
        d: {
          id: 'Seri poster eksperimen tipografi — latihan visual yang keluar tiap bulan.',
          en: 'A typographic poster experiment series — a visual exercise released monthly.',
        },
      },
    ],
    cta: {
      head1: { id: 'Punya project', en: 'Got a' },
      head2: { id: 'desain?', en: 'design project?' },
      sub: {
        id: 'Ceritain kebutuhan visualnya — dari logo sampai campaign.',
        en: 'Tell us what you need designed — from logo to campaign.',
      },
    },
  },

  {
    slug: 'automation',
    num: '03',
    title: 'Automation',
    descKey: 'services.d3',
    hero: { head1: 'Work that', head2: 'runs', accent: 'itself.' },
    decoWords: ['Orders', 'Invoices', 'Follow-ups', 'Reports'],
    marquee: ['Orders', 'Invoices', 'Follow-ups', 'Reports'],
    heroSub: {
      id: 'Sistem otomatis yang bikin bisnis lebih efisien — kerjaan berulang jalan sendiri, tim fokus ke hal yang penting.',
      en: 'Automated systems that make businesses more efficient — repetitive work runs itself, the team focuses on what matters.',
    },
    mascot: { id: 'Biarkan jalan sendiri', en: 'Let it run itself' },
    scopeHead: { id: 'Yang kami otomasi.', en: 'What we automate.' },
    scope: [
      {
        t: { id: 'Otomasi order', en: 'Order automation' },
        d: {
          id: 'Dari WhatsApp masuk, langsung ke sistem — gak ada order kelewat.',
          en: 'From incoming WhatsApp straight into the system — no missed orders.',
        },
      },
      {
        t: { id: 'Invoice & laporan', en: 'Invoices & reports' },
        d: {
          id: 'Invoice, rekap, dan laporan yang kebentuk sendiri tiap periode.',
          en: 'Invoices, summaries, and reports generated automatically every period.',
        },
      },
      {
        t: { id: 'Follow-up otomatis', en: 'Auto follow-up' },
        d: {
          id: 'Reminder dan follow-up client yang jalan tanpa intervensi manual.',
          en: 'Client reminders and follow-ups that run with zero manual intervention.',
        },
      },
      {
        t: { id: 'Internal tools', en: 'Internal tools' },
        d: {
          id: 'Tools khusus yang bikin operasional tim makin cepat.',
          en: 'Custom tools that make team operations noticeably faster.',
        },
      },
    ],
    works: [
      {
        cat: 'Automation',
        title: 'KitchenOps',
        d: {
          id: 'Sistem otomasi order F&B: dari WhatsApp ke dapur, invoice & laporan jalan sendiri.',
          en: 'Automated F&B ordering: from WhatsApp to the kitchen, invoices and reports run themselves.',
        },
      },
      {
        cat: 'AI · Automation',
        title: 'PitchDeck AI',
        d: {
          id: 'Draft pitch deck dari satu kalimat ide — riset dan struktur disusun otomatis.',
          en: 'A pitch deck draft from a one-line idea — research and structure assembled automatically.',
        },
      },
      {
        cat: 'Product · AI',
        title: 'HelloBot',
        d: {
          id: 'Asisten AI buat studio: ngerangkum brief dan follow-up client yang jalan sendiri.',
          en: 'An AI assistant for the studio: brief summaries and self-running client follow-ups.',
        },
      },
    ],
    cta: {
      head1: { id: 'Punya proses', en: 'Got a process' },
      head2: { id: 'yang mau diautomasi?', en: 'that needs automating?' },
      sub: {
        id: 'Ceritain alur kerja yang paling makan waktu — kami yang bikin dia jalan sendiri.',
        en: 'Tell us the workflow that eats the most time — we make it run itself.',
      },
    },
  },

  {
    slug: 'uiux',
    num: '04',
    title: 'UI/UX Design',
    descKey: 'services.d4',
    hero: { head1: 'Interfaces', head2: 'people', accent: 'get.' },
    decoWords: ['Dashboards', 'Apps', 'Design systems', 'Prototypes'],
    marquee: ['Dashboards', 'Apps', 'Design systems', 'Prototypes'],
    heroSub: {
      id: 'Desain interface yang gak cuma indah, tapi juga gampang dipakai — dari dashboard sampai aplikasi.',
      en: "Interface design that's not just beautiful but easy to use — from dashboards to apps.",
    },
    mascot: { id: 'Bikin gampang dipakai', en: 'Keep it usable' },
    scopeHead: { id: 'Yang kami rancang.', en: 'What we design.' },
    scope: [
      {
        t: { id: 'UI produk & dashboard', en: 'Product UI & dashboards' },
        d: {
          id: 'Tampilan yang jelas, konsisten, dan gak bikin user pusing.',
          en: 'Screens that are clear, consistent, and never overwhelming.',
        },
      },
      {
        t: { id: 'Design system', en: 'Design system' },
        d: {
          id: 'Token, komponen, dan pola yang bikin tim ngoding lebih cepat.',
          en: 'Tokens, components, and patterns that make the team ship faster.',
        },
      },
      {
        t: { id: 'Prototype interaktif', en: 'Interactive prototype' },
        d: {
          id: 'Prototipe yang bisa dicoba sebelum nulis kode — biar keputusan mateng.',
          en: 'A clickable prototype before code — so decisions are well-tested.',
        },
      },
      {
        t: { id: 'UX audit', en: 'UX audit' },
        d: {
          id: 'Audit pengalaman pakai produk — temuan jelas + rekomendasi.',
          en: 'A product experience audit — clear findings plus recommendations.',
        },
      },
    ],
    works: [
      {
        cat: 'UI/UX',
        title: 'Ngegas',
        d: {
          id: 'Konsep dashboard UMKM: kasir, stok, dan laporan dalam satu layar.',
          en: 'An SME dashboard concept: POS, stock, and reports on one screen.',
        },
      },
      {
        cat: 'UI/UX',
        title: 'Kasir App',
        d: {
          id: 'Desain aplikasi kasir yang sederhana — flow tiga langkah, selesai.',
          en: "A POS app design that's simple — a three-step flow, done.",
        },
      },
      {
        cat: 'Design System',
        title: 'Framer Starter',
        d: {
          id: 'Design system landing page: token, komponen, dan pola konsisten.',
          en: 'A landing page design system: tokens, components, consistent patterns.',
        },
      },
    ],
    cta: {
      head1: { id: 'Punya produk', en: 'Got a product' },
      head2: { id: 'yang perlu di-UI/UX-in?', en: 'that needs UI/UX?' },
      sub: {
        id: 'Ceritain produknya — kami bikin antarmuka yang gampang dipakai.',
        en: 'Tell us about your product — we make the interface effortless.',
      },
    },
  },

  {
    slug: 'merch',
    num: '05',
    title: 'Merchandise',
    descKey: 'services.d5',
    hero: { head1: 'Wear', head2: 'the', accent: 'brand.' },
    decoWords: ['T-shirts', 'Jackets', 'Hoodies', 'Custom merch'],
    marquee: ['T-shirts', 'Jackets', 'Hoodies', 'Custom merch'],
    heroSub: {
      id: 'Baju, jaket, dan produk custom untuk brand atau personal — dari desain sampai jadi barang.',
      en: 'Shirts, jackets, and custom products for brands or personal use — from design to finished goods.',
    },
    mascot: { id: 'Kita cetak ide kamu', en: 'We print your ideas' },
    scopeHead: { id: 'Yang kami produksi.', en: 'What we make.' },
    scope: [
      {
        t: { id: 'Kaos custom', en: 'Custom t-shirts' },
        d: {
          id: 'Sablon atau bordir untuk tim, event, atau personal.',
          en: 'Screen printing or embroidery for teams, events, or personal.',
        },
      },
      {
        t: { id: 'Jaket & hoodie', en: 'Jackets & hoodies' },
        d: {
          id: 'Outerwear custom yang gak cuma dipake, tapi jadi statement.',
          en: 'Custom outerwear that is not just worn — it makes a statement.',
        },
      },
      {
        t: { id: 'Merch event & brand', en: 'Event & brand merch' },
        d: {
          id: 'Merch untuk event atau brand yang bikin orang inget terus.',
          en: 'Merch for events and brands that people keep remembering.',
        },
      },
      {
        t: { id: 'Pack & bundling', en: 'Packs & bundling' },
        d: {
          id: 'Kombinasi produk jadi satu paket yang rapi dan siap dijual.',
          en: 'Product combinations bundled into one neat, ready-to-sell pack.',
        },
      },
    ],
    works: [
      {
        cat: 'Merch · Pre-order',
        title: 'Merchdrop',
        d: {
          id: 'Microsite pre-order merch: stok, invoice, ongkir otomatis.',
          en: 'A pre-order merch microsite: stock, invoices, shipping automated.',
        },
      },
      {
        cat: 'Print',
        title: 'Campaign Tee',
        d: {
          id: 'Kaos campaign studio dengan desain eksklusif edisi terbatas.',
          en: 'A limited-edition studio campaign tee with exclusive artwork.',
        },
      },
      {
        cat: 'Merch',
        title: 'Event Merch Pack',
        d: {
          id: 'Paket merch event: kaos, tote, dan stiker dalam satu desain.',
          en: 'An event merch pack: tee, tote, and stickers in one design.',
        },
      },
    ],
    cta: {
      head1: { id: 'Punya', en: 'Got a' },
      head2: { id: 'ide merch?', en: 'merch idea?' },
      sub: {
        id: 'Ceritain konsepnya — kami urus dari desain sampai jadi barang.',
        en: 'Tell us your concept — we handle it from design to finished goods.',
      },
    },
  },
]

export { pick } from './i18n.js'
