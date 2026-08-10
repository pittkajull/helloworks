import { motion, useReducedMotion } from 'motion/react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import Mascot from '../components/Mascot'
import Gear from '../components/Gear'
import { EASE } from '../lib/motion'
import { useLang } from '../lib/i18n.js'
import { TEAM, PROFILE, pick } from '../lib/members'

/**
 * Halaman /team/:slug — profil singkat per co-founder.
 * Isi: tentang orangnya, karya pilihan (bukan semua), sertifikat,
 * plus CTA buka portfolio lengkap. 5 halaman, 1 komponen (slug beda).
 * Konten masih draft — tinggal ganti di src/lib/members.js.
 */
export default function Member() {
  const { slug } = useParams()
  const { t, lang } = useLang()
  const reduce = useReducedMotion()

  const index = TEAM.findIndex((m) => m.slug === slug)
  const member = index >= 0 ? TEAM[index] : null

  if (!member) return <Navigate to="/team" replace />

  const profile = PROFILE[member.slug]
  const firstName = member.name.split(' ')[0]
  const next = TEAM[(index + 1) % TEAM.length]
  const roleShort = member.role.split('· ')[1] ?? member.role

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
        <div className="flex items-start justify-between gap-[6vw] max-[700px]:flex-col max-[700px]:gap-[42px]">
          {/* Kiri: kicker + headline + sub */}
          <div className="max-w-[520px]">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid max-[700px]:text-[0.58rem]"
            >
              <span className="pulse-dot mr-2 inline-block size-2 rounded-full bg-blue" />
              0{index + 1} / {t('member.kicker')}
            </motion.div>

            <h1 className="relative z-[1] mt-[50px] text-[clamp(3.4rem,9vw,9rem)] leading-[0.8] font-extrabold tracking-[-0.1em]">
              <span className="block overflow-hidden pb-[0.07em]">
                <motion.span className="block" {...line(0)}>
                  {firstName}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.07em]">
                <motion.span className="block" {...line(1)}>
                  <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">of the</em> build.
                  <span className="ml-[10px] inline-block align-top text-[0.42em] text-flame" style={{ marginTop: 12 }}>
                    ✳
                  </span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              className="mt-[26px] max-w-[420px] text-[0.9rem] leading-[1.55] text-paper/70"
            >
              {t('member.sub')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
              className="mt-[28px] font-mono text-[0.66rem] font-medium uppercase tracking-[0.08em] text-paper/60"
            >
              {member.role}
            </motion.div>
          </div>

          {/* Kanan: portrait tile + caption + halo nyapa */}
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="flex w-[min(300px,32vw)] shrink-0 flex-col max-[700px]:w-full max-[700px]:max-w-[320px]"
          >
            <a
              href={member.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Portfolio ${member.name}`}
              className="group relative block aspect-square overflow-hidden border border-paper/15"
            >
              <span className={`absolute inset-0 grid place-items-center ${member.tone}`}>
                <span className="absolute top-3 left-3 font-mono text-[0.62rem] font-medium uppercase opacity-70">
                  0{index + 1}
                </span>
                <span className="select-none font-serif text-[clamp(4rem,8vw,7rem)] italic tracking-[-0.05em]">
                  {member.initials}
                </span>
                <span className="absolute top-3 right-3 grid size-9 translate-x-1 -translate-y-1 place-items-center rounded-full border border-current text-[1.05rem] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                  ↗
                </span>
                <span className="absolute right-3 bottom-3 font-mono text-[0.55rem] font-medium uppercase tracking-[0.12em] opacity-60">
                  Portrait soon
                </span>
              </span>
            </a>
            <a
              href={member.url}
              target="_blank"
              rel="noreferrer"
              className="group/link mt-[16px] inline-flex w-fit items-center gap-[8px] border-b border-paper/40 pb-[4px] font-mono text-[0.66rem] font-medium uppercase tracking-[0.06em] text-paper no-underline transition-colors hover:border-acid hover:text-acid"
            >
              {t('member.fullPortfolio')}
              <span className="text-[1rem] transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                ↗
              </span>
            </a>
            <Mascot speech={t('member.mascot')} className="mt-[20px] w-[130px] self-end max-[700px]:hidden" />
          </motion.div>
        </div>

        {/* Baris dekoratif bawah */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="mt-auto pt-[40px] font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-paper/50 max-[700px]:text-[0.55rem]"
        >
          {firstName} <span className="text-acid">✳</span> {roleShort} <span className="text-acid">✳</span> never stop building
        </motion.div>
      </section>

      {/* ============ MARQUEE ============ */}
      <Marquee words={[firstName, roleShort, 'Never stop building', 'Better ways']} />

      {/* ============ ABOUT — paper ============ */}
      <section className="border-b border-line bg-paper px-[5vw] py-[125px] max-[700px]:px-[6vw] max-[700px]:py-[85px]">
        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em]">
          0{index + 1}.1 / {t('member.about')}
        </Reveal>
        <Reveal
          as="h2"
          className="mt-[55px] max-w-[820px] text-[clamp(2.8rem,6vw,6rem)] leading-[0.85] font-extrabold tracking-[-0.1em]"
        >
          {t('member.aboutHead1')}{' '}
          <em className="font-serif font-normal italic tracking-[-0.1em] text-blue">{t('member.aboutHead2')}</em>
        </Reveal>
        <Reveal delay={0.1} className="mt-[40px] max-w-[640px] text-[1.02rem] leading-[1.65] text-[#444]">
          {pick(profile.about, lang)}
        </Reveal>
      </section>

      {/* ============ SELECTED WORKS — dark ink ============ */}
      <section className="border-b border-line bg-ink px-[5vw] py-[125px] text-paper max-[700px]:px-[6vw] max-[700px]:py-[85px]">
        <div className="flex items-end justify-between gap-[24px] max-[700px]:block">
          <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid">
            0{index + 1}.2 / {t('member.projects')}
          </Reveal>
          <Reveal delay={0.08} className="max-[700px]:mt-[16px]">
            <a
              href={member.url}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-[10px] border-b border-paper/40 pb-[4px] font-mono text-[0.68rem] font-medium uppercase text-paper no-underline transition-colors hover:border-acid hover:text-acid"
            >
              {t('member.fullPortfolio')}
              <span className="text-[1.05rem] transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                ↗
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-[24px] max-w-[440px] text-[0.8rem] leading-[1.5] text-paper/55">
          {t('member.projectsNote')}
        </Reveal>

        <div className="mt-[45px] grid grid-cols-3 gap-[24px] max-[700px]:mt-[40px] max-[700px]:grid-cols-1 max-[700px]:gap-[16px]">
          {profile.projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col border border-paper/15 bg-white/[0.03] p-[24px] transition-colors duration-300 hover:border-acid/60 hover:bg-white/[0.06]">
                <span className="font-mono text-[0.62rem] font-medium text-flame">0{i + 1}</span>
                <small className="mt-[26px] font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] text-acid">
                  {p.cat}
                </small>
                <h3 className="mt-[8px] text-[1.35rem] leading-[0.95] font-extrabold tracking-[-0.04em]">{p.title}</h3>
                <p className="mt-auto pt-[14px] text-[0.78rem] leading-[1.55] text-paper/60">{pick(p.desc, lang)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CERTIFICATES — paper ============ */}
      <section className="border-b border-line bg-paper px-[5vw] py-[125px] max-[700px]:px-[6vw] max-[700px]:py-[85px]">
        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em]">
          0{index + 1}.3 / {t('member.certs')}
        </Reveal>

        <div className="mt-[50px] max-w-[760px] border-b border-line">
          {profile.certs.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06}>
              <div className="group flex items-center justify-between gap-[20px] border-t border-line py-[22px] max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[8px]">
                <div className="flex items-center gap-[18px]">
                  <span className="font-mono text-[0.62rem] font-medium text-flame">0{i + 1}</span>
                  <h3 className="text-[1.05rem] font-extrabold tracking-[-0.02em] transition-colors group-hover:text-blue">
                    {c.name}
                  </h3>
                </div>
                <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-[#777]">
                  {c.issuer} · {c.year}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Nav: kembali ke tim / lanjut ke orang berikutnya */}
        <div className="mt-[90px] flex items-center justify-between max-[700px]:mt-[60px] max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-[14px]">
          <Link
            to="/team"
            className="group/link inline-flex items-center gap-[8px] font-mono text-[0.68rem] font-medium uppercase text-ink no-underline transition-colors hover:text-blue"
          >
            <span className="transition-transform duration-300 group-hover/link:-translate-x-1">←</span>
            {t('member.back')}
          </Link>
          <Link
            to={`/team/${next.slug}`}
            className="group/link inline-flex items-center gap-[8px] font-mono text-[0.68rem] font-medium uppercase text-ink no-underline transition-colors hover:text-blue"
          >
            {t('member.next')}: {next.name.split(' ')[0]}
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* ============ CTA — let's build something ============ */}
      <section className="relative overflow-hidden border-b border-line bg-blue px-[5vw] py-[110px] text-paper max-[700px]:px-[6vw] max-[700px]:py-[80px]">
        <Gear className="absolute right-[6%] top-[16%] w-[90px] max-[700px]:right-[6%] max-[700px]:top-[8%] max-[700px]:w-[56px]" />

        <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid">
          0{index + 1}.4 / Let&apos;s talk
        </Reveal>
        <Reveal
          as="h2"
          className="mt-[60px] max-w-[900px] text-[clamp(3rem,7vw,7rem)] leading-[0.85] font-extrabold tracking-[-0.1em]"
        >
          {t('member.ctaHead1')}{' '}
          <em className="font-serif font-normal italic tracking-[-0.1em] text-acid">{firstName}?</em>
        </Reveal>
        <Reveal delay={0.1} className="mt-[35px] max-w-[420px] text-[0.9rem] leading-[1.55] text-paper/75">
          {t('member.ctaSub')}
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
