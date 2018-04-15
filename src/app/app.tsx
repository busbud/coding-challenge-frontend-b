import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { SearchStore } from './store/search';
import { LoaderSvg } from './components/Loader/Loader';
import { 
    Root, 
    Header, 
    HeaderH1, 
    Button, 
    Image, 
    Footer, 

    Ul, 
    Container, 
} from './components/styledComponents';
import DepartureItem from './components/DepartureItem/DepartureItem';

interface Props {
    store: SearchStore;
}

@inject('store')
@observer
class App extends React.Component<Props> {
    render() {
        const { search, results, isComplete } = this.props.store;
        return (
            <Root>
                <Header>
                    <HeaderH1>Its Time to book for</HeaderH1>
                    <Image src={'osheaga.png'} />
                </Header>
                <Container>
                    <Button onClick={() => search()}>Lets Go!</Button>
                </Container>
                <Container>
                    {isComplete === false && (<LoaderSvg />)}
                </Container>
                {results && (
                    <Container>
                        <Ul>
                            {results.departures.map(departure => 
                              <DepartureItem key={departure.id} departure={departure}  />
                            )}
                        </Ul>
                    </Container>
                )}
                <Footer />
            </Root>
        );
    }
}


export default App as React.ComponentClass<{}>;