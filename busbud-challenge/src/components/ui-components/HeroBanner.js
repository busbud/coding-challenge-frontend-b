import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const TextWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`

export const HeroBanner = (props) => (
  <Wrapper>
    <TextWrapper>
      <h2>{props.title}</h2>
    </TextWrapper>
  <Image src={props.image} />
  </Wrapper> 
) 