import * as React from 'react';
import { observer } from 'mobx-react';
// import { Root, Header, HeaderH1, Button, Image } from './components/components';
import styled, { injectGlobal } from 'styled-components/dist/styled-components.js';


injectGlobal`
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
`

export const Root = styled.div`
    height: 100vh;
    background: linear-gradient(rgb(14, 138, 197), rgb(7, 155, 188), rgb(117, 205, 245));
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
`;

export const HeaderH1 = styled.h1`
    padding-right: 15px;
    color: #fff;
    font-family: sans-serif;
`;

export const Image = styled.img`
    max-width: 100%;
    height: 80px;
`;

export const Button = styled.button`
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    color: #0898bd;
`;

interface Props {
    store?: any;
}

@observer(['store'])
class App extends React.Component<Props> {
    render() {
        const { search } = this.props.store;
        return (
            <Root>
                <Header>
                    <HeaderH1>Its Time to book for</HeaderH1>
                    <Image src={'osheaga.png'} />
                </Header>
                <Header>
                    <Button onClick={() => search()}>Lets Go!</Button>
                </Header>
            </Root>
        );
    }
}


export default App;