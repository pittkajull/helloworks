import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollManager — atur scroll setiap kali route/halaman berubah.
 * - Ada hash (mis. /#about) → scroll halus ke elemen tujuan
 * - Tidak ada hash → kembali ke paling atas halaman
 */
export default function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location])

  return null
}
