function CurrentPollenForecastCard({ currentPollenForecast }) {
    const { Name, Value, Category } = currentPollenForecast

    return (
        <div className="current-pollen-forecast-card">
            <h3>{Name}</h3>
            <p>{Value}</p>
            <p>{Category}</p>
        </div>
    )

}

export default CurrentPollenForecastCard