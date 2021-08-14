import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SearchQuery from '../components/SearchQuery/SearchQuery'
import styles from '../styles/Home.module.css'

export default function Home(props: Record<string, unknown>) {
  const { locale, locales } = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.searchContainer}>
          <Head>
            <title>Busbud Challenge</title>
            <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='//busbud-pubweb-assets.freetls.fastly.net/images/favicons/c52fff8.favicon-32x32.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='16x16'
              href='//busbud-pubweb-assets.freetls.fastly.net/images/favicons/9ded9aa.favicon-16x16.png'
            />
          </Head>
          <header className={styles.logoContainer}>
            <Image
              src='/osheaga-gt-logo-en.png'
              alt='Osheaga Festival Logo'
              width={280}
              height={150}
            />
          </header>
          <SearchQuery {...props} />
        </div>
        <div className={styles.languageSelector}>
          {locales
            ?.filter(_locale => locale !== _locale)
            .map(_locale => (
              <a href={`/${_locale}`} key={_locale}>
                {_locale}
              </a>
            ))}
        </div>
      </div>
    </div>
  )
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: require(`../messages/${locale}.json`)
    }
  }
}
