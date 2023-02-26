import { useState, useEffect } from 'react'
import searchService from './services/search'
import weatherService from './services/weather'

const CountryList = ({ country, handleSubmit }) => {
  return (
    <li>
      {country}
      <button 
        name={country} 
        onClick={(event) => handleSubmit(event)}>
          show
      </button>
    </li>  
  )
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      <br />
      <img src={country.flags.png} alt={country.flags.alt} />        
  </div>
  )
}

const CountryWeatherInfo = ({ weather }) => {
  return (
    <div>
      <h1>Weather in {weather.name}</h1>
      <p>Temperature: {weather.main.temp}°C</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
      <p>Wind Speed: {weather.wind.speed}m/s </p>
    </div>
  )
}

const ResultList = ({ searchResult, weather, handleSubmit }) => {
  if (searchResult === null) {
    return (
      <div>
        <p>No countries found</p>
      </div>
    )
  } else if (searchResult.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (searchResult.length === 1) {
    const country = searchResult[0]

    return (
      <div>
        <CountryInfo country={country} />
        <CountryWeatherInfo weather={weather} />
      </div>
    )
  } else {
    return (
      <ul>
        {searchResult.map(result => 
          <CountryList key={result.name.common} country={result.name.common} handleSubmit={handleSubmit} />
        )}
      </ul>
    )
  }
}

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
      find countries 
      <input value={search} onChange={handleChange}></input>
      <ResultList searchResult={searchResult} weather={weather} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
