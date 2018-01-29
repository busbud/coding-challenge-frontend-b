export default dateString => {
	const time = new Date(dateString)
	// Small utility to prepend a number with a zero when needed
	const p = num => (`0${num}`).slice(-2)
	return `${p(time.getHours())}:${p(time.getMinutes())}`
}
