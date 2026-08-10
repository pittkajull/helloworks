/**
 * Client chatbot — ngobrol sama proxy server (/api/chat).
 * API key gak pernah ada di frontend; semua logika & "training" ada di server.
 *
 * Server balikin jawaban AI sebagai STREAM teks polos — client baca per-chunk
 * dan nampilin efek ngetik, biar user gak nunggu diam-diam.
 */

/**
 * Kirim riwayat pesan ke proxy & stream jawabannya.
 * @param {{ role: 'user'|'assistant', content: string }[]} messages
 * @param {'id'|'en'} lang
 * @param {(chunk: string) => void} [onDelta] dipanggil tiap ada potongan teks baru
 * @returns {Promise<string>} full jawaban (setelah stream kelar)
 */
export async function streamChat(messages, lang, onDelta) {
  let res
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, lang }),
    })
  } catch {
    throw new Error('network')
  }

  if (!res.ok) {
    let data = {}
    try {
      data = await res.json()
    } catch {
      /* body bukan JSON — biarkan data kosong */
    }
    throw new Error(data?.error?.code || `http-${res.status}`)
  }

  if (!res.body) throw new Error('empty')

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let full = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    const text = decoder.decode(value, { stream: true })
    if (text) {
      full += text
      onDelta?.(text)
    }
  }
  full += decoder.decode() // flush sisa byte

  if (!full.trim()) throw new Error('empty')
  return full
}
