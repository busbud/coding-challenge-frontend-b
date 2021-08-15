import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import React from 'react'
import { useDepartures, useInput } from '../../hooks'
import SearchResults from '../SearchResults/SearchResults'
import styles from './SearchQuery.module.css'

export default function SearchQuery() {
  const t = useTranslations('Main')
  const { locale } = useRouter()
  // set currency according to locale. Can be much more sophisticated here
  const currency =
    (locale &&
      {
        en: 'USD',
        fr: 'EUR',
        pt: 'BRL'
      }[locale]) ??
    'USD'

  // Not using a date library here doesn't help with readability
  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const tomorrow = new Date(
    tomorrowDate.getTime() - tomorrowDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split('T')[0]

  const { value: adults, bind: bindAdults } = useInput('1')
  const { value: date, bind: bindDate } = useInput(tomorrow)
  const { departures, locations, stale, search } = useDepartures()

  const doSearch = () => {
    search('f2m673', 'f25dvk', date, {
      adult: +adults,
      currency
    })
  }

  return (
    <>
      <div
        className={`${styles.form} ${
          departures.length > 0 || stale
            ? styles.dropshadow
            : styles.roundedBottom
        }`}
      >
        <div className={styles.origin}>
          <label className={styles.label}>{t('origin', { locale })}</label>
          <div className={styles.input}>Québec</div>
        </div>
        <div className={styles.destination}>
          <label className={styles.label}>{t('destination', { locale })}</label>
          <div className={styles.input}>Montreal</div>
        </div>
        <div className={styles.date}>
          <label className={styles.label}>{t('date', { locale })}</label>
          <input id='date' className={styles.input} type='date' {...bindDate} />
        </div>
        <div className={styles.passengers}>
          <label className={styles.label} htmlFor='passengers'>
            {t('passengers', { locale })}
          </label>
          <input
            id='passengers'
            className={styles.input}
            type='number'
            min={1}
            {...bindAdults}
          ></input>
        </div>
        <button className={styles.submitButton} onClick={doSearch}>
          {t('search', { locale })}
        </button>
      </div>
      <SearchResults
        locations={locations}
        departures={departures}
        loading={stale}
      />
    </>
  )
}
