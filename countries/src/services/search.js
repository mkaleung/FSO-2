import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/name'

const getCountries = (name) => {
    const request = axios.get(`${baseUrl}/${name}`)
    return request.then(response => {
      // if (response.data.length >= 10) {
      //   return 'over'
      // } else if (response.data.length === 0) {
      //   return null
      // } else {
        return response.data
      // }


    })
  }

export default { getCountries }