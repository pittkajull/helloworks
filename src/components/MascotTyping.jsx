import { motion, useReducedMotion } from 'motion/react'

const BLUE = '#1939d5'
const FLAME = '#ff5f36'
const ACID = '#d9f85b'
const PAPER = '#f5f1e9'
const INK = '#171717'

/**
 * MascotTyping — Halo versi "product studio": duduk ngetik di depan laptop.
 * - Mata menunduk ke layar + kedip
 * - Tangan ngetik bergantian (alternating)
 * - Kursor di layar berkedip + badan melayang halus
 * Semua animasi non-aktif saat prefers-reduced-motion.
 */
export default function MascotTyping({ className = '' }) {
  const reduce = useReducedMotion()

  const blink = reduce ? undefined : { scaleY: [1, 1, 0.08, 1] }
  const blinkT = { duration: 4.6, times: [0, 0.93, 0.96, 1], repeat: Infinity, ease: 'easeInOut' }

  return (
    // CATATAN: pemanggil WAJIB mengirim class posisi (mis. `absolute right-[5%] bottom-[10%]`)
    // Jangan tambah class `relative`/`absolute` sendiri di sini — bakal konflik sama class dari pemanggil.
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      {/* Bayangan statis */}
      <div className="absolute bottom-[-4px] left-1/2 h-3 w-[85%] -translate-x-1/2 rounded-[50%] bg-ink/15" />

      <motion.div
        className="relative"
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 220 200" className="h-full w-full">
          {/* Topi proyek */}
          <path d="M 74 58 Q 74 14 110 14 Q 146 14 146 58 Z" fill={FLAME} />
          <rect x="94" y="30" width="32" height="6" rx="3" fill={ACID} />
          <rect x="58" y="56" width="104" height="12" rx="6" fill={FLAME} />

          {/* Kepala */}
          <rect x="68" y="56" width="84" height="52" rx="22" fill={BLUE} />

          {/* Pipi */}
          <circle cx="80" cy="94" r="4.5" fill={ACID} />
          <circle cx="140" cy="94" r="4.5" fill={ACID} />

          {/* Mata menunduk + kedip */}
          <motion.g animate={blink} transition={blinkT} style={{ originX: 0.5, originY: 0.5, transformBox: 'fill-box' }}>
            <ellipse cx="92" cy="78" rx="10" ry="11" fill={PAPER} />
            <circle cx="92" cy="82" r="3.8" fill={INK} />
            <ellipse cx="128" cy="78" rx="10" ry="11" fill={PAPER} />
            <circle cx="128" cy="82" r="3.8" fill={INK} />
          </motion.g>

          {/* Mulut */}
          <path d="M 100 96 Q 110 104 120 96" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Layar laptop */}
          <rect x="52" y="96" width="116" height="58" rx="8" fill={INK} />

          {/* Kode di layar */}
          <rect x="64" y="110" width="42" height="5" rx="2" fill={ACID} />
          <rect x="64" y="122" width="64" height="5" rx="2" fill={ACID} />
          <rect x="64" y="134" width="30" height="5" rx="2" fill={ACID} />

          {/* Kursor berkedip */}
          <motion.rect
            x="98"
            y="133"
            width="5"
            height="7"
            rx="1"
            fill={FLAME}
            animate={reduce ? undefined : { opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Basis laptop */}
          <rect x="44" y="154" width="132" height="9" rx="4" fill={INK} />
          <rect x="60" y="156" width="100" height="3" rx="1.5" fill={ACID} opacity="0.7" />

          {/* Tangan ngetik (bergantian) */}
          <motion.circle
            cx="92"
            cy="151"
            r="6"
            fill={ACID}
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 0.32, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="128"
            cy="151"
            r="6"
            fill={ACID}
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 0.32, delay: 0.16, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </div>
  )
}
