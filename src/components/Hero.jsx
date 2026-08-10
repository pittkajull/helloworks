import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n.js'
import { Lines } from '../lib/i18n.jsx'
import Mascot from './Mascot'

export default function Hero() {
  const reduce = useReducedMotion()
  const { t } = useLang()

  // Masked line reveal untuk headline
  const line = (i) => ({
    initial: { y: reduce ? 0 : '115%' },
    animate: { y: 0 },
    transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 },
  })

  return (
    <section className="relative flex min-h-[780px] flex-col overflow-hidden bg-acid px-[5vw] pt-[185px] pb-[55px] max-[700px]:min-h-[690px] max-[700px]:px-[6vw] max-[700px]:pt-[130px] max-[700px]:pb-[35px]">
      {/* Kicker */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] max-[700px]:text-[0.58rem]"
      >
        <span className="pulse-dot mr-2 inline-block size-2 rounded-full bg-blue" />
        {t('hero.kicker')}
      </motion.div>

      {/* Headline — reveal per baris (slide-up dari balik mask) */}
      <h1 className="relative z-[1] mt-[65px] text-[clamp(5rem,14.4vw,14rem)] font-extrabold leading-[0.79] tracking-[-0.1em] max-[700px]:text-[20vw]">
        <span className="block overflow-hidden pb-[0.07em]">
          <motion.span className="block" {...line(0)}>
            We build
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.07em]">
          <motion.span className="block" {...line(1)}>
            <em className="font-serif font-normal tracking-[-0.1em]">better</em> ways
          </motion.span>
        </span>
        <span className="absolute ml-[10px] mt-[12px] text-[0.42em] text-blue">✳</span>
      </h1>

      {/* Baris bawah */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
        className="relative z-[2] mt-auto flex items-end"
      >
        <p className="text-[0.86rem] font-semibold leading-[1.4]">
          <Lines text={t('hero.sub')} />
        </p>

        {/* Circle-link mengambang pelan */}
        <motion.div
          className="ml-[25vw] max-[700px]:ml-auto max-[700px]:mr-[10px]"
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <a
            href="#about"
            aria-label="Scroll ke about"
            className="grid size-[76px] place-items-center rounded-full border border-ink text-[1.5rem] text-ink no-underline transition-all duration-300 hover:rotate-[-45deg] hover:border-blue hover:bg-blue hover:text-paper max-[700px]:size-[58px]"
          >
            ↓
          </a>
        </motion.div>

        <div className="ml-auto font-mono text-[0.64rem] font-medium uppercase leading-[1.7] max-[700px]:hidden">
          {t('hero.scroll')}
          <br />
          <span className="text-blue">01 — 05</span>
        </div>
      </motion.div>

      {/* Dekorasi shape — scale-in saat load */}
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.9, ease: EASE }}
        className="absolute top-[20%] right-[9%] size-[270px] rounded-full bg-blue mix-blend-multiply max-[700px]:top-[33%] max-[700px]:right-[-5%] max-[700px]:size-[170px]"
      />
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
        className="absolute top-[42%] right-[23%] size-[135px] rounded-full bg-flame mix-blend-multiply max-[700px]:top-[48%] max-[700px]:right-[31%] max-[700px]:size-[90px]"
      />

      {/* Maskot HelloWorks — Halo, melambai + mata ikut kursor */}
      <Mascot
        speech="Let's build!"
        className="absolute right-[4%] bottom-[15%] w-[190px] [@media(min-width:701px)_and_(max-width:1200px)]:hidden max-[700px]:right-[4%] max-[700px]:bottom-[20%] max-[700px]:w-[100px]"
      />
    </section>
  )
}
