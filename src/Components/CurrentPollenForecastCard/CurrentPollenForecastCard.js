import '../CurrentPollenForecastCard/CurrentPollenForecastCard.css'

function CurrentPollenForecastCard({ currentPollenForecast }) {
    const { Name, Value, Category, } = currentPollenForecast
    
    const gradientStyles = {
        Low: 'linear-gradient(to bottom, white, rgb(144, 238, 144)',
        Moderate: 'linear-gradient(to bottom, #FFFFE0, #FFD700',
        High: 'linear-gradient(to bottom, #FFD1DC, #FF4500)',
        VeryHigh: 'linear-gradient(to bottom, #FFD1DC, #FF6347, #FF4500, #9b2226)',
        Extreme: 'linear-gradient(to bottom, #f44336, #9b2226)'
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