const DEFAULT_WORDS = ['We build better ways', 'Design', 'Technology', 'Automation']

function Row({ words }) {
  return (
    <div className="flex items-center">
      {words.map((word) => (
        <span key={word} className="flex items-center">
          <span className="px-6 font-mono text-[0.85rem] font-medium uppercase tracking-[0.1em] text-ink">
            {word}
          </span>
          <span className="text-blue">✳</span>
        </span>
      ))}
    </div>
  )
}

/**
 * Marquee — pita teks berjalan tanpa henti (CSS animation, GPU-friendly).
 * Dua baris identik digeser -50% supaya loop-nya seamless.
 * Props: words (array teks), tone (warna background, default acid).
 */
export default function Marquee({ words = DEFAULT_WORDS, tone = 'bg-acid' }) {
  return (
    <div aria-hidden="true" className={`overflow-hidden border-b border-line py-[14px] ${tone}`}>
      <div className="marquee-track flex w-max">
        <Row words={words} />
        <Row words={words} />
      </div>
    </div>
  )
}
