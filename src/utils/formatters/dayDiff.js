export default (departureTime, arrivalTime) => {
	const dep = new Date(departureTime).getDay()
	const arr = new Date(arrivalTime).getDay()
	if (dep === 7) {
		return arr + 1
	}
	return arr - dep
}
