import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import Gear from './Gear'
import { useLang } from '../lib/i18n.js'
import { SERVICES } from '../lib/services'

/**
 * Section 3 — services (id="services").
 * Setiap baris layanan bisa diklik → halaman khusus /services/:slug
 * (detail scope & karya pilihan). Data ada di src/lib/services.js.
 */
export default function Services() {
  const { t } = useLang()
  return (
    <section
      id="services"
      className="relative border-b border-line bg-blue px-[5vw] py-[125px] text-paper max-[700px]:px-[6vw] max-[700px]:py-[85px]"
    >
      {/* Gear berputar — dekorasi */}
      <Gear className="absolute right-[8%] top-[13%] w-[90px] max-[700px]:w-[56px] max-[700px]:right-[6%] max-[700px]:top-[7%]" />
      <Reveal className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.04em] text-acid">
        02 / What we do
      </Reveal>

      <div className="mt-[70px] mb-[85px] flex items-end justify-between max-[700px]:mt-[55px] max-[700px]:mb-[55px] max-[700px]:block">
        <Reveal
          as="h2"
          className="text-[clamp(3.5rem,7vw,7.2rem)] font-extrabold leading-[0.84] tracking-[-0.1em]"
        >
          Built to
          <br />
          <em className="font-serif font-normal tracking-[-0.1em] text-acid">grow.</em>
        </Reveal>
        <Reveal as="p" delay={0.12} className="max-w-[240px] text-[0.9rem] leading-[1.5] max-[700px]:mt-[35px]">
          {t('services.sub')}
        </Reveal>
      </div>

      <div className="border-t border-[rgba(245,241,233,.4)]">
        {SERVICES.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.07}>
            <Link
              to={`/services/${service.slug}`}
              aria-label={service.title}
              className="group grid grid-cols-[1fr_2fr_1.4fr_40px] items-center border-b border-[rgba(245,241,233,.4)] py-[25px] text-paper no-underline transition-[padding-left,color] duration-300 hover:pl-[15px] hover:text-acid max-[700px]:grid-cols-[32px_1fr_25px] max-[700px]:gap-[10px] max-[700px]:py-[22px]"
            >
              <span className="font-mono text-[0.65rem] font-medium">{service.num}</span>
              <h3 className="text-[1.55rem] tracking-[-0.06em] max-[700px]:text-[1.15rem]">{service.title}</h3>
              <p className="max-w-[240px] text-[0.76rem] leading-[1.45] text-[rgba(245,241,233,.7)] max-[700px]:hidden">
                {t(service.descKey)}
              </p>
              <b className="text-[1.5rem] font-normal transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</b>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
