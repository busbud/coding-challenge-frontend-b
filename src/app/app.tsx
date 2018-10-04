import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { I18n } from 'react-i18next';
import DepartureItem from './components/DepartureItem/DepartureItem';
import { LoaderSvg } from './components/Loader/Loader';
import SearchForm from './components/SearchForm/SearchForm';
import {
    Container,
    Footer,
    Header,
    HeaderH1,
    Image,
    LanguageSwitcher,
    Root,
    Ul
} from './components/StyledComponents';
import { SearchStore } from './store/search';

interface Props {
  store: SearchStore;
}

@inject('store')
@observer
class App extends React.Component<Props> {
  render() {
    const { results, isComplete, error } = this.props.store;

    return (
        <I18n ns="">
            {(t, { i18n }) => (
            <Root>
                <LanguageSwitcher
                    onClick={() => {
                      i18n.changeLanguage(
                        i18n.language === 'en' ? 'fr' : 'en'
                    );
                    }}
                >
                    {i18n.language === 'en' ? 'fr' : 'en'}
                </LanguageSwitcher>
                <Header>
                    <HeaderH1>{t('title')}</HeaderH1>
                    <Image src={'osheaga.png'} />
                </Header>
                <Container>
                    <SearchForm />
                </Container>
                <Container>
                    {isComplete === false && (<LoaderSvg />)}
                </Container>
                {error && <h1>{JSON.stringify(error)}</h1>}
                {results && (
                    <Container>
                        <Ul>
                            {results.departures.map(departure => (
                                <DepartureItem key={departure.id} departure={departure} />
                            ))}
                        </Ul>
                    </Container>
                )}
                <Footer />
            </Root>
            )}
        </I18n>
    );
  }
}

export default App as React.ComponentClass<{}>;
