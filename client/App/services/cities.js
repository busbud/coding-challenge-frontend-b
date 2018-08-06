import citiesList from './cities-list'

const nameSearch = (searchString) => {
  const regex = new RegExp(searchString)
  return (city) => {
    return regex.test(city.name)
  }
}

export default {
  async searchByName (searchString) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const results = citiesList.filter(nameSearch(searchString))
        resolve(results)
      }, 700)
    })
  },

  async findByGeohash (geohash) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const city = citiesList.find(city => city.geohash === geohash)
        if (city) {
          resolve(city)
        } else {
          reject(new Error(`No city with geohash: ${geohash}`))
        }
      }, 700)
    })
  }
}
