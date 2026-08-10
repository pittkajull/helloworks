import { createContext, useContext } from 'react'

export const STORAGE_KEY = 'helloworks-lang'

/**
 * Terjemahan HelloWorks — 2 bahasa: id (default) & en.
 * Headline brand (We build better ways, Never stop building, dll) sengaja
 * tetap English di kedua bahasa: itu bagian dari identitas visual & sudah
 * di-tuning supaya pas di layout.
 */
export const translations = {
  id: {
    // Navbar
    'nav.about': 'Tentang',
    'nav.services': 'Layanan',
    'nav.values': 'Nilai',
    'nav.other': 'Lainnya',
    'nav.cta': 'Ngobrol yuk',

    // Hero
    'hero.kicker': 'Studio kreatif · Indonesia',
    'hero.sub': 'Kami bantu kamu bekerja lebih baik\nlewat desain, teknologi, dan otomasi.',
    'hero.scroll': 'Scroll untuk jelajahi',

    // Intro (about)
    'intro.story':
      'HelloWorks adalah studio kreatif digital yang lahir dari satu ide sederhana: membangun sesuatu yang terus berkembang, tanpa pernah berhenti. Kami tim kecil dengan visi besar — membantu individu dan bisnis mewujudkan ide lewat desain, teknologi, dan otomasi.',
    'intro.link': 'Kenalan lebih dekat',

    // Services
    'services.sub': 'Dari landing page sampai sistem otomatis — kami bantu dari nol sampai jadi.',
    'services.d1': 'Website custom yang gak cuma bagus dilihat, tapi juga punya cerita — dari landing page bisnis sampai website personal.',
    'services.d2': 'Poster, branding, sampai visual campaign yang bikin orang berhenti scroll.',
    'services.d3': 'Sistem otomatis yang bikin bisnis lebih efisien — hemat waktu, hemat tenaga.',
    'services.d4': 'Desain interface yang gak cuma indah, tapi juga gampang dipakai.',
    'services.d5': 'Baju, jaket, dan produk custom lainnya untuk brand atau personal.',

    // Work (values)
    'work.cta': 'Ceritakan idemu',

    // Contact
    'contact.head': 'Punya',
    'contact.headAccent': 'ide?',
    'contact.meta': 'Setiap ide layak dikembangkan\nterus-menerus, bukan sekali jadi.',

    // Dropdown "Other"
    'other.introLabel': '(Halaman lain)',
    'other.head1': 'Jelajahi',
    'other.head2a': '',
    'other.head2b': 'studionya.',
    'other.introLink': 'Ceritakan idemu',
    'other.teamDesc': 'Kenalan sama lima co-founder di balik HelloWorks.',
    'other.journalLabel': 'Jurnal',
    'other.journalDesc': 'Catatan proses & cerita di balik layar.',
    'other.playbookDesc': 'Panduan & framework yang kami pakai.',
    'other.labDesc': 'Eksperimen kecil yang lagi kami cobain.',
    'other.faqDesc': 'Jawaban buat pertanyaan yang sering masuk.',
    'other.soon': 'segera',

    // Halaman Team
    'team.heroSub':
      'Di balik HelloWorks ada lima orang yang percaya setiap ide layak dikembangkan terus-menerus. Kami yang nulis kode-nya, gambar layout-nya, dan bikin sistem yang bikin bisnis jalan lebih efisien.',
    'team.sectionDesc':
      'Lima co-founder, satu visi. Foto masih menyusul — kenalan lewat monogram dulu. Hover foto buat milih: buka portfolio atau profil orangnya.',
    'team.bio1': 'Percaya produk hebat lahir dari cerita yang jelas. Ngebangun arah HelloWorks dari ide pertama sampai jadi.',
    'team.bio2': 'Ngebangun produk yang rapi — dari kode sampai pengalaman pakainya.',
    'team.bio3': 'Bikin antarmuka yang terasa hidup dan bikin orang betah.',
    'team.bio4': 'Di balik layar: bikin sistem yang stabil, hemat waktu, dan gak ribet.',
    'team.bio5': 'Desain interface yang gak cuma indah, tapi juga gampang dipakai.',
    'team.ctaHead1': 'Mau ikut',
    'team.ctaHead2': 'ngebangun?',
    'team.ctaSub': 'Selalu ada ruang buat orang yang mikir panjang, detail, dan gak pernah berhenti belajar.',
    'team.ctaLink': 'Ceritakan idemu',
    'team.portfolio': 'Portfolio',
    'team.profile': 'Profile',

    // Halaman profil per orang (/team/:slug)
    'member.kicker': 'Profile',
    'member.sub':
      'Kenalan singkat sama salah satu orang di balik HelloWorks — peran, karya pilihan, dan sedikit cerita.',
    'member.mascot': 'Salam kenal',
    'member.about': 'Tentang',
    'member.aboutHead1': 'Kenalan lebih',
    'member.aboutHead2': 'dekat.',
    'member.projects': 'Karya pilihan',
    'member.projectsNote':
      'Beberapa karya pilihan — cerita lengkap dan prosesnya ada di portfolio.',
    'member.fullPortfolio': 'Buka portfolio lengkap',
    'member.certs': 'Sertifikat',
    'member.back': 'Kembali ke tim',
    'member.next': 'Selanjutnya',
    'member.ctaHead1': 'Punya ide buat',
    'member.ctaSub':
      'Sampaikan lewat studio — kami dengerin, dari ide pertama sampai jadi.',

    // Halaman Lab
    'lab.heroSub':
      'Concept builds, eksperimen, dan prototipe yang kami kerjain di sela-sela project. Ini cara kami nunjukin skill — karena website ini sendiri adalah case study pertama kami.',
    'lab.sub':
      'Setiap konsep di bawah adalah cara kami belajar — ngelatih skill, nyoba teknologi baru, dan nyiapin bahan buat produk beneran.',
    'lab.explainHead1': 'Kenapa bikin',
    'lab.explainHead2': 'Lab?',
    'lab.explainT1': 'Bukti, bukan janji',
    'lab.explain1':
      'Website, kode, dan sistem ini adalah portofolio kami — bisa dilihat, dicoba, dan dipelajari siapa pun.',
    'lab.explainT2': 'Belajar tiap iterasi',
    'lab.explain2': 'Eksperimen yang gagal tetap ngajarin sesuatu. Gak ada yang sia-sia di sini.',
    'lab.explainT3': 'Bisa jadi produk beneran',
    'lab.explain3':
      'Kalau sebuah konsep kepake dan banyak yang minta, dia naik kelas jadi produk HelloWorks.',
    'lab.ctaHead1': 'Punya ide yang mau',
    'lab.ctaHead2': 'kita cobain bareng?',
    'lab.ctaSub':
      'Kalau kamu punya konsep atau masalah yang belum ada solusinya, kami dengerin. Eksperimen kecil bisa lahir jadi sesuatu yang besar.',
    'lab.ctaLink': 'Ceritakan idemu',
    'lab.d1':
      'Sistem otomatis order F&B: dari WhatsApp masuk, langsung ke dapur, invoice & laporan jalan sendiri. Gak ada lagi orderan kelewat.',
    'lab.d2':
      'Microsite pre-order merch yang ngurus stok, invoice, dan ongkir otomatis. Tinggal drop, sisanya beres sendiri.',
    'lab.d3':
      'Draft pitch deck dari satu kalimat ide — riset, struktur, dan copy disusun otomatis. Buat yang mau mikir, bukan ngetik.',
    'lab.d4':
      'Design system & component kit landing page yang bisa dipakai tim mana pun — biar gak mulai dari nol tiap project.',
    'lab.d5':
      'Konsep dashboard UMKM: kasir, stok, dan laporan dalam satu layar yang gak bikin pusing. Sederhana itu fitur.',
    'lab.d6':
      'Asisten AI buat studio: ngerangkum brief, nge-follow-up client, dan jadwal yang jalan sendiri.',
    'lab.statusConcept': 'Concept',
    'lab.statusProto': 'Prototype',
    'lab.statusExp': 'Experiment',
    'lab.statusSoon': 'Shipping soon',
    'lab.statusProgress': 'In progress',

    // Halaman layanan (/services/:slug)
    'service.works': 'Karya pilihan',
    'service.worksNote': 'Beberapa contoh karya di kategori ini.',
    'service.back': 'Semua layanan',
    'service.next': 'Selanjutnya',

    // Halaman Playbook
    'playbook.heroSub':
      'Bukan teori — ini cara kami beneran ngerjain project, dari brief pertama sampai hari ke-100. Research, desain, build, dan perbaikan terus-menerus.',
    'playbook.cycleSub':
      'Kami nyebutnya continuous product cycle: produk gak pernah beneran selesai, selalu ada ruang buat berkembang.',
    'playbook.step1': 'Ngedengerin dulu: masalah, user, dan konteksnya sebelum nulis baris kode.',
    'playbook.step2':
      'Nyari inti masalahnya, lalu disusun jadi tujuan, scope, dan definisi jelas soal \'jadi\' itu kayak gimana.',
    'playbook.step3': 'Layout, alur, dan ceritanya. Interface yang gampang dipakai, bukan cuma bagus dilihat.',
    'playbook.step4': 'Nulis kode dalam iterasi kecil yang sering dirilis — biar feedback cepet masuk.',
    'playbook.step5': 'Go live dengan rencana ukur: apa yang bakal kami pantau dan pelajari.',
    'playbook.step6': 'Nonton pemakaian beneran, baca feedback, dengerin keluhannya.',
    'playbook.step7': 'Perbaiki, sesuaikan, terus jalan. Produk gak pernah beneran selesai.',
    'playbook.ruleT1': 'Never stop building',
    'playbook.rule1': 'Project gak berakhir pas launch. Kami maintain, pantau, dan perbaiki terus.',
    'playbook.ruleT2': 'Detail itu segalanya',
    'playbook.rule2': 'Sepuluh persen terakhir yang bikin karya terasa selesai. Kami ngejar itu.',
    'playbook.ruleT3': 'Langsung ke orangnya',
    'playbook.rule3': 'Kamu ngobrol sama kami berlima — bukan tiket support atau layanan mesin.',
    'playbook.ruleT4': 'Sederhana menang',
    'playbook.rule4': 'Kalau gak bikin kerja lebih gampang, gak akan kami rilis.',
    'playbook.ctaHead1': 'Mau liat playbook ini',
    'playbook.ctaHead2': 'kepake di projectmu?',
    'playbook.ctaSub':
      'Ceritain projectnya, kami tunjukin gimana siklus ini bakal jalan di kamu — dari brief sampai hari ke-100.',
  },

  en: {
    // Navbar
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.values': 'Values',
    'nav.other': 'Other',
    'nav.cta': "Let's talk",

    // Hero
    'hero.kicker': 'Creative studio · Indonesia',
    'hero.sub': 'We help you work better\nthrough design, technology, and automation.',
    'hero.scroll': 'Scroll to explore',

    // Intro (about)
    'intro.story':
      'HelloWorks is a digital creative studio born from one simple idea: building something that keeps evolving, never stopping. We are a small team with a big vision — helping individuals and businesses bring ideas to life through design, technology, and automation.',
    'intro.link': 'Get to know us better',

    // Services
    'services.sub': 'From landing pages to automated systems — we help from zero to done.',
    'services.d1': "Custom websites that don't just look good — they tell a story, from business landing pages to personal sites.",
    'services.d2': 'Posters, branding, and campaign visuals that make people stop scrolling.',
    'services.d3': 'Automated systems that make businesses more efficient — saving time and effort.',
    'services.d4': "Interface design that's not just beautiful, but easy to use.",
    'services.d5': 'Shirts, jackets, and other custom merch for brands or personal use.',

    // Work (values)
    'work.cta': 'Tell us your idea',

    // Contact
    'contact.head': 'Got an',
    'contact.headAccent': 'idea?',
    'contact.meta': 'Every idea deserves to keep evolving\n— not a one-time job.',

    // Dropdown "Other"
    'other.introLabel': '(Other pages)',
    'other.head1': 'Explore',
    'other.head2a': 'the',
    'other.head2b': 'studio.',
    'other.introLink': 'Tell us your idea',
    'other.teamDesc': 'Meet the five co-founders behind HelloWorks.',
    'other.journalLabel': 'Journal',
    'other.journalDesc': 'Process notes & behind-the-scenes stories.',
    'other.playbookDesc': 'Guides & frameworks we use.',
    'other.labDesc': "Little experiments we're trying out.",
    'other.faqDesc': 'Answers to common questions.',
    'other.soon': 'soon',

    // Halaman Team
    'team.heroSub':
      'Behind HelloWorks are five people who believe every idea deserves to keep evolving. We write the code, design the layouts, and build the systems that make businesses run more efficiently.',
    'team.sectionDesc':
      'Five co-founders, one vision. Photos coming soon — get to know us through monograms for now. Hover a photo to choose: open the portfolio or the person\'s profile.',
    'team.bio1': 'Believes great products come from clear stories. Steering HelloWorks from the first idea to launch.',
    'team.bio2': 'Builds clean products — from the code to the user experience.',
    'team.bio3': 'Creates interfaces that feel alive and keep people coming back.',
    'team.bio4': 'Behind the scenes: building systems that are stable, time-saving, and simple.',
    'team.bio5': "Designs interfaces that aren't just beautiful, but easy to use.",
    'team.ctaHead1': 'Want to join',
    'team.ctaHead2': 'the build?',
    'team.ctaSub': "There's always room for people who think long-term, care about details, and never stop learning.",
    'team.ctaLink': 'Tell us your idea',
    'team.portfolio': 'Portfolio',
    'team.profile': 'Profile',

    // Halaman profil per orang (/team/:slug)
    'member.kicker': 'Profile',
    'member.sub':
      'A quick look at one of the people behind HelloWorks — their role, selected works, and a little story.',
    'member.mascot': 'Nice to meet you',
    'member.about': 'About',
    'member.aboutHead1': 'Get to know',
    'member.aboutHead2': 'closer.',
    'member.projects': 'Selected works',
    'member.projectsNote':
      'A few selected works — the full story and process live in the portfolio.',
    'member.fullPortfolio': 'Open the full portfolio',
    'member.certs': 'Certificates',
    'member.back': 'Back to the team',
    'member.next': 'Next up',
    'member.ctaHead1': 'Got an idea for',
    'member.ctaSub':
      'Share it through the studio — we\'re listening, from first idea to done.',

    // Halaman Lab
    'lab.heroSub':
      'Concept builds, experiments, and prototypes we make between projects. It\'s how we show our skills — this website itself is our first case study.',
    'lab.sub':
      'Every concept below is a way for us to learn — sharpening skills, trying new technology, and preparing raw material for real products.',
    'lab.explainHead1': 'Why a',
    'lab.explainHead2': 'Lab?',
    'lab.explainT1': 'Proof, not promises',
    'lab.explain1':
      'This website, our code, and these systems are our portfolio — open for anyone to see, try, and learn from.',
    'lab.explainT2': 'Learn every iteration',
    'lab.explain2': 'Every failed experiment still teaches something. Nothing here goes to waste.',
    'lab.explainT3': 'Graduates into real products',
    'lab.explain3':
      'When a concept gets used and requested enough, it levels up into a real HelloWorks product.',
    'lab.ctaHead1': 'Got an idea you want',
    'lab.ctaHead2': 'to build with us?',
    'lab.ctaSub':
      "If you have a concept or a problem with no solution yet, we're listening. Small experiments can grow into something big.",
    'lab.ctaLink': 'Tell us your idea',
    'lab.d1':
      'Automated ordering for F&B: from incoming WhatsApp to the kitchen, invoices and reports run themselves. No more missed orders.',
    'lab.d2':
      'A pre-order microsite that handles stock, invoices, and shipping automatically. Just drop, the rest sorts itself.',
    'lab.d3':
      'A pitch deck draft from a one-line idea — research, structure, and copy assembled automatically. For those who want to think, not type.',
    'lab.d4':
      'A landing page design system & component kit any team can reuse — so no project starts from zero.',
    'lab.d5':
      'An SME dashboard concept: POS, stock, and reports in one screen that doesn\'t overwhelm. Simplicity is a feature.',
    'lab.d6':
      'An AI assistant for the studio: summarizing briefs, following up with clients, and schedules that run themselves.',
    'lab.statusConcept': 'Concept',
    'lab.statusProto': 'Prototype',
    'lab.statusExp': 'Experiment',
    'lab.statusSoon': 'Shipping soon',
    'lab.statusProgress': 'In progress',

    // Service pages (/services/:slug)
    'service.works': 'Selected work',
    'service.worksNote': 'A few selected examples in this category.',
    'service.back': 'All services',
    'service.next': 'Next up',

    // Playbook page
    'playbook.heroSub':
      'Not theory — how we actually run projects, from the first brief to day 100. Research, design, build, and constant improvement.',
    'playbook.cycleSub':
      'We call it the continuous product cycle: a product is never really finished — there is always room to grow.',
    'playbook.step1': 'We listen first: the problem, the users, and the context before a single line of code.',
    'playbook.step2':
      'We find the core of the problem, then shape it into goals, scope, and a clear definition of done.',
    'playbook.step3': 'Layout, flow, and story. Interfaces that are easy to use, not just nice to look at.',
    'playbook.step4': 'We code in small, frequent iterations — so feedback comes in early.',
    'playbook.step5': 'We launch with a measurement plan: what we will watch and learn from.',
    'playbook.step6': 'We watch real usage, read feedback, and listen to the complaints.',
    'playbook.step7': 'Fix, adjust, keep going. A product is never really finished.',
    'playbook.ruleT1': 'Never stop building',
    'playbook.rule1': 'Projects do not end at launch. We maintain, watch, and keep improving.',
    'playbook.ruleT2': 'Details are everything',
    'playbook.rule2': 'The last ten percent is what makes work feel finished. We chase it.',
    'playbook.ruleT3': 'Talk to the humans',
    'playbook.rule3': 'You talk to the five of us — not a support ticket or a machine.',
    'playbook.ruleT4': 'Simple wins',
    'playbook.rule4': 'If it does not make work easier, it does not ship.',
    'playbook.ctaHead1': 'Want this playbook',
    'playbook.ctaHead2': 'working for your project?',
    'playbook.ctaSub':
      'Tell us about the project, and we will show how this cycle runs for you — from brief to day 100.',
  },
}

/** Ambil teks dua bahasa ({ id, en }) — fallback ke id */
export const pick = (pair, lang) => (pair && pair[lang]) ?? pair?.id ?? ''

export const LanguageContext = createContext(null)

/** Hook buat baca bahasa aktif + fungsi terjemahan */
export function useLang() {
  return useContext(LanguageContext)
}

/** Baca bahasa awal dari localStorage (default 'id') */
export function getInitialLang() {
  if (typeof window === 'undefined') return 'id'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'en' || saved === 'id' ? saved : 'id'
}
