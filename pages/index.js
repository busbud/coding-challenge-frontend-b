import React, { useContext } from 'react';
import styled from 'styled-components';
import Head from 'next/head'
import { getTransaltion } from '../utils/translation'
import { IntlContext } from './_app'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`
const Home = () => {
  const { language, toggleLanguage } = useContext(IntlContext);
  return (
    <div>
      <div onClick={() => toggleLanguage('en')}>English</div>
      <div onClick={() => toggleLanguage('fr')}>French</div>
      <Title>{ getTransaltion('title', language) }</Title>
      <Head>
        <div className="title">Test</div>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  )
}

export default Home
