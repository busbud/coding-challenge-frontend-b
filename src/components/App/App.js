import React  from 'react';
import HeaderContainer from '../Header/HeaderContainer';
import Content from '../Content/Content';
import './App.scss';


const App = () => (
    <div className="app">
        <HeaderContainer />
        <Content />
    </div>
);

export default App;