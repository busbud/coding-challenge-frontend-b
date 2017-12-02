// UTC time (dateTtime) -> hh:mm
export const utcTimeToHhMm = utcTime => utcTime.split('T')[1].substr(0, 5)

// Number XXXX -> XX,XX (currency)
export const numToCurrency = num => (num/100).toFixed(2)
