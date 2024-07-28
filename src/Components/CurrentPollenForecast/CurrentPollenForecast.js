import '../CurrentPollenForecast/CurrentPollenForecast.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CurrentPollenForecastCard from '../CurrentPollenForecastCard/CurrentPollenForecastCard'

function CurrentPollenForecast() {
    const [currentPollenForecastData, setCurrentPollenForecast] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    function getCurrentPollenForecast() {
        fetch('http://dataservice.accuweather.com/forecasts/v1/daily/1day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&details=true')
            .then(response => response.json())
            .then(data => setCurrentPollenForecast(data.DailyForecasts[0].AirAndPollen))
            .catch(error => setErrorMessage(error.message))
    }

    useEffect(() => {
        getCurrentPollenForecast()
    }, [])

    const currentPollenForecastCards = currentPollenForecastData.map(currentPollenForecast => {
        return (
            <CurrentPollenForecastCard
                currentPollenForecast={currentPollenForecast}
            />
        )
    })

    return (
        <div className="current-pollen-forecast">
            <h2>Today's Pollen Forecast for Highlands Ranch, Colorado</h2>
            <Link to="/FiveDayPollenForecast" className="five-day-pollen-forecast-link-in-current-pollen-forecast">5-Day Pollen Forecast</Link>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="current-pollen-forecast-cards-wrapper">
                {currentPollenForecastCards}
            </div>
        </div>
    )
}

export default CurrentPollenForecast