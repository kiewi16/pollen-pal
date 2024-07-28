import '../FiveDayPollenForecast/FiveDayPollenForecast.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FiveDayPollenForecastCard from '../FiveDayPollenForecastCard/FiveDayPollenForecastCard'

function FiveDayPollenForecast() {
    const [fiveDayPollenForecastData, setFiveDayPollenForecast] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    function getFiveDayPollenForecast() {
        fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&language=en-us&details=true&metric=false')
            .then(response => response.json())
            .then(data => setFiveDayPollenForecast(data.DailyForecasts))
            .catch(error => setErrorMessage(error.message))
    }

    useEffect(() => {
        getFiveDayPollenForecast()
    }, [])

    const fiveDayPollenForecastCards = fiveDayPollenForecastData.map(fiveDayPollenForecast => {
        return (
            <FiveDayPollenForecastCard
                fiveDayPollenForecast={fiveDayPollenForecast}
            />
        )
    })

    return (
        <div className="five-day-pollen-forecast">
            <h2>5-Day Pollen Forecast for Highlands Ranch, Colorado</h2>
            <Link to="/CurrentPollenForecast" className="current-pollen-forecast-link-in-five-day-pollen-forecast">Current Pollen Forecast</Link>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="five-day-pollen-forecast-cards-wrapper">
                {fiveDayPollenForecastCards}
            </div>
        </div>
    )
}

export default FiveDayPollenForecast