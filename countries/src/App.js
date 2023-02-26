import { useState, useEffect } from 'react'
import searchService from './services/search'

const ResultList = ({searchResult}) => {
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
        {Object.values(country.languages).map(each => <li key={each}>{each}</li>)}
        <br />
          <img src={country.flags.png} alt={country.flags.alt} />        
      </div>
    )
  } else {
    return (
      <ul>
        {searchResult.map(result => 
          <li key={result.name.common}>{result.name.common}</li>
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

  useEffect(() => {
    if (search) {
      searchService
      .getCountries(search)
      .then(results => {
        setSearchResult(results)
        console.log(results.length)
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
      <ResultList searchResult={searchResult} />
    </div>
  );
}

export default App;
