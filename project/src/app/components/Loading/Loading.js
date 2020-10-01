import React from 'react'
import { Spin } from 'antd'
import { useTranslation } from 'react-i18next'

import classes from './Loading.module.sass'
import NameJson from '../../../shared/Common/Name'

/**
 * Show on loading 
 */
const Loading = () => {
	const { t } =  useTranslation()

	return (
		<div className={classes.Loading}>
			<div>{ t(NameJson.loading) }</div>
			<Spin size='large' />
		</div>
	)
}

export default Loading
