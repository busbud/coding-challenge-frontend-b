import React, { useState } from 'react'
import Dropdown from 'react-dropdown'
import moment from 'moment'
import { Button, DatePicker } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import uuidv4 from 'uuid/v4'
import { useTranslation } from 'react-i18next'

import classes from './Content.module.sass'
import Section from '../Section/Section'
import Loading from '../Loading/Loading'
import AxiosInstance from '../../Axios/AxiosInstance'
import GeoCodeList from '../../../shared/GeoCode/GeoCode'
import NameJson from '../../../shared/Common/Name'
import PassengerList from '../../../shared/Passenger/Passenger'
import ConstJson from '../../../shared/Common/Const'
import ParsePollRes from '../../utils/ParsePollRes'

/**
 * content
 * poll search
 * show result
 */
const Content = ({ lang, currency }) => {
	const { t } = useTranslation()

	const [leavingFrom, changeLeavingFrom] = useState(GeoCodeList[0].value)
	const [goingTo, changeGoingTo] = useState(GeoCodeList[0].value)
	const now = new Date()
	const currentDate = now.toISOString().substring(0, 10)
	const [leavingDay, changeLeavingDay] = useState(currentDate)
	const [adult, changeAdult] = useState(1)
	const [child, changeChild] = useState(0)
	const [senior, changeSenior] = useState(0)
	const [onLoading, setOnLoading] = useState(false)
	const [departures, setDepartures] = useState([])
	const [locations, setLocations] = useState([])
	const [operators, setOperators] = useState([])
	
	/**
	 * preprocess for poll search
	 * initialize the past poll data
	 */
	const prePollSearch = () => {
		// initialize departures, 
		// locations and operators
		setDepartures([])
		setLocations([])
		setOperators([])

		// mark on loading
		setOnLoading(true)
		
		// do poll search
		pollSearch(0)
	}

	/**
	 * Poll search
	*/
	const pollSearch = (index) => {
		AxiosInstance.get(`/x-departures/${leavingFrom}/${goingTo}/${leavingDay}/poll`, {
			params: {
				adult,
				child,
				senior,
				lang,
				currency,
				index
			}
		})
		.then(res => {
			// add polling result, such as
			// departures, locations and operators
			setDepartures(prevDep => {
				return Object.assign(prevDep, res.data.departures)
			})
			setLocations(prevLoc => {
				return Object.assign(prevLoc, res.data.locations)
			})
			setOperators(prevOp => {
				return Object.assign(prevOp, res.data.operators)
			})

			if (res.data.complete) {
				// finish poll search
				setOnLoading(false)
			} 
			else {
				// poll search again
				setTimeout(() => {
					pollSearch(departures.length)
				}, ConstJson['setTimeout'])
			}
		})
		.catch(err => {
			setOnLoading(false)
			console.log(err)
		})
	}

	let showResult = <Loading />

	// if poll searching is finished,
	// show poll result
	if (!onLoading) {
		let sections = <div>{ t(NameJson.noResult) }</div>
		const parseRes = ParsePollRes(departures, locations, operators)
		if (parseRes && parseRes.length) {
			sections = parseRes.map(res => {
				return <Section key={uuidv4()} res={res} />
			})
		}
		showResult = (
			<div className={classes.ShowResult}>
				{sections}
			</div>
		)
	}

	return (
		<div className={classes.Content}>
			<div className={classes.Form}>
				<div className={classes.FormGroup}>
					<div className={classes.FormItem}>
              			<div>{ t(NameJson.leavingFrom) }</div>
						<Dropdown options={GeoCodeList} 
								  value={leavingFrom} 
								  onChange={(ob) => changeLeavingFrom(ob?.value)} 
								  placeholder={ t(NameJson.SelectDeparture) } />
					</div>
					<div className={classes.FormItem}>
              			<div>{ t(NameJson.goingTo) }</div>
						<Dropdown options={GeoCodeList} 
								  value={goingTo} 
								  onChange={(ob) => changeGoingTo(ob?.value)} 
								  placeholder={ t(NameJson.SelectDeparture) } />
					</div>
					<div className={classes.FormItem}>
              			<div>{ t(NameJson.leavingDay) }</div>
						<DatePicker className={classes.DatePicker}
									defaultValue={moment(leavingDay)} 
									onChange={(ob) => { changeLeavingDay(ob?.toISOString().substring(0, 10)) }}
						/>
					</div>
					<div className={classes.FormItem}>
              			<div>{ t(NameJson.passenger) }</div>
						<Dropdown options={PassengerList} 
								  value={PassengerList[0].value}
								  disabled={true}
								  placeholder={ t(NameJson.selectPassenger) }
						/>
					</div>
					<Button className={classes.SearchBtn} 
							onClick={ () => prePollSearch() } 
							type='primary' 
							icon={ <SearchOutlined /> }
					>
						{ t(NameJson.Search) }
					</Button>
				</div>
			</div>
			{showResult}
		</div>
	)
}

export default Content
