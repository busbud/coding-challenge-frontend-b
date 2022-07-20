import styled from 'styled-components';
import { breakpoints } from './utils';

export const Container = styled.div`
  height: 100vh;
  background-color: #2a63cb;
  background-image: url('./images/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${breakpoints('padding', 'px', [
    { 1400: 40 },
    { 800: 60 },
    { 600: 40 },
    { 450: 20 },
  ])};
`;

export const Hero = styled.img`
  width: 400px;
  padding: 40px 0px 200px 0px;
`;

export const Title = styled.h1`
  font-size: 5rem;
  ${breakpoints('font-size', 'rem', [
    { 1400: 4 },
    { 800: 3 },
    { 600: 2.4 },
    { 450: 1.6 },
  ])};
`;

export const Content = styled.section`
  font-size: 3rem;
  margin: 60px 0;
  ${breakpoints('font-size', 'rem', [
    { 1400: 2.4 },
    { 800: 1.8 },
    { 600: 1.6 },
    { 450: 1.2 },
  ])};
  ${breakpoints('margin', '', [{ 1200: '40px 0' }, { 600: '20px 0' }])};
`;
