/**
 * Suara UI kecil tanpa file audio — dibangkitkan via Web Audio API.
 * Gak nambah beban, gak butuh aset, dan aman autoplay (dipanggil dari klik user).
 */

let ctx = null

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  return ctx
}

/** Klik lembut (pop) — dipakai pas tombol chat diklik. */
export function playPop() {
  const ac = getCtx()
  if (!ac) return
  if (ac.state === 'suspended') ac.resume().catch(() => {})
  const t = ac.currentTime
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(720, t)
  osc.frequency.exponentialRampToValueAtTime(320, t + 0.09)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.3, t + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start(t)
  osc.stop(t + 0.15)
}
