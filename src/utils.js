import moment from 'moment'
import axios from 'axios'

export const getLocationFromId = (id, locations) => {
    const { name } = locations.find(location => location.id === id)
    return name
}

export const getFormattedTime = (time) => moment(time).format("dddd, MMMM Do YYYY, h:mm a")

export const getTripDuration = (timeA, timeB) =>  moment.duration(moment(timeA).diff(moment(timeB))).humanize()

export const createFormatter = (lang, currency) => {
    return new Intl.NumberFormat(lang.toLowerCase(), {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2
    })
}

const headers = {
  'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
}
const endpoint = `https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02`

export const journeyService = async ({ adult, lang, currency, shouldPoll } = {}) => {
    const query = `adult=${adult}&lang=${lang}&currency=${currency}`
    const url = `${endpoint}?${query}`
    const pollUrl = `${endpoint}/poll?index=10&${query}`

    return shouldPoll ? (await axios.get(pollUrl, { headers })).data : (await axios.get(url, { headers })).data
}