import React from 'react'
import Dropdown from 'react-dropdown'

import classes from './Navbar.module.sass'
import LangList from '../../../shared/Lang/Lang'
import CurrencyList from '../../../shared/Currency/Currency'

/**
 * Navbar
 * Handle language and currency
 */
const Navbar = ({ lang, currency, nabvarChanged }) => {
	// currency is changed
	const onCurrencyChange = (cur) => {
		nabvarChanged(lang, cur)
	}

	// language is changed
	const onLangChange = (language) => {
		nabvarChanged(language, currency)
	}

    return (
        <div className={classes.Navbar}>
			<Dropdown className={classes.NavbarItem}
					  value={currency}
					  options={CurrencyList} 
					  onChange={(ob) => onCurrencyChange(ob.value)} 
					  placeholder='Select a Currency' 
			/>
			<Dropdown className={classes.NavbarItem}
                      value={lang}
					  options={LangList} 
                      onChange={(ob) => onLangChange(ob.value)} 
                      placeholder='Select a Language' 
            />
        </div>
    )
}

export default Navbar