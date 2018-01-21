export default (departureTime, arrivalTime) => {
	const dep = new Date(departureTime).getDay()
	const arr = new Date(arrivalTime).getDay()
	// We assume a bus trip is always shorter than seven days.
	// The first addition is used to avoid negative modulus.
	return (7 + arr - dep) % 7
}
