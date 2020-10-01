import React from 'react'

import classes from './Container.module.sass'
import Header from '../Header/Header'

/**
 * container, include header,
 * navbar and content
 * without sidebar and footer
 */
const Container = ({ navbar, content }) => {
    return (
        <div className={classes.Container}>
            <Header />
            <div className={classes.Navbar}>
                {navbar}
            </div>
            <div className={classes.Content}>
                {content}
            </div>
        </div>
    )
}

export default Container