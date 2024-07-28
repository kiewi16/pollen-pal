import { useState, useEffect } from 'react'
import CurrentPollenForecastCard from '../CurrentPollenForecastCard/CurrentPollenForecastCard'

function CurrentPollenForecast() {
    const [currentPollenForecastData, setCurrentPollenForecast] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    function getCurrentPollenForecasts() {
        // fetch('http://dataservice.accuweather.com/forecasts/v1/daily/1day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&details=true')
        // fetch('http://localhost:3001/api/v1/ideas')
            .then(response => response.json())
            // .then(data => console.log(data.DailyForecasts[0].AirAndPollen))
            .then(data => setCurrentPollenForecast(data.DailyForecasts[0].AirAndPollen))
            .catch(error => setErrorMessage(error.message))
    }

    useEffect(() => {
        getCurrentPollenForecasts()
    }, [])

    // const currentPollenForecastCards = currentPollenForecastData.map(currentPollenForecast => {
    //     return (
    //         <CurrentPollenForecastCard
    //             currentPollenForecast={currentPollenForecast}
    //         />
    //     )
    // })

    return (
        <div className="current-pollen-forecast">
            <h2>Today's Pollen Foreast for Highlands Ranch, Colorado</h2>
            {errorMessage && <p> {errorMessage} </p>}
            <CurrentPollenForecastCard currentPollenForecastData={currentPollenForecastData}/>
        </div>
    )
}

export default CurrentPollenForecast