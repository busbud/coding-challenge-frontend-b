import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';

import logo from '../assets/img/osheaga-logo.png';
import SearchForm from '../components/SearchForm';
import Spinner from '../components/Spinner';
import SearchResult from '../components/SearchResult';
import { useSearch } from '../hooks/use-search';
import { useTranslation } from 'react-i18next';

const LogoWrapper = styled.div`
  margin: 1rem auto;
  width: 40%;
`;

const SpinnerWrapper = styled.div`
  margin: 4rem auto 1rem auto;
  width: 10%;
`;

const LogoImg = styled.img`
  width: 100%;
  height: auto;
`;

function SearchPage() {
  const { t } = useTranslation();
  const { search, error, loading, data } = useSearch();
  const [searchFired, setSearchFired] = useState(false);
  const handleSearch = date => {
    search(date);
    setSearchFired(true);
  };

  return (
    <>
      <header>
        <LogoWrapper>
          <LogoImg src={logo} />
        </LogoWrapper>
      </header>
      <main>
        <Container>
          <SearchForm onSubmit={handleSearch} />
          <p>{error}</p>
          {searchFired && (
            <>
              <hr />
              <Row justifyContent='center'>
                <Col xs={11}>
                  <h3>
                    {t('SearchPage.foundResults', { count: data.length })}
                  </h3>
                  {loading && (
                    <SpinnerWrapper>
                      <Spinner />
                    </SpinnerWrapper>
                  )}
                  <SearchResult results={data} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </main>
    </>
  );
}

export default SearchPage;
