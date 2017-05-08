import React from 'react'
import logo from '../../public/oshea-logo.png'
import {hero, logoWrapper} from './style.css'


const Header = () => (
  <div className={hero}>
    <div className={logoWrapper}>
      <img src={logo} alt=""/>
    </div>
    <h2> August 4-5-6, 2017 </h2>
    <p>  Parc Jean-Drapeau, Montréal </p>
  </div>
)

export default Header