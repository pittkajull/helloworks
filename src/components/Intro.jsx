import Reveal from './Reveal'
import { useLang } from '../lib/i18n.js'

export default function Intro() {
  const { t } = useLang()
  return (
    <section
      id="about"
      className="grid grid-cols-[1fr_2fr_1fr] gap-10 border-b border-line bg-paper px-[5vw] py-[125px] max-[700px]:block max-[700px]:px-[6vw] max-[700px]:py-[85px]"
    >
      <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em]">01 / Who we are</Reveal>

      <div className="grid grid-cols-[1.2fr_1fr] gap-[50px] max-[700px]:mt-[60px] max-[700px]:block">
        <Reveal
          as="h2"
          className="text-[clamp(3.5rem,7vw,7.2rem)] font-extrabold leading-[0.84] tracking-[-0.1em]"
        >
          Never stop
          <br />
          <span className="text-blue">building.</span>
        </Reveal>
        <Reveal as="p" delay={0.1} className="max-w-[340px] self-end text-base leading-[1.6] max-[700px]:mt-[45px]">
          {t('intro.story')}
        </Reveal>
        <Reveal
          as="a"
          delay={0.18}
          href="#contact"
          className="self-end whitespace-nowrap font-mono text-[0.7rem] font-medium uppercase text-ink no-underline transition-colors hover:text-blue max-[700px]:mt-[35px] max-[700px]:inline-block"
        >
          {t('intro.link')} <span className="ml-[10px] text-[1.05rem]">↗</span>
        </Reveal>
      </div>

      <Reveal
        delay={0.15}
        className="self-end justify-self-end text-right font-mono text-[0.65rem] font-medium uppercase max-[700px]:mt-[55px]"
      >
        Small team
        <br />
        <strong className="font-sans text-[4rem] font-extrabold tracking-[-0.12em]">big</strong> vision
      </Reveal>
    </section>
  )
}
