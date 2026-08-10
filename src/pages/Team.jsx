import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import Mascot from '../components/Mascot'
import Gear from '../components/Gear'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n.js'
import { TEAM } from '../lib/members'

/**
 * Halaman /team — lima co-founder di balik HelloWorks.
 * Foto masih dummy (monogram warna brand), portfolio sudah asli.
 * Hover di foto → 2 pilihan: Profile (halaman /team/:slug) atau Portfolio (website asli).
 */

/* Foto placeholder — monogram warna brand + overlay 2 aksi saat hover (desktop) */
function Portrait({ member, index }) {
  const reduce = useReducedMotion()
  const { t } = useLang()

  return (
    <motion.div
      whileHover={reduce ? undefined : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`group relative aspect-[4/5] overflow-hidden ${member.tone}`}
    >
      <span className="absolute top-3 left-3 font-mono text-[0.62rem] font-medium uppercase opacity-70">
        0{index + 1}
      </span>
      <span className="absolute inset-0 grid select-none place-items-center font-serif text-[clamp(3.5rem,7.5vw,7rem)] italic tracking-[-0.05em]">
        {member.initials}
      </span>
      <span className="absolute right-3 bottom-3 font-mono text-[0.55rem] font-medium uppercase tracking-[0.12em] opacity-60">
        Portrait soon
      </span>

      {/* Overlay aksi — Profile → halaman orangnya, Portfolio ↗ ke website asli */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[10px] bg-ink/70 opacity-0 backdrop-blur-[3px] transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100 max-[700px]:hidden">
        <Link
          to={`/team/${member.slug}`}
          className="w-[72%] border border-paper/50 bg-acid py-[9px] text-center font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink no-underline transition-colors duration-300 hover:bg-blue hover:text-paper"
        >
          {t('team.profile')} →
        </Link>
        <a
          href={member.url}
          target="_blank"
          rel="noreferrer"
          className="w-[72%] border border-paper/50 py-[9px] text-center font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-paper no-underline transition-colors duration-300 hover:bg-paper hover:text-ink"
        >
          {t('team.portfolio')} ↗
        </a>
      </div>
    </motion.div>
  )
}

/* Kartu anggota — semua ukurannya sama persis */
function MemberCard({ member, index }) {
  const { t } = useLang()

  return (
    <Reveal delay={index * 0.07} className="h-full">
      <article className="group flex h-full flex-col">
        <Portrait member={member} index={index} />

        {/* Aksi mobile — gak ada hover di layar sentuh, jadi tombolnya ditampilkan langsung */}
        <div className="mt-[12px] grid grid-cols-2 gap-[8px] min-[701px]:hidden">
          <Link
            to={`/team/${member.slug}`}
            className="border border-ink/25 py-[9px] text-center font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink no-underline transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
          >
            {t('team.profile')} →
          </Link>
          <a
            href={member.url}
            target="_blank"
            rel="noreferrer"
            className="border border-ink/25 py-[9px] text-center font-mono text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink no-underline transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
          >
            {t('team.portfolio')} ↗
          </a>
        </div>

        <small className="mt-[18px] block font-mono text-[0.6rem] font-medium uppercase text-[#555]">
          {member.role}
        </small>
        <h3 className="mt-[6px] text-[1.45rem] font-extrabold tracking-[-0.04em] max-[700px]:text-[1.55rem]">
          {member.name}
        </h3>
        <a
          href={member.url}
          target="_blank"
          rel="noreferrer"
          className="mt-[10px] inline-block w-fit border-b border-ink pb-[2px] font-mono text-[0.6rem] font-medium uppercase text-ink no-underline transition-colors hover:text-blue"
        >
          {member.domain} ↗
        </a>
        <p className="mt-auto pt-[12px] text-[0.78rem] leading-[1.55] text-[#555]">{t(member.bioKey)}</p>
      </article>
    </Reveal>
  )
}

export default function Team() {
  const reduce = useReducedMotion()
  const { t } = useLang()

  // Masked line reveal untuk headline (sama seperti di Hero)
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
          05 / The people
        </motion.div>

        {/* Headline — reveal per baris */}
        <h1 className="relative z-[1] mt-[60px] text-[clamp(4.2rem,10.5vw,10.5rem)] leading-[0.8] font-extrabold tracking-[-0.1em]">
          <span className="block overflow-hidden pb-[0.07em]">
            <motion.span className="block" {...line(0)}>
              Five humans.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.07em]">
            <motion.span className="block" {...line(1)}>
              <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">one</em> build.
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
          {t('team.heroSub')}
        </motion.p>

        {/* Baris statistik dekoratif */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="mt-auto pt-[40px] font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-paper/50 max-[700px]:text-[0.55rem]"
        >
          5 humans <span className="text-acid">✳</span> 1 studio <span className="text-acid">✳</span> ∞ ideas
        </motion.div>

        {/* Halo nyapa */}
        <Mascot
          speech="Meet the team"
          className="absolute right-[5%] bottom-[14%] w-[170px] max-[700px]:right-[4%] max-[700px]:bottom-[16%] max-[700px]:w-[95px]"
        />
      </section>

      {/* ============ MARQUEE ============ */}
      <Marquee words={['Five humans', 'One studio', 'Never stop building', 'Better ways']} />

      {/* ============ THE CO-FOUNDERS ============ */}
      <section className="border-b border-line bg-paper px-[5vw] py-[125px] max-[700px]:px-[6vw] max-[700px]:py-[85px]">
        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em]">
          05.1 / The co-founders
        </Reveal>

        <div className="my-[70px] flex items-end justify-between max-[700px]:my-[50px] max-[700px]:block">
          <Reveal as="h2" className="text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.84] font-extrabold tracking-[-0.1em]">
            The people
            <br />
            behind the <em className="font-serif font-normal italic tracking-[-0.1em] text-blue">build.</em>
          </Reveal>
          <Reveal as="p" delay={0.12} className="max-w-[230px] text-[0.85rem] leading-[1.5] max-[700px]:mt-[30px]">
            {t('team.sectionDesc')}
          </Reveal>
        </div>

        {/* Grid setara: semua kartu ukuran sama — 3 di atas, 2 di bawah (rata tengah) */}
        <div className="flex flex-wrap justify-center gap-x-[40px] gap-y-[70px] max-[700px]:gap-y-[55px]">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="w-[calc((100%-80px)/3)] max-w-[420px] max-[700px]:w-full max-[700px]:max-w-none"
            >
              <MemberCard member={member} index={i} />
            </div>
          ))}
        </div>

        {/* Penutup */}
        <Reveal className="mt-[150px] max-w-[760px] max-[700px]:mt-[80px]">
          <span className="font-mono text-[0.62rem] font-medium uppercase text-[#555]">One team, one vision</span>
          <h2 className="mt-[18px] text-[clamp(2.6rem,6vw,6rem)] leading-[0.85] font-extrabold tracking-[-0.1em]">
            Never stop
            <br />
            <em className="font-serif font-normal italic tracking-[-0.1em] text-blue">building.</em>
          </h2>
        </Reveal>
      </section>

      {/* ============ CTA — join the build ============ */}
      <section className="relative overflow-hidden border-b border-line bg-blue px-[5vw] py-[110px] text-paper max-[700px]:px-[6vw] max-[700px]:py-[80px]">
        <Gear className="absolute right-[6%] top-[16%] w-[90px] max-[700px]:right-[6%] max-[700px]:top-[8%] max-[700px]:w-[56px]" />

        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid">
          06 / Join the build
        </Reveal>
        <Reveal
          as="h2"
          className="mt-[60px] max-w-[900px] text-[clamp(3rem,7vw,7rem)] leading-[0.85] font-extrabold tracking-[-0.1em]"
        >
          {t('team.ctaHead1')}
          <br />
          <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">{t('team.ctaHead2')}</em>
        </Reveal>
        <Reveal delay={0.1} className="mt-[35px] max-w-[420px] text-[0.9rem] leading-[1.55] text-paper/75">
          {t('team.ctaSub')}
        </Reveal>
        <Reveal delay={0.15} className="mt-[45px]">
          <Link
            to="/#contact"
            className="group/link inline-flex items-center gap-[12px] border-b border-paper pb-[6px] font-mono text-[0.75rem] font-medium uppercase text-paper no-underline transition-colors hover:text-acid"
          >
            {t('team.ctaLink')}
            <span className="text-[1.15rem] transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
              ↗
            </span>
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
