import React from 'react';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader'

const StyledDiv = styled.div`
  height: 130px;
`;

const DepartureCardLoading = () => {
  return (<StyledDiv className="box is-radiusless">
    <ContentLoader
      height={130}
      width={700}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="20" y="2" rx="3" ry="3" width="70" height="14" />
      <rect x="20" y="22" rx="3" ry="3" width="70" height="12" />
      <rect x="25" y="42" rx="3" ry="3" width="60" height="10" />
      <rect x="148" y="10" rx="3" ry="3" width="430" height="10" />
      <rect x="148" y="40" rx="3" ry="3" width="430" height="10" />
      <rect x="615" y="12.27" rx="0" ry="0" width="73" height="23" />
    </ContentLoader>
  </StyledDiv>);
};

export default DepartureCardLoading;
