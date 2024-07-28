import '../CurrentPollenForecastCard/CurrentPollenForecastCard.css'

function CurrentPollenForecastCard({ currentPollenForecast }) {
    const { Name, Value, Category } = currentPollenForecast

    const gradientStyles = {
        Low: 'linear-gradient(to right, white, rgb(144, 238, 144)',
        Moderate: 'linear-gradient(to right, #FFFFE0, #FFD700',
        High: 'linear-gradient(to right, #FFD1DC, #FF4500)',
        VeryHigh: 'linear-gradient(to right, #FFD1DC, #FF6347, #FF4500, #9b2226)',
        Extreme: 'linear-gradient(to right, #f44336, #9b2226)'
    }

    const gradientStyle = gradientStyles[Category]
    const cardStyle = gradientStyle ? { backgroundImage: gradientStyle } : {}

    return (
        <div className="current-pollen-forecast-card" style={cardStyle}>
            <h3>{Name}</h3>
            <p>{Value}</p>
            <p>{Category}</p>
        </div>
    )

}

export default CurrentPollenForecastCard