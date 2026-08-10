import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { useLang } from '../lib/i18n.js'
import Mascot from './Mascot'

const STORAGE_KEY = 'helloworks-helper-dismissed'

/**
 * Floating helper — maskot Halo ngambang di pojok kanan bawah.
 * Muncul otomatis ~3 detik setelah masuk, bisa diklik buat buka bubble
 * ajakan "Punya ide? Ngobrol yuk" + tombol ke /#contact.
 * User bisa dismiss (X) → gak muncul lagi sesi ini.
 */
export default function MascotHelper() {
  const reduce = useReducedMotion()
  const { t } = useLang()
  const [shown, setShown] = useState(false)
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      return window.sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  // Muncul otomatis setelah 3 detik (kecuali sudah di-dismiss atau reduce-motion)
  useEffect(() => {
    if (dismissed) return
    const id = setTimeout(() => setShown(true), reduce ? 0 : 3000)
    return () => clearTimeout(id)
  }, [dismissed, reduce])

  // Dismiss: simpan flag dulu, lalu biarkan AnimatePresence mainin exit-nya
  const dismiss = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* privacy mode dsb — abaikan, cukup sembunyikan untuk sesi ini */
    }
    setDismissed(true)
  }

  // Render selalu (biar exit animation kebaca); unmount total setelah dismiss selesai
  if (dismissed && !shown) return null

  return (
    <div className="fixed right-[24px] bottom-[24px] z-[70] max-[700px]:right-[16px] max-[700px]:bottom-[16px]">
      <AnimatePresence onExitComplete={() => setShown(false)}>
        {shown && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 30, scale: reduce ? 1 : 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 30, scale: reduce ? 1 : 0.85 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="relative flex flex-col items-end"
          >
            {/* Tombol dismiss (X) kecil — disembunyikan pas bubble kebuka biar gak nabrak */}
            {!open && (
              <button
                type="button"
                onClick={dismiss}
                aria-label="Tutup maskot"
                className="absolute -top-2 -right-2 z-[2] grid size-6 cursor-pointer place-items-center rounded-full border border-ink bg-paper text-[0.7rem] leading-none text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                ✕
              </button>
            )}

            {/* Bubble ajakan — muncul pas maskot diklik */}
            <AnimatePresence>
              {open && (
                <motion.div
                  key="bubble"
                  initial={{ opacity: 0, y: reduce ? 0 : 12, scale: reduce ? 1 : 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: reduce ? 0 : 12, scale: reduce ? 1 : 0.9 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="relative mb-[12px] w-[250px] border border-ink bg-paper p-[18px] shadow-[0_14px_30px_rgba(23,23,23,0.2)] max-[700px]:w-[220px]"
                >
                  <span className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.1em] text-blue">
                    {t('helper.title')}
                  </span>
                  <p className="mt-[8px] text-[0.85rem] font-semibold leading-[1.45] text-ink">{t('helper.text')}</p>
                  <Link
                    to="/#contact"
                    onClick={() => setOpen(false)}
                    className="group mt-[14px] flex items-center justify-between border-t border-line pt-[12px] font-mono text-[0.66rem] font-medium uppercase text-ink no-underline transition-colors hover:text-blue"
                  >
                    {t('helper.cta')}
                    <span className="text-[1rem] text-blue transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                      ↗
                    </span>
                  </Link>
                  {/* Ekor bubble */}
                  <span className="absolute -bottom-[7px] right-[26px] size-3 rotate-45 border-r border-b border-ink bg-paper" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Maskot — klik buka/tutup bubble */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Buka pesan HelloWorks"
              className="cursor-pointer border-0 bg-transparent p-0"
            >
              <Mascot speech="" className="relative w-[96px] max-[700px]:w-[80px]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
