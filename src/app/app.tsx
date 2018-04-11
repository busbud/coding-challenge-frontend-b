import * as React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    background: purple;
    min-height: 100vh;
    display: flex;
`;

const Image = styled.img`

`;

const App = (props: any) => (
    <Root>
        <img src={'osheaga.png'} />
    </Root>
);

export default App;