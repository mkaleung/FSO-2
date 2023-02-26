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

export default CountryInfo