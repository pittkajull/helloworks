import { motion, useReducedMotion } from 'motion/react'
import Reveal from './Reveal'
import MascotTyping from './MascotTyping'
import { useLang } from '../lib/i18n.js'

const PROJECTS = [
  {
    id: 'build-with-purpose',
    small: '01 — Principle',
    title: 'Build with purpose',
    words: (
      <>
        BUILD
        <br />
        WITH
        <br />
        PURPOSE
      </>
    ),
    artClass: 'h-[445px] bg-[#eb673d] max-[700px]:h-[300px]',
    deco: (
      <>
        <div className="absolute -top-[80px] -right-[100px] size-[370px] rounded-full bg-acid" />
        <div className="absolute top-[90px] right-[80px] size-[180px] rounded-full bg-blue" />
      </>
    ),
  },
  {
    id: 'think-long-term',
    small: '02 — Mindset',
    title: 'Think long term',
    words: (
      <>
        THINK
        <br />
        LONG
        <br />
        TERM
      </>
    ),
    artClass: 'h-[445px] bg-[#f0b4cc] max-[700px]:h-[300px]',
    spanClass: 'text-paper',
    deco: <div className="absolute -top-[10%] right-[25%] h-[470px] w-[280px] rotate-[33deg] bg-blue" />,
  },
  {
    id: 'build-learn-improve',
    small: '03 — Practice',
    title: 'Build. Learn. Improve.',
    words: (
      <>
        BUILD
        <br />
        LEARN
        <br />
        IMPROVE
      </>
    ),
    artClass: 'h-[390px] bg-[#151515] text-acid max-[700px]:h-[300px]',
    deco: <div className="absolute -top-[25%] right-[5%] text-[22rem] leading-none text-blue">✳</div>,
  },
]

function ProjectCard({ project }) {
  const reduce = useReducedMotion()

  return (
    <a href="#contact" className="block text-ink no-underline">
      {/* Artwork — zoom halus saat hover */}
      <motion.div
        whileHover={reduce ? undefined : { scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={`relative flex items-end overflow-hidden p-[25px] ${project.artClass}`}
      >
        <span
          className={`relative z-[1] text-[clamp(2.5rem,5vw,5.5rem)] font-extrabold leading-[0.8] tracking-[-0.1em] ${
            project.spanClass ?? ''
          }`}
        >
          {project.words}
        </span>
        {project.deco}
      </motion.div>
      <small className="mt-[17px] block font-mono text-[0.62rem] font-medium uppercase text-[#555]">
        {project.small}
      </small>
      <h3 className="mt-2 text-[1.35rem] tracking-[-0.05em]">{project.title}</h3>
    </a>
  )
}

export default function Work() {
  const { t } = useLang()

  return (
    <section
      id="values"
      className="relative border-b border-line bg-paper px-[5vw] py-[125px] max-[700px]:px-[6vw] max-[700px]:py-[85px]"
    >
      <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em]">03 / What drives us</Reveal>

      <div className="my-[70px] flex items-end justify-between max-[700px]:mt-[55px] max-[700px]:mb-[45px] max-[700px]:block">
        <Reveal
          as="h2"
          className="text-[clamp(3.5rem,7vw,7.2rem)] font-extrabold leading-[0.84] tracking-[-0.1em]"
        >
          Made to
          <br />
          <em className="font-serif font-normal tracking-[-0.1em] text-blue">last.</em>
        </Reveal>
        <Reveal
          as="a"
          delay={0.12}
          href="#contact"
          className="self-end whitespace-nowrap font-mono text-[0.7rem] font-medium uppercase text-ink no-underline transition-colors hover:text-blue max-[700px]:mt-[30px] max-[700px]:block"
        >
          {t('work.cta')} <span className="ml-[10px] text-[1.05rem]">↗</span>
        </Reveal>
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-[55px] max-[700px]:block">
        <Reveal y={40} className="max-[700px]:mb-[50px]">
          <ProjectCard project={PROJECTS[0]} />
        </Reveal>
        <Reveal y={40} delay={0.1} className="max-[700px]:mb-[50px]">
          <ProjectCard project={PROJECTS[1]} />
        </Reveal>
        <Reveal
          y={40}
          delay={0.18}
          className="col-span-full ml-[22%] max-w-[52%] max-[700px]:ml-0 max-[700px]:max-w-none max-[700px]:mb-[50px]"
        >
          <ProjectCard project={PROJECTS[2]} />
        </Reveal>
      </div>

      {/* Halo ngetik di depan laptop (product studio vibe) */}
      <MascotTyping className="absolute right-[5%] bottom-[10%] w-[180px] [@media(min-width:701px)_and_(max-width:1200px)]:hidden max-[700px]:hidden" />
    </section>
  )
}
