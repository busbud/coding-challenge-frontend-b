export const getLocations = (idFrom: string, idTo: string, locationsArray: Array<any>, cities: Array<any>) => {
  const from = locationsArray.filter(location => location.id === idFrom)[0]
  const to = locationsArray.filter(location => location.id === idTo)[0]

  const fromCity = cities.filter(city => city.id === from.city_id)[0]
  const toCity = cities.filter(city => city.id === to.city_id)[0]

  const locations = { from, to, fromCity, toCity }

  return locations
}

export const getOperator = (id: number, operators: any) => {
  const operator = operators.filter(operator => operator.id === id)[0]
  return operator
}

export const getFormattedPrice = (price: number) => {
  return Math.round(price / 100)
}

export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}
