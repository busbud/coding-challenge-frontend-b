export const convertDateToISO = (inputDate) => {
    let date = inputDate ? new Date(inputDate) : new Date()
    date = date.toISOString()
    const onlyTime = new Date(date).toLocaleTimeString('en',
        { timeStyle: 'short', hour12: false, timeZone: 'UTC' })
    const onlyDate = date.substring(0, date.indexOf("T"))
    return `${onlyDate} at ${onlyTime}`
}

export function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}