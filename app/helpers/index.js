import moment from 'moment'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});


export const formatTime = (time) => moment(time).format("dddd, MMMM Do YYYY, h:mm a")

export const formatMoney = (money) => formatter.format((money/100))