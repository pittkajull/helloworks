import { Fragment, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useLang } from '../lib/i18n.js'
import { streamChat } from '../lib/chat.js'
import MascotTyping from './MascotTyping'
import MascotFace from './MascotFace'

const WA_URL = 'https://wa.me/6287761104114' // +62 877-6110-4114

/* Render teks balasan AI: bold **x**, italic *x*, inline code `x`, bullet "- x" */
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).filter(Boolean)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**') && p.length > 4) {
      return (
        <strong key={i} className="font-extrabold">
          {p.slice(2, -2)}
        </strong>
      )
    }
    if (p.startsWith('`') && p.endsWith('`') && p.length > 2) {
      return (
        <code key={i} className="rounded-[5px] bg-ink/10 px-[5px] py-[1px] font-mono text-[0.78em]">
          {p.slice(1, -1)}
        </code>
      )
    }
    if (p.startsWith('*') && p.endsWith('*') && p.length > 2) {
      return <em key={i}>{p.slice(1, -1)}</em>
    }
    return p
  })
}

function renderMessage(content) {
  return content.split('\n').map((line, i) => {
    const bullet = line.match(/^\s*[-•]\s+(.*)$/)
    return (
      <Fragment key={i}>
        {i > 0 && <br />}
        {bullet ? (
          <span className="flex gap-[8px]">
            <span aria-hidden="true" className="shrink-0 font-bold text-acid">
              ✦
            </span>
            <span>{renderInline(bullet[1])}</span>
          </span>
        ) : (
          <span>{renderInline(line)}</span>
        )}
      </Fragment>
    )
  })
}

/**
 * Chatbot HelloWorks — maskot "Halo" di pojok kanan bawah.
 * Klik maskot buka panel chat yang ngobrol sama AI lewat proxy server
 * (/api/chat) — API key aman di server, gak pernah di frontend.
 */
export default function ChatWidget() {
  const reduce = useReducedMotion()
  const { t, lang } = useLang()
  const [shown, setShown] = useState(false)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null) // 'no-key' | 'rate-limit' | 'generic'
  const [status, setStatus] = useState('online') // 'online' | 'maintenance'
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  // Muncul otomatis ~2.5 detik setelah masuk (bukan full-screen, cuma maskot + pill)
  useEffect(() => {
    const id = setTimeout(() => setShown(true), reduce ? 0 : 2500)
    return () => clearTimeout(id)
  }, [reduce])

  // Pas pertama buka: kasih salam pembuka (ikut bahasa aktif)
  useEffect(() => {
    if (open && messages.length === 0) {
      // Salam pembuka + flag showSuggest: chip tanya cepat dirender DI DALAM bubble ini
      setMessages([{ role: 'assistant', content: t('chat.greeting'), showSuggest: true }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lang])

  // Cek kesehatan server chat pas panel kebuka — status Online/Maintenance yang akurat
  useEffect(() => {
    if (!open) return
    let cancelled = false
    fetch('/api/health')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setStatus(d?.ok && d?.hasKey ? 'online' : 'maintenance')
      })
      .catch(() => {
        if (!cancelled) setStatus('maintenance')
      })
    return () => {
      cancelled = true
    }
  }, [open])

  // Auto-scroll ke pesan terbaru + fokus input pas panel kebuka
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [messages, loading, error, reduce])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const send = async (text) => {
    const content = (text ?? input).trim()
    if (!content || loading) return
    // Kirim ke server cuma role+content (buang flag internal kayak showSuggest)
    const history = [...messages.map(({ role, content }) => ({ role, content })), { role: 'user', content }]
    // Placeholder bubble kosong — bakal keisi per-chunk pas jawaban ngetik masuk
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setError(null)
    setLoading(true)
    try {
      await streamChat(history, lang, (chunk) => {
        setMessages((m) => {
          if (!m.length) return m
          const copy = [...m]
          const last = copy[copy.length - 1]
          copy[copy.length - 1] = { ...last, content: last.content + chunk }
          return copy
        })
      })
      setStatus('online') // berhasil — normal lagi
    } catch (e) {
      // Belum keisi sama sekali → buang bubble kosong; udah keisi parsial → biarin
      setMessages((m) => {
        const last = m[m.length - 1]
        if (last && last.role === 'assistant' && !last.content) return m.slice(0, -1)
        return m
      })
      setError(e.message === 'no-key' ? 'no-key' : e.message === 'rate-limit' ? 'rate-limit' : 'generic')
      setStatus('maintenance')
    } finally {
      setLoading(false)
    }
  }

  // Typing dots cuma muncul kalau masih nunggu delta pertama (bubble masih kosong)
  const lastMsg = messages[messages.length - 1]
  const showTyping = loading && (!lastMsg || (lastMsg.role === 'assistant' && lastMsg.content === ''))

  const errText =
    error === 'no-key' ? t('chat.errorNoKey') : error === 'rate-limit' ? t('chat.rateLimit') : t('chat.error')
  const suggestions = [t('chat.suggest1'), t('chat.suggest2'), t('chat.suggest3'), t('chat.suggest4')]

  // Belum muncul: jangan render apa-apa (maskot baru muncul setelah delay di atas)
  if (!shown) return null

  return (
    <div className="fixed right-[24px] bottom-[24px] z-[70] max-[700px]:right-[14px] max-[700px]:bottom-[14px]">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 30, scale: reduce ? 1 : 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 20 }}
        className="relative flex flex-col items-end"
      >
        {/* ===== Panel chat ===== */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-label={`${t('chat.botName')} — ${t('chat.subtitle')}`}
              className="flex h-[500px] max-h-[calc(100dvh-140px)] w-[372px] flex-col overflow-hidden rounded-[24px] border-2 border-ink bg-paper shadow-[0_30px_80px_rgba(23,23,23,0.35)] max-[700px]:h-[min(500px,calc(100dvh-120px))] max-[700px]:w-[min(372px,calc(100vw-24px))]"
            >
              {/* Aksen acid + garis ink atas */}
              <div className="relative h-[6px] shrink-0 bg-acid">
                <span className="absolute inset-x-0 bottom-0 h-px bg-ink/20" />
              </div>

              {/* Header */}
              <div className="flex shrink-0 items-center gap-[13px] bg-ink px-[16px] py-[12px] text-paper">
                <div className="relative w-[52px] shrink-0">
                  <MascotTyping className="w-[52px]" />
                  <span className="absolute -right-[1px] -bottom-[1px] size-[11px] rounded-full border-2 border-ink bg-acid" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline gap-[9px]">
                    <span className="font-mono text-[1rem] font-extrabold uppercase tracking-[-0.02em]">
                      {t('chat.botName')}
                    </span>
                    <span className="rounded-full bg-acid px-[7px] py-[2px] font-mono text-[0.5rem] font-bold uppercase tracking-[0.14em] text-ink">
                      {t('chat.subtitle')}
                    </span>
                  </p>
                  <p className="mt-[4px] flex items-center gap-[6px] font-mono text-[0.6rem] text-paper/60">
                    <span
                      className={`size-[7px] rounded-full transition-colors duration-300 ${
                        status === 'online'
                          ? 'bg-acid shadow-[0_0_0_4px_rgba(217,248,91,0.2)]'
                          : 'bg-flame shadow-[0_0_0_4px_rgba(255,95,54,0.25)]'
                      }`}
                    />
                    {status === 'online' ? t('chat.online') : t('chat.maintenance')}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Tutup chat"
                  onClick={() => setOpen(false)}
                  className="grid size-[32px] shrink-0 cursor-pointer place-items-center rounded-full border border-paper/25 text-[0.85rem] leading-none transition-colors hover:border-acid hover:bg-acid hover:text-ink"
                >
                  ✕
                </button>
              </div>

              {/* Pesan — di-anchor ke bawah (mt-auto), jadi gak "nggantung" di atas */}
              <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-[14px] py-[16px]">
                <div className="mt-auto flex flex-col gap-[12px]">
                  {messages.map((m, i) => {
                    // Bubble placeholder yang lagi keisi stream — jangan render kosong
                    const isStreamingEmpty =
                      loading && i === messages.length - 1 && m.role === 'assistant' && m.content === ''
                    if (isStreamingEmpty) return null
                    return                    m.role === 'user' ? (
                      <div key={i} className="flex justify-end">
                        <div className="max-w-[85%] rounded-[20px] bg-ink px-[14px] py-[10px] text-[0.84rem] leading-[1.55] text-paper shadow-[0_2px_8px_rgba(23,23,23,0.18)]">
                          {renderMessage(m.content)}
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="flex items-end gap-[9px]">
                        <MascotFace className="w-[34px] shrink-0" />
                        <div className="max-w-[85%] rounded-[20px] border border-ink/10 bg-[#fffdfa] px-[14px] py-[10px] text-[0.84rem] leading-[1.55] text-ink shadow-[0_2px_8px_rgba(23,23,23,0.06)]">
                          {renderMessage(m.content)}
                          {/* Chip tanya cepat — dirender di dalam bubble salam pembuka */}
                          {m.showSuggest && (
                            <>
                              <p className="mt-[10px] border-t border-dashed border-ink/15 pt-[9px] font-mono text-[0.6rem] font-medium italic tracking-wide text-ink/50">
                                {t('chat.greetingHint')}
                              </p>
                              <div className="mt-[8px] flex flex-wrap gap-[6px]">
                                {suggestions.map((s) => (
                                  <button
                                    key={s}
                                    type="button"
                                    onClick={() => send(s)}
                                    className="cursor-pointer rounded-full border border-ink/20 bg-paper px-[10px] py-[5px] font-mono text-[0.6rem] font-medium text-ink/75 transition-colors hover:border-ink hover:bg-acid hover:text-ink"
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}

                  {/* Typing indicator — cuma pas nunggu delta pertama */}
                  {showTyping && (
                    <div className="flex items-end gap-[9px]">
                      <MascotFace className="w-[34px] shrink-0" />
                      <div
                        aria-label={t('chat.thinking')}
                        className="flex items-center gap-[6px] rounded-[20px] border border-ink/10 bg-[#fffdfa] px-[16px] py-[13px] shadow-[0_2px_8px_rgba(23,23,23,0.06)]"
                      >
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="size-[7px] rounded-full bg-blue"
                            animate={reduce ? undefined : { y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
                            transition={{ duration: 0.7, repeat: Infinity, delay: d * 0.15, ease: 'easeInOut' }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {error && !loading && (
                    <div className="flex items-end gap-[9px]">
                      <MascotFace className="w-[34px] shrink-0" />
                      <div className="max-w-[85%] rounded-[20px] border border-flame/40 bg-flame/10 px-[13px] py-[9px] text-[0.8rem] leading-[1.5] text-ink">
                        {errText}
                        <a
                          href={WA_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-[7px] block font-mono text-[0.62rem] font-bold uppercase tracking-wide text-blue underline underline-offset-2 hover:text-ink"
                        >
                          {t('chat.wa')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer: input + disclaimer */}
              <div className="shrink-0 border-t border-ink/10 bg-[#efe9dc] px-[14px] pt-[12px] pb-[13px]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    send()
                  }}
                  className="flex items-center gap-[8px] rounded-full border-2 border-ink/15 bg-[#fffdfa] py-[5px] pr-[5px] pl-[16px] transition-colors focus-within:border-ink"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('chat.placeholder')}
                    aria-label={t('chat.placeholder')}
                    className="min-w-0 flex-1 bg-transparent text-[0.85rem] text-ink outline-none placeholder:text-ink/35"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    aria-label={t('chat.send')}
                    className="grid size-[34px] shrink-0 cursor-pointer place-items-center rounded-full bg-acid text-[1rem] text-ink transition-colors hover:bg-blue hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ↗
                  </button>
                </form>
                <p className="mt-[10px] text-center font-mono text-[0.55rem] tracking-wide text-ink/45">
                  {t('chat.disclaimer')} ·{' '}
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-acid decoration-2 underline-offset-2 transition-colors hover:text-blue"
                  >
                    {t('chat.wa')}
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== Tombol maskot — disembunyiin pas panel kebuka biar gak dobel & rame ===== */}
        <AnimatePresence>
          {!open && (
            <motion.button
              key="chat-fab"
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={false}
              aria-label="Buka chat HelloWorks"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              whileHover={reduce ? undefined : { scale: 1.05 }}
              whileTap={reduce ? undefined : { scale: 0.94 }}
              className="relative cursor-pointer border-0 bg-transparent p-0"
            >
              <motion.span
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.6, duration: 0.3 }}
                className="absolute -top-[8px] right-[16px] rounded-full border border-ink bg-acid px-[11px] py-[4px] font-mono text-[0.62rem] font-bold uppercase text-ink shadow-[0_4px_10px_rgba(23,23,23,0.18)]"
              >
                {t('chat.hi')}
              </motion.span>
              <MascotFace className="w-[64px] drop-shadow-[0_12px_20px_rgba(23,23,23,0.28)] max-[700px]:w-[56px]" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
