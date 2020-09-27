import React from 'react'
import { Spin } from 'antd'
import classes from './Loading.module.sass'

const Loading = () => {
  return (
    <div className={classes.Loading}>
      <div>Loading...</div>
      <Spin size='large' />
    </div>
  )
}

export default Loading
