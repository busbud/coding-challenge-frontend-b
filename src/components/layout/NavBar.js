import React, { useContext } from 'react';
import BusbudContext from '../../context/busbud/busbudContext';

const NavBar = () => {
    const busbudContext = useContext(BusbudContext);

    const defaultProps = {
        title: 'Bus Finder',
        icon: 'fas fa-bus',
    };

    const toggleLanguage = (e) => {
        e.preventDefault();
        busbudContext.setLanguage();
    };
  
        return (
            <nav className="navbar">
                <h1>
                    <i className={defaultProps.icon}></i>{defaultProps.title}
                </h1>
                <button className="btn" onClick={toggleLanguage} style={btnLang}>{busbudContext.english?'Fr':'En'}</button>
            </nav>
        )
}

const btnLang = {
    backgroundColor: '#5C5C5C',
    color: '#DCEDF5',
    borderRadius: '50%',
    padding: '5px 10px'
}

export default NavBar
