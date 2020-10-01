import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import i18next from 'i18next';

import Container from './app/components/Container/Container'
import Content from './app/components/Content/Content'
import Navbar from './app/components/Navbar/Navbar'
import LangList from './shared/Lang/Lang'
import CurrencyList from './shared/Currency/Currency'

function App() {
	const { i18n } = useTranslation()
	const [lang, setLang] = useState(LangList[0].value)
	const [currency, setCurrency] = useState(CurrencyList[0].value)

	function nabvarChanged(language, cur) {
		setLang(language)
		setCurrency(cur)
	}

	useEffect(() => {
		i18next.changeLanguage(lang)
	}, [lang])
	
	return (
		<Container
			navbar={<Navbar lang={lang} currency={currency} nabvarChanged={nabvarChanged} />}
			content={<Content lang={lang} currency={currency} nabvarChanged={nabvarChanged} />}
		/>
	);
}

export default App;
