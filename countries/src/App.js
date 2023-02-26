import { useState, useEffect } from 'react'
import searchService from './services/search'
import weatherService from './services/weather'
import SearchResultList from './components/SearchResultList'

function App() {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [weather, setWeather] = useState([])

  const handleChange = (event) => {
      setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    const country = event.target.name
    setSearch(country)
  }

  useEffect(() => {
    if (search) {
      searchService
        .getCountries(search)
        .then(results => {
          if(results.length === 1) {
            weatherService
              .getWeather(results[0].name.common)
              .then(weatherResult => {
                setWeather(weatherResult)
                setSearchResult(results)
              })
          } else {
            setSearchResult(results)
          }          
        })
        .catch(error => {
          setSearchResult(null)
        })
    }
  },[search])

  return (
    <div>
      <p>
        find countries: <input value={search} onChange={handleChange} />
      </p>
      <SearchResultList searchResult={searchResult} weather={weather} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
