import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/motion'

/**
 * Reveal — wrapper scroll-reveal reusable.
 * Muncul (fade + slide up) saat elemen masuk viewport, cukup sekali.
 * Otomatis non-aktif kalau user prefers-reduced-motion.
 *
 * Contoh:
 *   <Reveal delay={0.1} as="article" className="...">...</Reveal>
 */
export default function Reveal({ as = 'div', children, delay = 0, y = 28, className = '', ...rest }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px 0px -60px 0px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
