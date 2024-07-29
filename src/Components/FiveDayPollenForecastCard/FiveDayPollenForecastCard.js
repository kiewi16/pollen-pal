import '../FiveDayPollenForecastCard/FiveDayPollenForecastCard.css'

function FiveDayPollenForecastCard({ fiveDayPollenForecast, isSearchResult }) {

    const filteredFiveDayPollenForecast = fiveDayPollenForecast.AirAndPollen.filter(forecast => {
        return forecast.Name !== "UVIndex" && forecast.Name !== "AirQuality"
    })

    const pElements = filteredFiveDayPollenForecast.map(forecast => {
        return <p className="five-day-pollen-forecast-card-p-element">{forecast.Name}: {forecast.Value} ({forecast.Category})</p>
    })

    return (
        <div className="five-day-pollen-forecast-card">
            <h3>{new Date(fiveDayPollenForecast.Date).toLocaleDateString()}</h3>
            {pElements}
        </div>
    )
}

export default FiveDayPollenForecastCard