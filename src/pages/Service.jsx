import { motion, useReducedMotion } from 'motion/react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import Mascot from '../components/Mascot'
import Gear from '../components/Gear'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n.js'
import { SERVICES, pick } from '../lib/services'

/**
 * Halaman /services/:slug — satu halaman per layanan HelloWorks.
 * Isi: hero layanan, scope (yang kami kerjain), karya pilihan,
 * nav antar layanan, dan CTA. 5 halaman, 1 komponen (slug beda).
 * Konten masih draft — tinggal ganti di src/lib/services.js.
 */
export default function Service() {
  const { slug } = useParams()
  const { t, lang } = useLang()
  const reduce = useReducedMotion()

  const index = SERVICES.findIndex((s) => s.slug === slug)
  const service = index >= 0 ? SERVICES[index] : null

  if (!service) return <Navigate to="/#services" replace />

  const next = SERVICES[(index + 1) % SERVICES.length]

  // Masked line reveal untuk headline (sama seperti di Hero/Team/Lab)
  const line = (i) => ({
    initial: { y: reduce ? 0 : '115%' },
    animate: { y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 },
  })

  return (
    <main id="top">
      {/* ============ HERO — dark ink ============ */}
      <section className="relative flex min-h-[620px] flex-col overflow-hidden bg-ink px-[5vw] pt-[185px] pb-[55px] text-paper max-[700px]:min-h-[560px] max-[700px]:px-[6vw] max-[700px]:pt-[130px] max-[700px]:pb-[35px]">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid max-[700px]:text-[0.58rem]"
        >
          <span className="pulse-dot mr-2 inline-block size-2 rounded-full bg-blue" />
          {service.num} / {service.title}
        </motion.div>

        {/* Headline — reveal per baris */}
        <h1 className="relative z-[1] mt-[60px] text-[clamp(4.2rem,10.5vw,10.5rem)] leading-[0.8] font-extrabold tracking-[-0.1em]">
          <span className="block overflow-hidden pb-[0.07em]">
            <motion.span className="block" {...line(0)}>
              {service.hero.head1}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.07em]">
            <motion.span className="block" {...line(1)}>
              {service.hero.head2}{' '}
              <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">{service.hero.accent}</em>
              <span className="ml-[10px] inline-block align-top text-[0.42em] text-flame" style={{ marginTop: 12 }}>
                ✳
              </span>
            </motion.span>
          </span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          className="mt-[30px] max-w-[420px] text-[0.9rem] leading-[1.55] text-paper/70"
        >
          {pick(service.heroSub, lang)}
        </motion.p>

        {/* Baris dekoratif */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="mt-auto pt-[40px] font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-paper/50 max-[700px]:text-[0.55rem]"
        >
          {service.decoWords.map((word, i) => (
            <span key={word} className="whitespace-nowrap">
              {i > 0 && <span className="text-acid"> ✳ </span>}
              {word}
            </span>
          ))}
        </motion.div>

        {/* Halo nyapa */}
        <Mascot
          speech={pick(service.mascot, lang)}
          className="absolute right-[5%] bottom-[14%] w-[170px] max-[700px]:right-[4%] max-[700px]:bottom-[16%] max-[700px]:w-[95px]"
        />
      </section>

      {/* ============ MARQUEE ============ */}
      <Marquee words={service.marquee} />

      {/* ============ WHAT WE DO — paper ============ */}
      <section className="border-b border-line bg-paper px-[5vw] py-[125px] max-[700px]:px-[6vw] max-[700px]:py-[85px]">
        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em]">
          {service.num}.1 / What we do
        </Reveal>
        <Reveal
          as="h2"
          className="mt-[55px] max-w-[820px] text-[clamp(2.8rem,6vw,6rem)] leading-[0.85] font-extrabold tracking-[-0.1em]"
        >
          {pick(service.scopeHead, lang)}
        </Reveal>

        <div className="mt-[70px] grid grid-cols-2 gap-x-[40px] gap-y-[38px] max-[700px]:mt-[50px] max-[700px]:grid-cols-1 max-[700px]:gap-y-[38px]">
          {service.scope.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="border-t border-line pt-[16px]">
                <span className="font-mono text-[0.6rem] font-medium text-blue">0{i + 1}</span>
                <h3 className="mt-[14px] text-[1.15rem] font-extrabold tracking-[-0.03em]">{pick(item.t, lang)}</h3>
                <p className="mt-[10px] text-[0.8rem] leading-[1.55] text-[#555]">{pick(item.d, lang)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ SELECTED WORK — dark ink ============ */}
      <section className="border-b border-line bg-ink px-[5vw] py-[125px] text-paper max-[700px]:px-[6vw] max-[700px]:py-[85px]">
        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid">
          {service.num}.2 / {t('service.works')}
        </Reveal>
        <Reveal delay={0.05} className="mt-[24px] max-w-[440px] text-[0.8rem] leading-[1.5] text-paper/55">
          {t('service.worksNote')}
        </Reveal>

        <div className="mt-[45px] grid grid-cols-3 gap-[24px] max-[700px]:mt-[40px] max-[700px]:grid-cols-1 max-[700px]:gap-[16px]">
          {service.works.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col border border-paper/15 bg-white/[0.03] p-[24px] transition-colors duration-300 hover:border-acid/60 hover:bg-white/[0.06]">
                <span className="font-mono text-[0.62rem] font-medium text-flame">0{i + 1}</span>
                <small className="mt-[26px] font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] text-acid">
                  {w.cat}
                </small>
                <h3 className="mt-[8px] text-[1.35rem] leading-[0.95] font-extrabold tracking-[-0.04em]">{w.title}</h3>
                <p className="mt-auto pt-[14px] text-[0.78rem] leading-[1.55] text-paper/60">{pick(w.d, lang)}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Nav: kembali ke layanan / lanjut layanan berikutnya */}
        <div className="mt-[90px] flex items-center justify-between max-[700px]:mt-[60px] max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[14px]">
          <Link
            to="/#services"
            className="group/link inline-flex items-center gap-[8px] font-mono text-[0.68rem] font-medium uppercase text-paper no-underline transition-colors hover:text-acid"
          >
            <span className="transition-transform duration-300 group-hover/link:-translate-x-1">←</span>
            {t('service.back')}
          </Link>
          <Link
            to={`/services/${next.slug}`}
            className="group/link inline-flex items-center gap-[8px] font-mono text-[0.68rem] font-medium uppercase text-paper no-underline transition-colors hover:text-acid"
          >
            {t('service.next')}: {next.title}
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* ============ CTA — let's talk ============ */}
      <section className="relative overflow-hidden border-b border-line bg-blue px-[5vw] py-[110px] text-paper max-[700px]:px-[6vw] max-[700px]:py-[80px]">
        <Gear className="absolute right-[6%] top-[16%] w-[90px] max-[700px]:right-[6%] max-[700px]:top-[8%] max-[700px]:w-[56px]" />

        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid">
          {service.num}.3 / Let&apos;s talk
        </Reveal>
        <Reveal
          as="h2"
          className="mt-[60px] max-w-[900px] text-[clamp(3rem,7vw,7rem)] leading-[0.85] font-extrabold tracking-[-0.1em]"
        >
          {pick(service.cta.head1, lang)}{' '}
          <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">{pick(service.cta.head2, lang)}</em>
        </Reveal>
        <Reveal delay={0.1} className="mt-[35px] max-w-[420px] text-[0.9rem] leading-[1.55] text-paper/75">
          {pick(service.cta.sub, lang)}
        </Reveal>
        <Reveal delay={0.15} className="mt-[45px]">
          <Link
            to="/#contact"
            className="group/link inline-flex items-center gap-[12px] border-b border-paper pb-[6px] font-mono text-[0.75rem] font-medium uppercase text-paper no-underline transition-colors hover:text-acid"
          >
            {t('work.cta')}
            <span className="text-[1.15rem] transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
              ↗
            </span>
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
