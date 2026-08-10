import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Mascot from './Mascot'

const STORAGE_KEY = 'hw-preloader-seen'

/**
 * Preloader "Never stop building" — muncul sekali per sesi.
 * Urutan: maskot pop-in (sudah otomatis melambai & kedip) → logo wordmark
 * fade-in di bawahnya → progress bar acid mengisi → seluruh overlay
 * slide ke atas memberi jalan ke halaman.
 * Di-skip untuk prefers-reduced-motion & sesi berikutnya (sessionStorage).
 */
export default function Preloader() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    // Guard StrictMode double-invoke: cukup sekali dijalankan
    if (started.current) return
    started.current = true

    if (reduce) return
    // Flag 'sudah dilihat' cuma dipersistenin di production — di dev selalu
    // replay biar gampang diiterasi pas ngembangin animasinya.
    if (import.meta.env.PROD && sessionStorage.getItem(STORAGE_KEY)) return
    if (import.meta.env.PROD) sessionStorage.setItem(STORAGE_KEY, '1')

    document.body.style.overflow = 'hidden'
    setShow(true)

    // Total choreography ±2.6s, lalu slide up 0.8s (scroll di-unlock di onExitComplete)
    setTimeout(() => setShow(false), 2600)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  return (
    <AnimatePresence onExitComplete={() => (document.body.style.overflow = '')}>
      {show && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="HelloWorks is loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
        >
          {/* 1. Maskot dulu — pop-in + animasi bawaan (melambai, kedip, melayang) */}
          <motion.div
            initial={{ scale: reduce ? 1 : 0.5, opacity: 0, y: reduce ? 0 : 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 210, damping: 15 }}
          >
            <Mascot speech="Never stop building" className="relative w-[190px] max-[700px]:w-[150px]" />
          </motion.div>

          {/* 2. Logo wordmark muncul setelah maskot */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.55, ease: 'easeOut' }}
            className="mt-[46px] max-[700px]:mt-[36px]"
          >
            <img
              src="/images/logo putih no background.png"
              alt="HelloWorks"
              className="h-[30px] w-auto max-[700px]:h-[24px]"
            />
          </motion.div>

          {/* 3. Progress bar mono */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="mt-[24px] w-[190px] max-[700px]:w-[160px]"
          >
            <div className="flex items-center justify-between font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] text-paper/50">
              <span>building</span>
              <span>helloworks.id</span>
            </div>
            <div className="mt-[9px] h-[3px] w-full overflow-hidden rounded-full bg-paper/15">
              <motion.div
                className="h-full rounded-full bg-acid"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 1.3, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
