import { useEffect, useState } from 'react'
import { LanguageContext, getInitialLang, STORAGE_KEY, translations } from './i18n.js'

/**
 * LanguageProvider — nyimpen pilihan bahasa (default 'id'),
 * persist ke localStorage, dan update <html lang>.
 */
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const setLang = (next) => setLangState(next === 'en' ? 'en' : 'id')
  const t = (key) => translations[lang][key] ?? translations.id[key] ?? key

  const value = { lang, setLang, t }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/** Render teks multi-baris ('\n' jadi <br/>) */
export function Lines({ text }) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 ? <br /> : null}
    </span>
  ))
}
