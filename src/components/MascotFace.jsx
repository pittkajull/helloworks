import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'

const BLUE = '#1939d5'
const FLAME = '#ff5f36'
const ACID = '#d9f85b'
const PAPER = '#f5f1e9'
const INK = '#171717'

/**
 * MascotFace — cuma KEPALA maskot "Halo": topi proyek + kepala biru +
 * nyengir lebar + pipi acid. Dipakai sebagai avatar di chat (tanpa badan,
 * tanpa lingkaran, tanpa asterisk — biar kecil tapi tetap kebaca & ramah).
 * Mata ikutin kursor (eye-track) + kedip pelan — sama kayak Mascot penuh.
 */
export default function MascotFace({ className = '' }) {
  const reduce = useReducedMotion()

  // Eye-tracking: posisi kursor (0..1) → offset pupil (px, kecil karena matanya kecil)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const pupilX = useSpring(useTransform(mx, [0, 1], [-2.5, 2.5]), { stiffness: 260, damping: 22 })
  const pupilY = useSpring(useTransform(my, [0, 1], [-2.5, 2.5]), { stiffness: 260, damping: 22 })

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
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <motion.div
        className="relative"
        animate={reduce ? undefined : { y: [0, -2.5, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 80 80" className="h-full w-full">
          {/* Topi proyek */}
          <path d="M 22 30 Q 22 5 40 5 Q 58 5 58 30 Z" fill={FLAME} />
          <rect x="33" y="13" width="14" height="5" rx="2.5" fill={ACID} />
          <rect x="14" y="27" width="52" height="8" rx="4" fill={FLAME} />

          {/* Kepala */}
          <rect x="16" y="24" width="48" height="48" rx="22" fill={BLUE} />

          {/* Pipi */}
          <circle cx="25" cy="52" r="4" fill={ACID} />
          <circle cx="55" cy="52" r="4" fill={ACID} />

          {/* Mata — follow kursor + kedip pelan */}
          <motion.g style={{ x: pupilX, y: pupilY }}>
            <motion.g
              animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1] }}
              transition={{ duration: 4.4, times: [0, 0.93, 0.96, 1], repeat: Infinity, ease: 'easeInOut' }}
              style={{ originX: 0.5, originY: 0.5, transformBox: 'fill-box' }}
            >
              <ellipse cx="32" cy="44" rx="5.5" ry="6.5" fill={PAPER} />
              <circle cx="32" cy="45" r="2.6" fill={INK} />
              <ellipse cx="48" cy="44" rx="5.5" ry="6.5" fill={PAPER} />
              <circle cx="48" cy="45" r="2.6" fill={INK} />
            </motion.g>
          </motion.g>

          {/* Nyengir lebar */}
          <path d="M 27 52 Q 40 70 53 52 Z" fill={INK} />
          <path d="M 33 54 Q 40 62 47 54 Z" fill={ACID} />
        </svg>
      </motion.div>
    </div>
  )
}
