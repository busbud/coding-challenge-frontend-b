import React  from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import Content from '../Content/Content';
import FooterContainer from '../Footer/FooterContainer';
import './App.scss';


const App = () => (
    <div className="app">
        <HeaderContainer />
        <Content />
        <FooterContainer />
    </div>
);

export default App;