// Small utility to prepend a zero when needed
const p = n => (`0${n}`).slice(-2)

/**
 * Format a date using en-CA locale. we could use:
 *
 *   new Intl.DateTimeFormat('en-CA').format(date)
 *
 * Although since this is browser dependant, this implementation is safer.
 *
 * @param date {Date}
 * @returns {string} YYYY-MM-DD
 */
export default date => `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`
