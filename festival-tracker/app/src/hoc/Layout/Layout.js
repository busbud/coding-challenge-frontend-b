import React from 'react'
import classes from './Layout.module.sass'
import Toolbar from '../Toolbar/Toolbar'

const Layout = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <Toolbar />
      <div className={classes.Content}>
        {children}
      </div>
    </div>
  )
}

export default Layout
