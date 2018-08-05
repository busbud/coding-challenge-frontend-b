import citiesList from './cities-list'

const nameSearch = (searchString) => {
  const regex = new RegExp(searchString)
  return (city) => {
    return regex.test(city.name)
  }
}

export default {
  async search (searchString) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const results = citiesList.filter(nameSearch(searchString))
        resolve(results)
      }, 700)
    })
  }
}
