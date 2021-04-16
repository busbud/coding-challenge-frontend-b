import { NextRouter, useRouter } from 'next/router'

import { translate } from '../../utils/translationHelper'
import { Locale } from '../../types'

export default function Banner() {
  const router = useRouter()
  const locale: Locale = router.locale as Locale

  return (
    <div className="banner-container">
      <img
        src="/images/banner.jpeg"
        alt="bus to music festival"
      />
      <h2 className="welcome">
        {translate('welcome', locale)}
      </h2>
    </div>
  )
}
