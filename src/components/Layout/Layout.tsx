import { ReactNode } from 'react'
import Head from 'next/head'
import Header from '../Header/Header'
import styled from 'styled-components'

const Main = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.padding};
`

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Head>
      <title>Busbud Front-End Challenge</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
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
    <Main>
      <Header />
      {children}
    </Main>
  </>
)

export default Layout
