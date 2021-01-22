import { ReactNode } from 'react'
import Head from 'next/head'
import Header from 'components/Header/Header'

import styles from './Layout.module.scss'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Head>
      <title>Busbud Front-End Challenge</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <link
      rel="preload"
      href="/fonts/codecpro-regular-webfont.woff2"
      as="font"
      type="font/woff2"
      crossOrigin=""
    />
    <link
      rel="preload"
      href="/fonts/codecpro-bold-webfont.woff2"
      as="font"
      type="font/woff2"
      crossOrigin=""
    />
    <link
      rel="preload"
      href="/fonts/codecpro-light-webfont.woff2"
      as="font"
      type="font/woff2"
      crossOrigin=""
    />
    <main className={styles.main}>
      <Header />
      {children}
    </main>
  </>
)

export default Layout
