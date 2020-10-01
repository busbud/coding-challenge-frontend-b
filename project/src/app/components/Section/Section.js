import React from 'react'
import classes from './Section.module.sass'
import { useTranslation } from 'react-i18next'

import NameJson from '../../../shared/Common/Name'

/**
 * Show a polling result into a section
 */
const Section = ({ res }) => {
	const { t } = useTranslation()

    return (
        <div className={classes.Section}>
            <div className={classes.Info}>
                <a href={res.operatorUrl}>
                    <img src={res.operatorLogoUrl} className={classes.Log} alt='Operator Logo' />
                </a>
                <div className={classes.title}>{ t(NameJson.leavingFrom) }:</div>
                <div className={classes.description}>{res.departure}</div>
                <div className={classes.description}>{res.departureAddress}</div>
                <div className={classes.description}>{res.departureTime}</div>
                <div className={classes.title}>{ t(NameJson.goingTo) }:</div>
                <div className={classes.description}>{res.arrival}</div>
                <div className={classes.description}>{res.arrivalAddress}</div>
                <div className={classes.description}>{res.arrivalTime}</div>
                <div className={classes.title}>{ t(NameJson.price) }: {res.price} {res.currency}</div>
            </div>
        </div>
    )
}

export default Section
