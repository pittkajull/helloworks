import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import Mascot from '../components/Mascot'
import Gear from '../components/Gear'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n.js'

/**
 * Halaman /lab — concept builds & eksperimen (pengganti portfolio,
 * karena HelloWorks masih baru & belum punya client work).
 * Tiap konsep adalah cara kami nunjukin skill.
 */
const PROJECTS = [
  {
    cat: 'Automation',
    title: 'KitchenOps',
    statusKey: 'lab.statusConcept',
    descKey: 'lab.d1',
  },
  {
    cat: 'Website · Merch',
    title: 'Merchdrop',
    statusKey: 'lab.statusProto',
    descKey: 'lab.d2',
  },
  {
    cat: 'AI · Automation',
    title: 'PitchDeck AI',
    statusKey: 'lab.statusExp',
    descKey: 'lab.d3',
  },
  {
    cat: 'Design',
    title: 'Framer Starter',
    statusKey: 'lab.statusSoon',
    descKey: 'lab.d4',
  },
  {
    cat: 'UI/UX',
    title: 'Ngegas',
    statusKey: 'lab.statusConcept',
    descKey: 'lab.d5',
  },
  {
    cat: 'Product · AI',
    title: 'HelloBot',
    statusKey: 'lab.statusProgress',
    descKey: 'lab.d6',
  },
]

export default function Lab() {
  const reduce = useReducedMotion()
  const { t } = useLang()

  // Masked line reveal untuk headline (sama seperti di Hero/Team)
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
          02 / The lab
        </motion.div>

        {/* Headline — reveal per baris */}
        <h1 className="relative z-[1] mt-[60px] text-[clamp(4.2rem,10.5vw,10.5rem)] leading-[0.8] font-extrabold tracking-[-0.1em]">
          <span className="block overflow-hidden pb-[0.07em]">
            <motion.span className="block" {...line(0)}>
              Fresh out of
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.07em]">
            <motion.span className="block" {...line(1)}>
              the{' '}
              <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">lab.</em>
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
          {t('lab.heroSub')}
        </motion.p>

        {/* Baris dekoratif */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="mt-auto pt-[40px] font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-paper/50 max-[700px]:text-[0.55rem]"
        >
          concepts <span className="text-acid">✳</span> experiments <span className="text-acid">✳</span> prototypes
        </motion.div>

        {/* Halo nyapa */}
        <Mascot
          speech="Fresh out of the lab"
          className="absolute right-[5%] bottom-[14%] w-[170px] max-[700px]:right-[4%] max-[700px]:bottom-[16%] max-[700px]:w-[95px]"
        />
      </section>

      {/* ============ MARQUEE ============ */}
      <Marquee words={['Concepts', 'Experiments', 'Prototypes', 'Fresh out of the lab']} />

      {/* ============ THE EXPERIMENTS ============ */}
      <section className="border-b border-line bg-paper px-[5vw] py-[125px] max-[700px]:px-[6vw] max-[700px]:py-[85px]">
        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em]">
          02.1 / The experiments
        </Reveal>

        <div className="my-[70px] flex items-end justify-between max-[700px]:my-[50px] max-[700px]:block">
          <Reveal as="h2" className="text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.84] font-extrabold tracking-[-0.1em]">
            Small things,
            <br />
            big <em className="font-serif font-normal italic tracking-[-0.1em] text-blue">lessons.</em>
          </Reveal>
          <Reveal as="p" delay={0.12} className="max-w-[230px] text-[0.85rem] leading-[1.5] max-[700px]:mt-[30px]">
            {t('lab.sub')}
          </Reveal>
        </div>

        {/* Grid concept builds — hover berubah jadi ink, arrow ↗ muncul */}
        <div className="grid grid-cols-2 gap-[40px] max-[700px]:grid-cols-1 max-[700px]:gap-[24px]">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={(i % 2) * 0.08} className="h-full">
              <article className="group relative flex h-full min-h-[230px] flex-col border border-line bg-[#fffdfa] p-[26px] transition-colors duration-300 hover:border-ink hover:bg-ink">
                {/* Nomor + status */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] font-medium text-flame">0{i + 1}</span>
                  <span className="font-mono text-[0.55rem] font-medium uppercase tracking-[0.12em] text-flame transition-opacity duration-300 group-hover:opacity-0">
                    {t(project.statusKey)}
                  </span>
                </div>

                {/* Arrow ↗ muncul saat hover */}
                <span
                  aria-hidden="true"
                  className="absolute top-[22px] right-[24px] grid size-8 translate-x-1 -translate-y-1 place-items-center rounded-full border border-current text-[1.05rem] text-paper opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  ↗
                </span>

                {/* Kategori */}
                <small className="mt-[38px] font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] text-blue transition-colors duration-300 group-hover:text-acid">
                  {project.cat}
                </small>

                {/* Judul */}
                <h3 className="mt-[10px] text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[0.9] font-extrabold tracking-[-0.05em] text-ink transition-colors duration-300 group-hover:text-paper">
                  {project.title}
                </h3>

                {/* Deskripsi */}
                <p className="mt-auto pt-[16px] text-[0.8rem] leading-[1.55] text-[#555] transition-colors duration-300 group-hover:text-paper/75">
                  {t(project.descKey)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ WHY THE LAB — dark ink ============ */}
      <section className="relative overflow-hidden border-b border-line bg-ink px-[5vw] py-[125px] text-paper max-[700px]:px-[6vw] max-[700px]:py-[85px]">
        <span aria-hidden="true" className="absolute top-[30px] right-[4%] text-[clamp(4rem,8vw,7rem)] leading-none text-flame/20">
          ✳
        </span>

        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid">
          02.2 / Why the lab?
        </Reveal>
        <Reveal
          as="h2"
          className="mt-[55px] max-w-[820px] text-[clamp(2.8rem,6vw,6rem)] leading-[0.85] font-extrabold tracking-[-0.1em]"
        >
          {t('lab.explainHead1')} <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">{t('lab.explainHead2')}</em>
        </Reveal>

        <div className="mt-[70px] grid grid-cols-3 gap-x-[40px] max-[700px]:mt-[50px] max-[700px]:grid-cols-1 max-[700px]:gap-y-[38px]">
          {[1, 2, 3].map((n) => (
            <Reveal key={n} delay={n * 0.08}>
              <div className="border-t border-paper/25 pt-[16px]">
                <span className="font-mono text-[0.6rem] font-medium text-flame">0{n}</span>
                <h3 className="mt-[14px] text-[1.15rem] font-extrabold tracking-[-0.03em]">{t(`lab.explainT${n}`)}</h3>
                <p className="mt-[10px] text-[0.8rem] leading-[1.55] text-paper/65">{t(`lab.explain${n}`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA — let's build something ============ */}
      <section className="relative overflow-hidden border-b border-line bg-blue px-[5vw] py-[110px] text-paper max-[700px]:px-[6vw] max-[700px]:py-[80px]">
        <Gear className="absolute right-[6%] top-[16%] w-[90px] max-[700px]:right-[6%] max-[700px]:top-[8%] max-[700px]:w-[56px]" />

        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid">
          03 / Let&apos;s build something
        </Reveal>
        <Reveal
          as="h2"
          className="mt-[60px] max-w-[900px] text-[clamp(3rem,7vw,7rem)] leading-[0.85] font-extrabold tracking-[-0.1em]"
        >
          {t('lab.ctaHead1')}
          <br />
          <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">{t('lab.ctaHead2')}</em>
        </Reveal>
        <Reveal delay={0.1} className="mt-[35px] max-w-[420px] text-[0.9rem] leading-[1.55] text-paper/75">
          {t('lab.ctaSub')}
        </Reveal>
        <Reveal delay={0.15} className="mt-[45px]">
          <Link
            to="/#contact"
            className="group/link inline-flex items-center gap-[12px] border-b border-paper pb-[6px] font-mono text-[0.75rem] font-medium uppercase text-paper no-underline transition-colors hover:text-acid"
          >
            {t('lab.ctaLink')}
            <span className="text-[1.15rem] transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
              ↗
            </span>
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
