import '../SearchResultCurrentForecast/SearchResultCardCurrentForecast.css'
import PropTypes from 'prop-types'

function SearchResultCardCurrentForecast({ searchResult }) {
    const { Name, Value, Category, } = searchResult

    const gradientStyles = {
        Low: 'linear-gradient(to bottom, white, rgb(144, 238, 144)',
        Moderate: 'linear-gradient(to bottom, #FFFFE0, #FFD700)',
        High: 'linear-gradient(to bottom, #FFFDF5, #ED8F03)',
        VeryHigh: 'linear-gradient(to bottom, #FFD1DC, #FF4500)',
        Extreme: 'linear-gradient(to bottom, #f44336, #9b2226)'
    }

    const gradientStyle = gradientStyles[Category]
    const cardStyle = gradientStyle ? { background: gradientStyle } : {}

    return (
        <div className="search-result-pollen-forecast-card-current-forecast-container">
            <div className="search-result-pollen-forecast-card-current-forecast" style={cardStyle}>
                <h3>{Name}</h3>
                <p className="value">{Value}</p>
                <p className="category">{Category}</p>
            </div>
        </div>

    )
}

export default SearchResultCardCurrentForecast

SearchResultCardCurrentForecast.propTypes = {
    searchResult: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Value: PropTypes.number.isRequired,
        Category: PropTypes.string.isRequired,
    }).isRequired,
}