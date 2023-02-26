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

export default CountryList