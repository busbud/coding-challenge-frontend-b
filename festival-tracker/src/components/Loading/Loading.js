import React from 'react'
import { Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import classes from './Loading.module.sass'

const Loading = () => {
  const { t } = useTranslation()
  return (
    <div className={classes.Loading}>
      <div>{t('Loading...')}</div>
      <Spin size='large' />
    </div>
  )
}

export default Loading
