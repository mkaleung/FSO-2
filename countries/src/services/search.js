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

// const create = newObject => {
//   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)
// }

// const removePerson = id => {
//     const request = axios.delete(`${baseUrl}/${id}`)
//     return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject)
//     return request.then(response => response.data)
// }

export default { getCountries }