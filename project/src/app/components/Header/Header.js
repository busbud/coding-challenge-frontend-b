import React from 'react'
import { useTranslation } from 'react-i18next'

import classes from './Header.module.sass'
import NameJson from '../../../shared/Common/Name'

/**
 * Header
 */
const Header = () => {
	const { t } = useTranslation()

	return (
		<header className={classes.Header}>
			<div className={classes.title}>
				{ t(NameJson.title) }
			</div>
		</header>
	)
}

export default Header
