/**
 * Data anggota HelloWorks — dipakai di halaman /team (kartu) dan
 * halaman profil per orang (/team/:slug).
 *
 * TEAM    → identitas (nama, role, portfolio, monogram, warna tone).
 * PROFILE → konten halaman profil per orang: about + karya pilihan +
 *           sertifikat. Konten ini dua bahasa ({ id, en }) karena bentuknya
 *           array/terstruktur, jadi ditaruh di sini, bukan di flat dict i18n.
 *
 * Semua konten profil masih DRAFT/placeholder — ganti sesuai data asli tiap
 * orang (proyek yang dipilih, sertifikat beneran, dll).
 */

export const TEAM = [
  {
    slug: 'muhajir',
    name: 'Muhajir Amrullah',
    role: 'Co-Founder · Product & Brand',
    url: 'https://he1st.me/',
    domain: 'he1st.me',
    initials: 'MA',
    tone: 'bg-ink text-acid',
    bioKey: 'team.bio1',
  },
  {
    slug: 'adam',
    name: 'Adam Fairuz Akmal Aryaguna',
    role: 'Co-Founder · Product Engineer',
    url: 'https://gipsy-dev.me/',
    domain: 'gipsy-dev.me',
    initials: 'AF',
    tone: 'bg-blue text-paper',
    bioKey: 'team.bio2',
  },
  {
    slug: 'aditya',
    name: 'Aditya Wijayanto',
    role: 'Co-Founder · Creative Developer',
    url: 'https://yunnappie.me/',
    domain: 'yunnappie.me',
    initials: 'AW',
    tone: 'bg-flame text-paper',
    bioKey: 'team.bio3',
  },
  {
    slug: 'ferdinan',
    name: 'Ferdinan',
    role: 'Co-Founder · Backend & Systems',
    url: 'https://nanruto.me/',
    domain: 'nanruto.me',
    initials: 'FN',
    tone: 'bg-acid text-ink',
    bioKey: 'team.bio4',
  },
  {
    slug: 'fatur',
    name: 'Agus Fathurrahman Rifai',
    role: 'Co-Founder · UI/UX & Front-end',
    url: 'https://porto-fathur.vercel.app/',
    domain: 'porto-fathur.vercel.app',
    initials: 'FR',
    tone: 'bg-[#e9e3d4] text-ink border border-ink/15',
    bioKey: 'team.bio5',
  },
]

export { pick } from './i18n.js'

/** Konten halaman profil per orang (draft — isi asli menyusul) */
export const PROFILE = {
  muhajir: {
    about: {
      id: "Muhajir adalah orang di balik arah HelloWorks — dari nama, cerita, sampai keputusan besar. Dia yang mastiin setiap project punya cerita yang jelas, bukan cuma tampilan. Paling senang kalau ide yang 'gak mungkin' akhirnya jalan. Di luar jam kerja: riset tren dan ngobrolin ide baru.",
      en: "Muhajir steers the direction of HelloWorks — from the name and story to the big decisions. He makes sure every project has a clear story, not just a pretty surface. Happiest when an idea that felt 'impossible' finally works. Off the clock: trend research and bouncing new ideas.",
    },
    projects: [
      {
        cat: 'Branding',
        title: 'HelloWorks Identity',
        desc: {
          id: "Identitas visual HelloWorks dari nol — nama, cerita, warna, sampai tone of voice yang dipakai di seluruh website ini.",
          en: "HelloWorks' visual identity from scratch — the name, story, colors, and the tone of voice used across this very website.",
        },
      },
      {
        cat: 'Web Design',
        title: 'Personal Landing Page',
        desc: {
          id: 'Landing page personal dengan cerita yang jelas — fokus ke konversi, bukan sekadar cantik.',
          en: 'A personal landing page with a clear story — focused on conversion, not just looks.',
        },
      },
      {
        cat: 'Campaign',
        title: "'Never Stop Building' Visuals",
        desc: {
          id: 'Set visual kampanye yang ngebangun identitas studio di media sosial.',
          en: "A campaign visual set that builds the studio's identity on social media.",
        },
      },
    ],
    certs: [
      { name: 'Digital Marketing Fundamentals', issuer: 'Google', year: '2025' },
      { name: 'Brand Strategy Essentials', issuer: 'IDF', year: '2024' },
    ],
  },

  adam: {
    about: {
      id: "Adam adalah product engineer yang mastiin tiap produk dibangun dengan rapi — dari struktur kode sampai cara kerjanya buat user. Gak gampang puas sama versi 'cukup jalan'. Di balik layar, dia yang ngerancang arsitektur teknis biar HelloWorks bisa tumbuh tanpa patah-patah.",
      en: "Adam is the product engineer making sure every product is built cleanly — from code structure to how it works for users. Never satisfied with 'good enough'. Behind the scenes, he designs the technical architecture so HelloWorks can scale without breaking.",
    },
    projects: [
      {
        cat: 'Automation',
        title: 'KitchenOps',
        desc: {
          id: 'Sistem otomasi order F&B: dari WhatsApp masuk, langsung ke dapur — invoice dan laporan jalan sendiri.',
          en: 'Automated ordering for F&B: from incoming WhatsApp to the kitchen — invoices and reports run themselves.',
        },
      },
      {
        cat: 'Internal Tools',
        title: 'Studio Ops',
        desc: {
          id: 'Internal tools buat studio: manajemen project dan billing yang otomatis.',
          en: 'Internal tools for the studio: automated project management and billing.',
        },
      },
      {
        cat: 'Web Product',
        title: 'Merchdrop',
        desc: {
          id: 'Microsite pre-order merch yang ngurus stok, invoice, dan ongkir otomatis.',
          en: 'A pre-order microsite handling stock, invoices, and shipping automatically.',
        },
      },
    ],
    certs: [
      { name: 'Backend Development', issuer: 'Dicoding', year: '2025' },
      { name: 'Cloud Architecture', issuer: 'AWS', year: '2024' },
    ],
  },

  aditya: {
    about: {
      id: "Aditya adalah creative developer — gabungan sisi kreatif dan teknis yang bikin interaksi terasa hidup. Percaya detail kecil yang bikin pengalaman terasa beda. Suka nyobain animasi dan efek baru buat lihat sejauh mana web bisa 'bergerak'.",
      en: "Aditya is the creative developer — a blend of creative and technical that makes interactions feel alive. Believes small details make experiences feel different. Loves trying new animations and effects to see how far the web can 'move'.",
    },
    projects: [
      {
        cat: 'Creative Dev',
        title: 'Interactive Portfolio',
        desc: {
          id: 'Website portfolio dengan animasi dan interaksi yang bikin orang betah.',
          en: 'A portfolio website with animations and interactions that keep people around.',
        },
      },
      {
        cat: 'Motion',
        title: '3D Landing Page',
        desc: {
          id: 'Landing page dengan elemen 3D dan motion yang halus.',
          en: 'A landing page with smooth 3D elements and motion.',
        },
      },
      {
        cat: 'Design System',
        title: 'Framer Starter',
        desc: {
          id: 'Component kit landing page yang bisa dipakai tim mana pun — biar gak mulai dari nol.',
          en: 'A landing page component kit any team can reuse — so nothing starts from zero.',
        },
      },
    ],
    certs: [
      { name: 'Advanced CSS & Animation', issuer: 'Frontend Masters', year: '2025' },
      { name: 'WebGL & Shaders', issuer: 'Three.js Journey', year: '2024' },
    ],
  },

  ferdinan: {
    about: {
      id: "Ferdinan adalah orang di balik sistem — server, database, dan otomasi biar semuanya jalan mulus. Paling senang kalau sistem berjalan sendiri tanpa drama. Suka bikin tools internal biar kerja tim makin cepat, dan mikir jangka panjang soal arsitektur.",
      en: "Ferdinan takes care of the systems — servers, databases, and automation so everything runs smoothly. Happiest when systems run themselves without drama. Likes building internal tools that speed the team up, and thinks long-term about architecture.",
    },
    projects: [
      {
        cat: 'Systems',
        title: 'Ngegas Dashboard',
        desc: {
          id: 'Konsep dashboard UMKM: kasir, stok, dan laporan dalam satu layar yang gak bikin pusing.',
          en: "An SME dashboard concept: POS, stock, and reports on one screen that doesn't overwhelm.",
        },
      },
      {
        cat: 'Automation',
        title: 'Auto Follow-up',
        desc: {
          id: 'Sistem reminder dan follow-up client yang jalan sendiri tanpa intervensi manual.',
          en: 'A reminder and client follow-up system that runs itself with no manual intervention.',
        },
      },
      {
        cat: 'DevOps',
        title: 'Deploy Pipeline',
        desc: {
          id: 'Setup CI/CD biar tiap deploy cepat, aman, dan bisa di-rollback.',
          en: 'CI/CD setup so every deploy is fast, safe, and rollback-friendly.',
        },
      },
    ],
    certs: [
      { name: 'DevOps Engineering', issuer: 'Google Cloud', year: '2025' },
      { name: 'Database Design & Optimization', issuer: 'DataCamp', year: '2024' },
    ],
  },

  fatur: {
    about: {
      id: "Fatur menempatkan user di urutan pertama — setiap layar didesain biar gampang dimengerti, bukan cuma bagus dilihat. Sering jadi orang yang nanya 'kok ribet banget sih?'. Di luar kerja, dia ngulik design system dan pola UI yang bikin produk terasa ringan.",
      en: "Fatur puts the user first — every screen is designed to be understood, not just admired. Often the one asking 'why is this so complicated?'. Outside work, he tinkers with design systems and UI patterns that make products feel light.",
    },
    projects: [
      {
        cat: 'UI/UX',
        title: 'Kasir App',
        desc: {
          id: 'Desain UI aplikasi kasir yang sederhana dan gak bikin pusing — flow tiga langkah, selesai.',
          en: "UI design for a POS app that's simple and stress-free — a three-step flow, done.",
        },
      },
      {
        cat: 'Design System',
        title: 'Framer Starter',
        desc: {
          id: 'Design system landing page: token, komponen, dan pola yang konsisten.',
          en: 'A landing page design system: tokens, components, and consistent patterns.',
        },
      },
      {
        cat: 'UX Research',
        title: 'Marketplace UX Audit',
        desc: {
          id: 'Audit pengalaman pakai marketplace — temuan jelas dan rekomendasi yang bisa dieksekusi.',
          en: 'A UX audit of a marketplace — clear findings and actionable recommendations.',
        },
      },
    ],
    certs: [
      { name: 'UI/UX Design Professional', issuer: 'Google', year: '2025' },
      { name: 'Design Systems', issuer: 'Coursera', year: '2024' },
    ],
  },
}
