import { motion, useReducedMotion } from 'motion/react'

const ACID = '#d9f85b'
const BLUE = '#1939d5'

const TEETH = [0, 45, 90, 135, 180, 225, 270, 315]

/**
 * Gear — roda gigi berputar pelan (dekorasi).
 * Warna acid di atas background biru, lubang tengah biru (kesan hollow).
 */
export default function Gear({ className = '' }) {
  const reduce = useReducedMotion()

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={`pointer-events-none ${className}`}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      style={{ originX: 0.5, originY: 0.5, transformBox: 'fill-box' }}
    >
      {TEETH.map((angle) => (
        <rect key={angle} x="46" y="6" width="8" height="16" rx="3" fill={ACID} transform={`rotate(${angle} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="30" fill={ACID} />
      <circle cx="50" cy="50" r="12" fill={BLUE} />
    </motion.svg>
  )
}
