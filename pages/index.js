import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

const Home = () => (
  <div>
    <Head>
      <div className="title">Test</div>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Nav />
  </div>
)

export default Home
