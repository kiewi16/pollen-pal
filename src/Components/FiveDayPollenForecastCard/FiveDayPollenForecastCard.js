import '../FiveDayPollenForecastCard/FiveDayPollenForecastCard.css'
import PropTypes from 'prop-types'
const { v4: uuidv4 } = require('uuid')

function FiveDayPollenForecastCard({ fiveDayPollenForecast }) {

    const filteredFiveDayPollenForecast = fiveDayPollenForecast.AirAndPollen.filter(forecast => {
        return forecast.Name !== "UVIndex" && forecast.Name !== "AirQuality"
    })

    const pElements = filteredFiveDayPollenForecast.map(forecast => {
        return <p className="five-day-pollen-forecast-card-p-element" key={uuidv4()}>{forecast.Name}: {forecast.Value} ({forecast.Category})</p>
    })

    return (
        <div className="five-day-pollen-forecast-card">
            <h3>{new Date(fiveDayPollenForecast.Date).toLocaleDateString()}</h3>
            {pElements}
        </div>
    )
}

export default FiveDayPollenForecastCard

FiveDayPollenForecastCard.propTypes = {
    fiveDayPollenForecast: PropTypes.shape({      
        AirAndPollen: PropTypes.arrayOf(
            PropTypes.shape({
                Name: PropTypes.string.isRequired,
                Value: PropTypes.number.isRequired,
                Category: PropTypes.string.isRequired,
            })
        ).isRequired,
        Date: PropTypes.string.isRequired,
    })
}