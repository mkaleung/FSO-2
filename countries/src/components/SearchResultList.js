import CountryInfo from "./CountryInfo"
import CountryWeatherInfo from "./CountryWeatherInfo"
import CountryList from './CountryList'

const SearchResultList = ({ searchResult, weather, handleSubmit }) => {
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

export default SearchResultList