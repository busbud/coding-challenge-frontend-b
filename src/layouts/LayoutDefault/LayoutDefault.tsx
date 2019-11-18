import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div``;

export default function LayoutDefault({ children }: Props) {
  return (
    <LayoutWrapper>
      <Header />
      {children}
    </LayoutWrapper>
  );
}
