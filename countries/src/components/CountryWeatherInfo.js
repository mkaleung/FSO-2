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

export default CountryWeatherInfo