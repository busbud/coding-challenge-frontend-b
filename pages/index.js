import React from 'react';
import styled from 'styled-components';
import Head from 'next/head'
import Nav from '../components/nav'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const Home = () => (
  <div>
    <Title>This is title</Title>
    <Head>
      <div className="title">Test</div>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Nav />
  </div>
)

export default Home
