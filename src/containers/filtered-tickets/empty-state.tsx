// Packages
import React from 'react'
import { useTranslation } from 'react-i18next'

// Components
import Chip from 'components/chip'

// Styles
import * as S from './styles'

function EmptyState({ isLoading }) {
  const { t } = useTranslation()
  return (
    <>
      {!isLoading && (
        <S.ContentEmptyState>
          <S.Title>{t('title')}</S.Title>
          <S.EmptyState>
            <Chip title={t('why_busbud')} subTitle={t('why_busbud_subtitle')} />
            <Chip
              title={t('trip_priorities')}
              subTitle={t('trip_priorities_subtitle')}
            />
            <Chip
              title={t('global_coverage')}
              subTitle={t('global_coverage_subtitle')}
            />
            <Chip
              title={t('24h_support')}
              subTitle={t('24h_support_subtitle')}
            />
          </S.EmptyState>
        </S.ContentEmptyState>
      )}
    </>
  )
}

export default EmptyState
