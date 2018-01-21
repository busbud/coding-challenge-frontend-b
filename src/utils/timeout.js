/**
 * A simple utility that allows to use async/await syntax over setTimeout
 * @param duration milliseconds wait time
 * @returns {Promise<undefined>}
 */
export default duration => new Promise(resolve => {
	setTimeout(resolve, duration)
})
