import Link from 'next/link'
import { useRouter } from 'next/router'

import { Locale } from '../../types'

export default function Header() {
  const router = useRouter()
  const locale: Locale = router.locale as Locale

  return (
    <header className="app-header">
      <h1 className="logo">Bus To Fest</h1>

      <div className="locale-links">
        { locale !== 'en' && <Link href="/" locale="en">EN</Link>}
        { locale !== 'fr' && <Link href="/" locale="fr">FR</Link>}
      </div>
    </header>
  )
}