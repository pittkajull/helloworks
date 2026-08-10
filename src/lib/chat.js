/**
 * Client chatbot — ngobrol sama proxy server (/api/chat).
 * API key gak pernah ada di frontend; semua logika & "training" ada di server.
 */

/**
 * Kirim riwayat pesan ke proxy, dapet balasan asisten.
 * @param {{ role: 'user'|'assistant', content: string }[]} messages
 * @param {'id'|'en'} lang
 * @returns {Promise<string>} balasan AI
 */
export async function sendChat(messages, lang) {
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

  let data = {}
  try {
    data = await res.json()
  } catch {
    /* body bukan JSON — biarkan data kosong */
  }

  if (!res.ok) {
    throw new Error(data?.error?.code || `http-${res.status}`)
  }
  const reply = data?.reply
  if (typeof reply !== 'string' || !reply.trim()) {
    throw new Error('empty')
  }
  return reply.trim()
}
