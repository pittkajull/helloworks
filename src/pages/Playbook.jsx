import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import Mascot from '../components/Mascot'
import Gear from '../components/Gear'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n.js'

/**
 * Halaman /playbook — cara kerja HelloWorks.
 * Continuous product cycle (Research → Understand → Design → Build →
 * Launch → Learn → Improve) + aturan yang gak pernah kami langgar.
 * Buat client: biar tau persis gimana project bakal dijalanin.
 */

/* Tujuh langkah siklus — judul tetap English (istilah proses), deskripsi dilokalkan */
const STEPS = ['Research', 'Understand', 'Design', 'Build', 'Launch', 'Learn', 'Improve'].map((title, i) => ({
  title,
  descKey: `playbook.step${i + 1}`,
}))

/* Empat aturan — judul & deskripsi keduanya dilokalkan */
const RULES = [1, 2, 3, 4].map((n) => ({
  titleKey: `playbook.ruleT${n}`,
  descKey: `playbook.rule${n}`,
}))

export default function Playbook() {
  const reduce = useReducedMotion()
  const { t } = useLang()

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
          03 / The playbook
        </motion.div>

        {/* Headline — reveal per baris */}
        <h1 className="relative z-[1] mt-[60px] text-[clamp(4.2rem,10.5vw,10.5rem)] leading-[0.8] font-extrabold tracking-[-0.1em]">
          <span className="block overflow-hidden pb-[0.07em]">
            <motion.span className="block" {...line(0)}>
              How we
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.07em]">
            <motion.span className="block" {...line(1)}>
              <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">work.</em>
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
          {t('playbook.heroSub')}
        </motion.p>

        {/* Baris dekoratif */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="mt-auto pt-[40px] font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-paper/50 max-[700px]:text-[0.55rem]"
        >
          discover <span className="text-acid">✳</span> design <span className="text-acid">✳</span> build{' '}
          <span className="text-acid">✳</span> ship <span className="text-acid">✳</span> improve
        </motion.div>

        {/* Halo nyapa */}
        <Mascot
          speech="The way we work"
          className="absolute right-[5%] bottom-[14%] w-[170px] max-[700px]:right-[4%] max-[700px]:bottom-[16%] max-[700px]:w-[95px]"
        />
      </section>

      {/* ============ MARQUEE ============ */}
      <Marquee words={['Discover', 'Design', 'Build', 'Ship', 'Improve']} />

      {/* ============ THE CYCLE — daftar proses vertikal ============ */}
      <section className="border-b border-line bg-paper px-[5vw] py-[125px] max-[700px]:px-[6vw] max-[700px]:py-[85px]">
        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em]">
          03.1 / The cycle
        </Reveal>

        <div className="my-[70px] flex items-end justify-between max-[700px]:my-[50px] max-[700px]:block">
          <Reveal
            as="h2"
            className="text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.84] font-extrabold tracking-[-0.1em]"
          >
            One cycle,
            <br />
            never <em className="font-serif font-normal italic tracking-[-0.1em] text-blue">finished.</em>
          </Reveal>
          <Reveal as="p" delay={0.12} className="max-w-[230px] text-[0.85rem] leading-[1.5] max-[700px]:mt-[30px]">
            {t('playbook.cycleSub')}
          </Reveal>
        </div>

        {/* Langkah siklus — nomor biru, judul gede, deskripsi kanan */}
        <div className="border-t border-line">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.04}>
              <article className="group grid grid-cols-[auto_1fr] items-baseline gap-x-[34px] border-b border-line py-[26px] transition-colors duration-300 max-[700px]:block max-[700px]:py-[22px]">
                <span className="font-mono text-[0.65rem] font-medium text-blue max-[700px]:mb-[10px] max-[700px]:block">
                  0{i + 1}
                </span>
                <div className="flex flex-1 items-baseline justify-between gap-[40px] max-[700px]:block">
                  <h3 className="text-[clamp(1.7rem,3.4vw,3.1rem)] leading-[0.9] font-extrabold tracking-[-0.06em] text-ink transition-colors duration-300 group-hover:text-blue">
                    {step.title}
                  </h3>
                  <p className="max-w-[400px] text-[0.82rem] leading-[1.55] text-[#555] transition-colors duration-300 group-hover:text-ink/80 max-[700px]:mt-[10px]">
                    {t(step.descKey)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ THE RULES — dark ink ============ */}
      <section className="relative overflow-hidden border-b border-line bg-ink px-[5vw] py-[125px] text-paper max-[700px]:px-[6vw] max-[700px]:py-[85px]">
        <span
          aria-hidden="true"
          className="absolute top-[30px] right-[4%] text-[clamp(4rem,8vw,7rem)] leading-none text-flame/20"
        >
          ✳
        </span>

        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid">
          03.2 / The rules
        </Reveal>
        <Reveal
          as="h2"
          className="mt-[55px] max-w-[820px] text-[clamp(2.8rem,6vw,6rem)] leading-[0.85] font-extrabold tracking-[-0.1em]"
        >
          Rules we <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">never break.</em>
        </Reveal>

        <div className="mt-[70px] grid grid-cols-2 gap-x-[40px] gap-y-[38px] max-[700px]:mt-[50px] max-[700px]:grid-cols-1 max-[700px]:gap-y-[38px]">
          {RULES.map((rule, i) => (
            <Reveal key={rule.titleKey} delay={i * 0.08}>
              <div className="border-t border-paper/25 pt-[16px]">
                <span className="font-mono text-[0.6rem] font-medium text-acid">0{i + 1}</span>
                <h3 className="mt-[14px] text-[1.15rem] font-extrabold tracking-[-0.03em]">{t(rule.titleKey)}</h3>
                <p className="mt-[10px] text-[0.8rem] leading-[1.55] text-paper/65">{t(rule.descKey)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA — put the playbook to work ============ */}
      <section className="relative overflow-hidden border-b border-line bg-blue px-[5vw] py-[110px] text-paper max-[700px]:px-[6vw] max-[700px]:py-[80px]">
        <Gear className="absolute right-[6%] top-[16%] w-[90px] max-[700px]:right-[6%] max-[700px]:top-[8%] max-[700px]:w-[56px]" />

        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid">
          04 / Put it to work
        </Reveal>
        <Reveal
          as="h2"
          className="mt-[60px] max-w-[900px] text-[clamp(3rem,7vw,7rem)] leading-[0.85] font-extrabold tracking-[-0.1em]"
        >
          {t('playbook.ctaHead1')}
          <br />
          <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">{t('playbook.ctaHead2')}</em>
        </Reveal>
        <Reveal delay={0.1} className="mt-[35px] max-w-[420px] text-[0.9rem] leading-[1.55] text-paper/75">
          {t('playbook.ctaSub')}
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
