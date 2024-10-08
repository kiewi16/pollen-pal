import './SearchResultCard.css'
import PropTypes from 'prop-types'
const { v4: uuidv4 } = require('uuid')

function SearchResultCard({ searchResult }) {

    const filteredSearchResults = searchResult.AirAndPollen.filter(forecast => {
        return forecast.Name !== "UVIndex" && forecast.Name !== "AirQuality"
    })

    const pElements = filteredSearchResults.map(forecast => {
        return <p className="search-result-forecast-card-p-element" key={uuidv4()}>{forecast.Name}: {forecast.Value} ({forecast.Category})</p>
    })

    return (
        <div className="search-result-pollen-forecast-card">
            <h3>{new Date(searchResult.Date).toLocaleDateString()}</h3>
            {pElements}
        </div>
    )
}

export default SearchResultCard

SearchResultCard.propTypes = {
    searchResult: PropTypes.shape({
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