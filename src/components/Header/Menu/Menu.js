import React from 'react';
import MenuItem from './MenuItem'
import {ReactComponent as Logo} from './logo.svg'

export default function Menu(props){
    return(
        <div className="menu">
            <Logo className="menu-logo"/>
        </div>
    )
}