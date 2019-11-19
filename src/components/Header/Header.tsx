import React from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { changeLang, langSelector, Lang } from '../../store/lang';
import { AppState } from '../../store';
import Button from '../Button';

interface Props {
  onClickAction: (payload: Lang) => void;
  lang: Lang;
}

const StyledHeader = styled.header`
  align-items: center;
  background-color: ${props => props.theme.busbud.header.backgroundColor};
  color: ${props => props.theme.busbud.header.color};
  display: flex;
`;

const StyledContainer = styled(Container)`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const UnordoredList = styled.ul``;
const ListItem = styled.li`
  display: inline;
  margin-left: 5px;
`;

const TitleWrapper = styled.div`
  @media (max-width: 375px) {
    font-size: 0.6rem;
  }
`;

function Header({ onClickAction }: Props) {
  const handleChangeLang = (newLang: Lang) => {
    onClickAction(newLang);
  };
  return (
    <StyledHeader>
      <StyledContainer>
        <TitleWrapper>
          <FormattedMessage id="title" />
        </TitleWrapper>
        <UnordoredList>
          <ListItem>
            <Button onClickAction={() => handleChangeLang('en')}>
              <FormattedMessage id="english" />
            </Button>
          </ListItem>
          <ListItem>
            <Button onClickAction={() => handleChangeLang('fr')}>
              <FormattedMessage id="french" />
            </Button>
          </ListItem>
        </UnordoredList>
      </StyledContainer>
    </StyledHeader>
  );
}

const mapStateToProps = (state: AppState) => ({
  lang: langSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClickAction: (lang: Lang) => dispatch(changeLang(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
