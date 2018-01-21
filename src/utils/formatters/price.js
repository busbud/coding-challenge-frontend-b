export default price => {
	const rest = price % 100
	return (price / 100).toFixed(rest > 0 ? 2 : 0)
}
