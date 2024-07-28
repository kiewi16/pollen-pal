import '../FiveDayPollenForecastCard/FiveDayPollenForecastCard.css'

function FiveDayPollenForecastCard({ fiveDayPollenForecast }) {

    const pElements = fiveDayPollenForecast.AirAndPollen.map(forecast => {
        return <p className="five-day-pollen-forecast-card-p-element">{forecast.Name}: {forecast.Value} ({forecast.Category})</p>
    })

    return (
        <div className="five-day-pollen-forecast-card">
            <h3>{fiveDayPollenForecast.Date}</h3>
            {pElements}
        </div>
    )
}

export default FiveDayPollenForecastCard