import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SearchStore } from './store/search';
import { LoaderSvg } from './components/Loader/Loader';
import { 
    Root, 
    Header, 
    HeaderH1, 
    Image, 
    Footer,
    Ul, 
    Container, 
} from './components/styledComponents';
import DepartureItem from './components/DepartureItem/DepartureItem';
import SearchForm from './components/SearchForm/SearchForm';

interface Props {
    store: SearchStore;
}

@inject('store')
@observer
class App extends React.Component<Props> {
    render() {
        const { search, results, isComplete, error } = this.props.store;
        return (
            <Root>
                <Header>
                    <HeaderH1>Its Time to book for</HeaderH1>
                    <Image src={'osheaga.png'} />
                </Header>
                <Container>
                    <SearchForm onSubmit={() => search()} />
                </Container>
                <Container>
                    {isComplete === false && (<LoaderSvg />)}
                </Container>
                {error && <h1>{JSON.stringify(error)}</h1>}
                {results && (
                    <Container>
                        <Ul>
                            {results.departures.map(departure => (
                                <DepartureItem key={departure.id} departure={departure}  />
                            ))}
                        </Ul>
                    </Container>
                )}
                <Footer />
            </Root>
        );
    }
}


export default App as React.ComponentClass<{}>;