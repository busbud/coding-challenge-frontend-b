import React from 'react'
import classes from './Layout.module.sass'
import logoOsheaga from '../../shared/images/osheaga.png'

const Layout = ({ children }) => {
  return (
    <div className={classes.Content}>
      <div className={classes.LogoContainer}>
        <img className={classes.Logo} src={logoOsheaga} alt='Osheaga festival' />
      </div>
      {children}
    </div>
  )
}

export default Layout
