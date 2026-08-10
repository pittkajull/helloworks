import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'

const BLUE = '#1939d5'
const FLAME = '#ff5f36'
const ACID = '#d9f85b'
const PAPER = '#f5f1e9'
const INK = '#171717'

/**
 * Mascot HelloWorks — "Halo", builder bertopi proyek.
 * - Mata mengikuti kursor di seluruh halaman
 * - Kedip otomatis + tangan melambai + badan melayang
 * - Asterisk ✳ berputar di atas topi + speech bubble
 * Semua animasi non-aktif saat prefers-reduced-motion.
 */
export default function Mascot({ className = '', speech = "Let's build!" }) {
  const reduce = useReducedMotion()

  // Eye-tracking: posisi kursor (0..1) → offset pupil (px)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const pupilX = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 260, damping: 22 })
  const pupilY = useSpring(useTransform(my, [0, 1], [-5, 5]), { stiffness: 260, damping: 22 })

  useEffect(() => {
    if (reduce) return
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduce, mx, my])

  return (
    // CATATAN: pemanggil WAJIB mengirim class posisi (mis. `absolute right-[4%] bottom-[15%]`)
    // Jangan tambah class `relative`/`absolute` sendiri di sini — bakal konflik sama class dari pemanggil
    // (Tailwind mengurutkan .relative setelah .absolute, jadi relative selalu menang & maskot masuk flow normal).
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      {/* Bayangan statis — tetap di tanah saat karakter melayang */}
      <div className="absolute bottom-[-6px] left-1/2 h-3 w-[80%] -translate-x-1/2 rounded-[50%] bg-ink/15" />

      <motion.div
        className="relative"
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Speech bubble — muncul cuma kalau ada teksnya (helper bisa matiin) */}
        {speech && (
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0, rotate: reduce ? 0 : -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 1 }}
            className="absolute -top-11 right-14 whitespace-nowrap rounded-xl border border-ink bg-paper px-4 py-2 font-mono text-[0.72rem] font-medium uppercase tracking-wide text-ink max-[700px]:px-2.5 max-[700px]:py-1.5 max-[700px]:text-[0.6rem]"
          >
            {speech} <span className="text-flame">✳</span>
            <span className="absolute -bottom-[7px] right-7 size-3 rotate-45 border-r border-b border-ink bg-paper" />
          </motion.div>
        )}

        {/* Asterisk berputar */}
        <motion.span
          className="absolute -top-8 right-0 text-4xl leading-none text-ink"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        >
          ✳
        </motion.span>

        <svg viewBox="0 0 220 220" className="h-full w-full">

        {/* Kaki */}
        <rect x="80" y="192" width="30" height="14" rx="7" fill={INK} />
        <rect x="112" y="192" width="30" height="14" rx="7" fill={INK} />

        {/* Lengan kiri (statis) */}
        <rect x="40" y="148" width="20" height="46" rx="10" fill={FLAME} />
        <circle cx="50" cy="194" r="9" fill={FLAME} />

        {/* Badan */}
        <rect x="62" y="94" width="96" height="96" rx="30" fill={BLUE} />

        {/* Pipi */}
        <circle cx="82" cy="146" r="5" fill={ACID} />
        <circle cx="138" cy="146" r="5" fill={ACID} />

        {/* Mata — putihnya DIAM, cuma bola hitam yang lirik kursor. Kedip squash
            grup luar (putih + bola) biar nutup rapi; x/y bola komposisi sama scaleY. */}
        <motion.g
          animate={reduce ? undefined : { scaleY: [1, 1, 0.08, 1] }}
          transition={{ duration: 4.2, times: [0, 0.93, 0.96, 1], repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: 0.5, originY: 0.5, transformBox: 'fill-box' }}
        >
          <ellipse cx="98" cy="128" rx="11" ry="12" fill={PAPER} />
          <ellipse cx="122" cy="128" rx="11" ry="12" fill={PAPER} />
          <motion.g style={{ x: pupilX, y: pupilY }}>
            <circle cx="98" cy="128" r="4.5" fill={INK} />
            <circle cx="122" cy="128" r="4.5" fill={INK} />
          </motion.g>
        </motion.g>

        {/* Mulut */}
        <path d="M 97 152 Q 110 162 123 152" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />

        {/* Lengan kanan — melambai */}
        <motion.g
          animate={reduce ? undefined : { rotate: [-14, 26, -14] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: 0.3, originY: 0.95, transformBox: 'fill-box' }}
        >
          <rect x="162" y="112" width="20" height="48" rx="10" fill={FLAME} />
          <circle cx="172" cy="160" r="9" fill={FLAME} />
        </motion.g>

        {/* Topi proyek */}
        <path d="M 64 96 Q 64 38 110 38 Q 156 38 156 96 Z" fill={FLAME} />
        <rect x="78" y="60" width="64" height="10" rx="5" fill={ACID} />
        <rect x="46" y="92" width="128" height="14" rx="7" fill={FLAME} />
        </svg>
      </motion.div>
    </div>
  )
}
