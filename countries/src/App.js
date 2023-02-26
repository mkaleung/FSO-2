import { useState, useEffect } from 'react'
import searchService from './services/search'

const CountryList = ({ country, handleSubmit }) => {
  return (
    <li key={country}>
      {country}
      <button name={country} onClick={(event) => handleSubmit(event)}>show</button>
    </li>
      
  )
}


const ResultList = ({ searchResult, handleSubmit }) => {
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
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        <br />
          <img src={country.flags.png} alt={country.flags.alt} />        
      </div>
    )
  } else {
    return (
      <ul>
        {searchResult.map(result => 
          <CountryList country={result.name.common} handleSubmit={handleSubmit} />
        )}
      </ul>
    )
  }
}

function App() {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
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
        setSearchResult(results)
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
      <ResultList searchResult={searchResult} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
