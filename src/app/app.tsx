import * as React from 'react';
import { Root, Header, HeaderH1, Button, Image } from './components/components';


const App = (props: any) => (
    <Root>
        <Header>
            <HeaderH1>Its Time to book for</HeaderH1>
            <Image src={'osheaga.png'} />
        </Header>
        <Header>
            <Button>Lets Go!</Button>
        </Header>
    </Root>
);

export default App;