import React from 'react';
import List from './List'
import Footer from './Footer'
import HeaderContainer from './Header/HeaderContainer'

export default function AppContainer(props){
    return(
        <div>
            <HeaderContainer/>
            <List/>
            <Footer/>
        </div>
    )
}