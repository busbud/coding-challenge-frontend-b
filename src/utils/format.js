import moment from 'moment';
/**
 * Method to return a string formated date
 * @param {String} date
 */
export function formatDate(date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}

/**
 * Method to return a string formated time
 * @param {String} date
 */
export function formatTime(date) {
  return moment(date).format('h:mm:ss a');
}
