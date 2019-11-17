import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div``;

const ContentWrapper = styled.section`
  padding: 20px;
`;

export default function LayoutDefault({ children }: Props) {
  return (
    <LayoutWrapper>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  );
}
