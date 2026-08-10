import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n.js'

const NAV_LINKS = [
  { to: '/#about', key: 'about' },
  { to: '/#services', key: 'services' },
  { to: '/#values', key: 'values' },
]

/* Toggle bahasa ID/EN — dipakai desktop & mobile */
function LangSwitch({ onDark = false, className = '' }) {
  const { lang, setLang } = useLang()
  const muted = onDark ? 'text-paper/40 hover:text-paper' : 'text-ink/40 hover:text-ink'

  return (
    <div className={`flex items-center gap-[8px] font-mono text-[0.68rem] font-medium uppercase ${className}`}>
      {['id', 'en'].map((code, i) => (
        <span key={code} className="flex items-center gap-[8px]">
          {i > 0 && <span className={onDark ? 'text-paper/30' : 'text-ink/30'}>/</span>}
          <button
            type="button"
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
            className={`cursor-pointer border-0 bg-transparent p-0 transition-colors ${
              lang === code ? (onDark ? 'text-acid' : 'text-blue') : muted
            }`}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()
  const { pathname } = useLocation()
  const { t } = useLang()
  // Halaman dengan hero gelap (ink) → header otomatis pakai teks terang
  const onDark =
    pathname.startsWith('/team') || pathname === '/lab' || pathname === '/playbook' || pathname.startsWith('/services')

  const closeAll = () => {
    setMenuOpen(false)
    setMoreOpen(false)
  }

  // Tutup dropdown & menu mobile kalau pindah halaman
  useEffect(() => {
    closeAll()
    setHidden(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Smart navbar: ilang pas scroll ke bawah, muncul lagi pas scroll ke atas.
  // Tetap nempel di atas hero (belum lewat 140px) dan kalau menu/dropdown kebuka.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (menuOpen || moreOpen) {
        lastY = y
        return
      }
      if (y > lastY && y > 140) setHidden(true)
      else if (y < lastY || y < 140) setHidden(false)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen, moreOpen])

  const otherActive = moreOpen || active === 'other'

  // Tab aktif ikut posisi scroll (hanya di landing)
  useEffect(() => {
    if (pathname !== '/') return
    const els = ['about', 'services', 'values']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Halaman non-landing → petakan ke tab yang relevan
  useEffect(() => {
    if (pathname === '/') setActive(null)
    else if (pathname.startsWith('/services')) setActive('services')
    else if (pathname === '/team' || pathname === '/lab' || pathname === '/playbook') setActive('other')
    else setActive(null)
  }, [pathname])

  // Dropdown "Other" — Team & Lab beneran (featured = kartu bentang penuh), sisanya placeholder (soon)
  const MORE_ITEMS = [
    { to: '/team', label: 'Team', desc: t('other.teamDesc'), tag: null, featured: true },
    { to: null, label: t('other.journalLabel'), desc: t('other.journalDesc'), tag: t('other.soon') },
    { to: '/playbook', label: 'Playbook', desc: t('other.playbookDesc'), tag: null },
    { to: '/lab', label: 'Lab', desc: t('other.labDesc'), tag: null },
    { to: null, label: 'FAQ', desc: t('other.faqDesc'), tag: t('other.soon') },
  ]

  return (
    <motion.header
      initial={{ y: reduce ? 0 : -90, opacity: 0 }}
      animate={{ y: hidden ? (reduce ? 0 : '-100%') : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`fixed top-0 right-0 left-0 z-[50] flex h-[90px] items-center justify-between border-b px-[5vw] transition-[background-color,border-color,backdrop-filter] duration-300 max-[700px]:h-[72px] max-[700px]:px-[6vw] ${
        onDark
          ? scrolled
            ? 'border-paper/15 bg-ink/85 backdrop-blur-md'
            : 'border-paper/15'
          : scrolled
            ? 'border-line bg-paper/85 backdrop-blur-md'
            : 'border-line'
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        aria-label="HelloWorks home"
        onClick={closeAll}
        className={`text-[1.42rem] font-extrabold tracking-[-0.08em] no-underline transition-colors ${
          onDark ? 'text-paper' : 'text-ink'
        }`}
      >
        <span className="italic">hello</span>works
        <span className={`tracking-normal ${onDark ? 'text-acid' : 'text-blue'}`}>.</span>
      </Link>

      {/* Nav desktop — di-center beneran (flex-1) */}
      <nav
        aria-label="Navigasi utama"
        className="flex flex-1 items-center justify-center gap-9 max-[900px]:gap-5 max-[700px]:hidden"
      >
        {/* Kelompok tab segmented — tab aktif keblok ink + notch ala tiket */}
        <div className="flex items-stretch">
          {NAV_LINKS.map((link, i) => {
            const isActive = active === link.key
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeAll}
                className={`group relative flex items-center border border-ink/90 bg-paper px-[20px] py-[10px] font-mono text-[0.68rem] font-medium uppercase no-underline transition-colors duration-300 max-[900px]:px-[13px] max-[900px]:text-[0.6rem] ${
                  i > 0 ? '-ml-px' : ''
                } ${isActive ? 'notch-tab bg-ink text-paper' : 'text-ink hover:bg-ink/10'}`}
              >
                {isActive && (
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-acid" />
                )}
                <span className={`font-mono text-[0.55rem] font-medium ${isActive ? 'text-acid' : 'text-blue/80'}`}>
                  0{i + 1}
                </span>
                <span className="ml-[7px]">{t(`nav.${link.key}`)}</span>
              </Link>
            )
          })}

        {/* Other + mega-menu dropdown — clip-path notch HANYA di button, biar dropdown gak ke-clip */}
        <div
          className="relative -ml-px"
          onMouseEnter={() => setMoreOpen(true)}
          onMouseLeave={() => setMoreOpen(false)}
        >
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen((open) => !open)}
            className={`group relative flex cursor-pointer items-center gap-[7px] border border-ink/90 px-[20px] py-[10px] font-mono text-[0.68rem] font-medium uppercase transition-colors duration-300 max-[900px]:px-[13px] max-[900px]:text-[0.6rem] ${
              otherActive ? 'notch-tab bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink/10'
            }`}
          >
            {otherActive && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-acid" />}
            <span className={`font-mono text-[0.55rem] font-medium ${otherActive ? 'text-acid' : 'text-blue/80'}`}>04</span>
            <span className="ml-[7px]">{t('nav.other')}</span>
            <span
              aria-hidden="true"
              className={`ml-[7px] text-[0.6rem] transition-transform duration-300 ${moreOpen ? 'rotate-180' : ''} ${
                otherActive ? 'text-acid' : 'text-blue/80'
              }`}
            >
              ▾
            </span>
          </button>

          <AnimatePresence>
            {moreOpen && (
              /* top-full + pt-[11px]: padding ada DI DALAM box dropdown, jadi jalur
                 hover dari tombol ke panel tetap kontinu */
              <motion.div
                key="more-dd"
                initial={{ opacity: 0, y: reduce ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute top-full right-0 pt-[11px]"
              >
                {/* Mega-menu dua panel ala JCP */}
                <div className="grid w-[min(560px,calc(100vw-56px))] grid-cols-[190px_1fr] border border-ink bg-paper shadow-[0_14px_30px_rgba(23,23,23,.18)] max-[900px]:grid-cols-1">
                  {/* Panel intro kiri (gelap) */}
                  <div className="flex min-h-[300px] flex-col bg-ink p-[20px] text-paper max-[900px]:hidden">
                    <span className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.1em] text-acid">
                      {t('other.introLabel')}
                    </span>
                    <strong className="mt-auto text-[1.55rem] leading-[0.9] font-extrabold uppercase tracking-[-0.06em]">
                      {t('other.head1')}
                      <br />
                      {t('other.head2a') ? `${t('other.head2a')} ` : ''}
                      <em className="font-serif font-normal italic tracking-[-0.04em] text-acid">
                        {t('other.head2b')}
                      </em>
                    </strong>
                    <Link
                      to="/#contact"
                      onClick={closeAll}
                      className="mt-[22px] flex items-center justify-between border-t border-paper/25 pt-[12px] font-mono text-[0.6rem] font-medium uppercase text-paper no-underline transition-colors hover:text-acid"
                    >
                      {t('other.introLink')} <span className="text-[1rem] text-acid">↗</span>
                    </Link>
                  </div>

                  {/* Grid kartu kanan */}
                  <div className="grid grid-cols-2">
                    {MORE_ITEMS.map((item, i) =>
                      item.featured ? (
                        /* Kartu unggulan (Team) — bentang penuh */
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={closeAll}
                          className="group/cell col-span-2 relative min-h-[108px] bg-[#fffdfa] p-[16px] no-underline transition-colors hover:bg-blue"
                        >
                          <span className="font-mono text-[0.6rem] font-medium text-blue transition-colors group-hover/cell:text-paper">0{i + 1}</span>
                          <strong className="mt-[16px] block text-[1.3rem] leading-[0.9] font-extrabold uppercase tracking-[-0.05em] text-ink transition-colors group-hover/cell:text-paper">
                            {item.label}
                          </strong>
                          <small className="mt-[7px] block text-[0.62rem] leading-[1.4] text-[#555] transition-colors group-hover/cell:text-paper/90">{item.desc}</small>
                          <b className="absolute top-[15px] right-[16px] text-[1.15rem] font-normal text-ink transition-transform duration-300 group-hover/cell:translate-x-1 group-hover/cell:-translate-y-1 group-hover/cell:text-paper">
                            ↗
                          </b>
                        </Link>
                      ) : item.to ? (
                        /* Kartu link biasa (Lab) — satu sel */
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={closeAll}
                          className={`group/cell relative min-h-[108px] border-t border-line bg-[#fffdfa] p-[16px] no-underline transition-colors hover:bg-blue ${
                            i % 2 === 0 ? 'border-l border-line' : ''
                          }`}
                        >
                          <span className="font-mono text-[0.6rem] font-medium text-blue transition-colors group-hover/cell:text-paper">0{i + 1}</span>
                          <strong className="mt-[16px] block text-[1.1rem] leading-[0.9] font-extrabold uppercase tracking-[-0.05em] text-ink transition-colors group-hover/cell:text-paper">
                            {item.label}
                          </strong>
                          <small className="mt-[7px] block text-[0.62rem] leading-[1.4] text-[#555] transition-colors group-hover/cell:text-paper/90">{item.desc}</small>
                          <b className="absolute top-[15px] right-[16px] text-[1.15rem] font-normal text-ink transition-transform duration-300 group-hover/cell:translate-x-1 group-hover/cell:-translate-y-1 group-hover/cell:text-paper">
                            ↗
                          </b>
                        </Link>
                      ) : (
                        <span
                          key={item.label}
                          title="Segera hadir"
                          className={`relative min-h-[108px] border-t border-line bg-[#fffdfa] p-[16px] ${
                            i % 2 === 0 ? 'border-l border-line' : ''
                          }`}
                        >
                          <span className="font-mono text-[0.6rem] font-medium text-blue">0{i + 1}</span>
                          <strong className="mt-[16px] block text-[1.1rem] leading-[0.9] font-extrabold uppercase tracking-[-0.05em] text-ink">
                            {item.label}
                          </strong>
                          <small className="mt-[7px] block text-[0.62rem] leading-[1.4] text-[#555]">{item.desc}</small>
                          <small className="absolute top-[15px] right-[16px] font-mono text-[0.5rem] font-medium uppercase tracking-[0.12em] text-blue">
                            {item.tag}
                          </small>
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </nav>

      {/* CTA + pilihan bahasa (desktop) */}
      <div className="flex items-center gap-[18px] max-[900px]:gap-3 max-[700px]:hidden">
        <Link
          to="/#contact"
          className="group flex items-center gap-[9px] bg-acid px-[20px] py-[10px] font-mono text-[0.68rem] font-medium uppercase text-ink no-underline transition-colors duration-300 hover:bg-blue hover:text-paper"
        >
          {t('nav.cta')}{' '}
          <span className="text-[1rem] transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
            ↗
          </span>
        </Link>
        <LangSwitch onDark={onDark} />
      </div>

      {/* Tombol hamburger (mobile) */}
      <button
        type="button"
        aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="hidden cursor-pointer border-0 bg-transparent max-[700px]:flex max-[700px]:flex-col max-[700px]:gap-[5px]"
      >
        <i
          aria-hidden="true"
          className={`block w-6 border-t transition-transform duration-300 ${
            onDark ? 'border-paper' : 'border-ink'
          } ${menuOpen ? 'max-[700px]:translate-y-[3px] max-[700px]:rotate-45' : ''}`}
        />
        <i
          aria-hidden="true"
          className={`block w-6 border-t transition-transform duration-300 ${
            onDark ? 'border-paper' : 'border-ink'
          } ${menuOpen ? 'max-[700px]:-translate-y-[3px] max-[700px]:-rotate-45' : ''}`}
        />
      </button>

      {/* Dropdown mobile menu (animated) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-nav"
            aria-label="Menu mobile"
            initial={{ opacity: 0, y: reduce ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-[72px] right-0 left-0 m-0 hidden flex-col gap-[18px] border-b border-line bg-paper px-[6vw] py-6 max-[700px]:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeAll}
                className="font-mono text-[0.8rem] font-medium uppercase text-ink no-underline transition-colors hover:text-blue"
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}

            <div className="mt-[6px] border-t border-line pt-[18px]">
              <span className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.1em] text-[#999]">
                {t('nav.other')}
              </span>
              <div className="mt-[12px] flex flex-col gap-[8px]">
                {MORE_ITEMS.map((item) =>
                  item.to ? (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={closeAll}
                      className="flex items-center justify-between rounded-full bg-ink px-[18px] py-[11px] font-mono text-[0.78rem] font-medium uppercase text-paper no-underline"
                    >
                      {item.label} <span className="text-acid">✳</span>
                    </Link>
                  ) : (
                    <span
                      key={item.label}
                      className="flex cursor-default items-center justify-between rounded-full border border-ink/25 px-[18px] py-[11px] font-mono text-[0.78rem] font-medium uppercase text-[#999]"
                    >
                      {item.label} <small className="text-[0.55rem] tracking-[0.12em] text-blue">{item.tag}</small>
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Pilihan bahasa (mobile) */}
            <div className="mt-[6px] flex items-center justify-between border-t border-line pt-[18px]">
              <span className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.1em] text-[#999]">Language</span>
              <LangSwitch />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
