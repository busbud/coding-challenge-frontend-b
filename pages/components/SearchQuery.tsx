import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'

export default function SearchQuery() {
  const t = useTranslations('Main')
  const { locale } = useRouter()
  return (
    <input
      type='text'
      placeholder={t('queryPlaceholder', { locale }) as string}
    />
  )
}
