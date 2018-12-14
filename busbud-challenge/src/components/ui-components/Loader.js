import React from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  margin: 100px auto 0;
  width: 70px;
  text-align: center;

  div {
    width: 18px;
    height: 18px;
    background-color: #333;
  
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% { 
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% { 
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
`
const Bounce1 = styled.div`
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
`

const Bounce2 = styled.div`
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
`

const Bounce3 = styled.div``

export const Loader = () => (
  <Spinner>
    <Bounce1 />
    <Bounce2 />
    <Bounce3 />
  </Spinner>
)