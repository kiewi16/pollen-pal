import '../FiveDayPollenForecast/FiveDayPollenForecast.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FiveDayPollenForecastCard from '../FiveDayPollenForecastCard/FiveDayPollenForecastCard'
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import PropTypes from 'prop-types'
const { v4: uuidv4 } = require('uuid')

function FiveDayPollenForecast() {
    const [fiveDayPollenForecastData, setFiveDayPollenForecast] = useState([])
    const [errorMessage, setErrorMessage] = useState(false)
    const [searchStatus, setSearchStatus] = useState(false)
    const [matchingResults, setMatchingResults] = useState(false)
    const [scaleSearchValue, setScaleSearchValue] = useState("")
    const [allergenSearchValue, setAllergenSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchResultsMessage, setSearchResultsMessage] = useState("")

    // function getFiveDayPollenForecast() {
    //     fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&language=en-us&details=true&metric=false')
    //         .then(response => response.json())
    //         .then(data => setFiveDayPollenForecast(data.DailyForecasts))
    //         .catch(error => {
    //             console.error("Error fetching data", error)
    //             setErrorMessage("We've encountered an unexpected error and were unable to get the pollen forecast for Highlands Ranch, CO. Please try again later.")
    //         })
    // }

    function getFiveDayPollenForecast() {
        fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&language=en-us&details=true&metric=false')
            .then(response => {
                if(!response.ok) {
                    throw new Error("We've encountered an unexpected error and were unable to get the pollen forecast for Highlands Ranch, CO. Please try again later.")
                }
                return response.json()
            })
            .then(data => setFiveDayPollenForecast(data.DailyForecasts))
            .catch(error => setErrorMessage(true))
    }

    useEffect(() => {
        getFiveDayPollenForecast()
    }, [])

    const fiveDayPollenForecastCards = fiveDayPollenForecastData.map(fiveDayPollenForecast => (
        <FiveDayPollenForecastCard
            key={uuidv4()}
            fiveDayPollenForecast={fiveDayPollenForecast}
        />
    ))

    function handleSearchClick() {
        let matchingResults = []
        fiveDayPollenForecastData.forEach(fiveDayPollenForecast => {
            fiveDayPollenForecast.AirAndPollen.forEach(pollenData => {
                if (pollenData.Name === allergenSearchValue && pollenData.Category === scaleSearchValue) {
                    matchingResults.push(fiveDayPollenForecast)
                }
            })
        })

        if (matchingResults.length > 0) {
            setSearchResults(matchingResults)
            setMatchingResults(true)
            setSearchStatus(true)
            setSearchResultsMessage("")
        } else {
            setSearchStatus(true)
            setMatchingResults(false)
            setSearchResultsMessage("No Matches Returned")
        }
    }

    function handleClearSearchResults() {
        setAllergenSearchValue("")
        setScaleSearchValue("")
        setSearchStatus(false)
        setSearchResults([])
        setSearchResultsMessage("")
    }

    return (
        <div className="five-day-pollen-forecast">
            <div className="home-page-button-container">
                <button className='home-page-button'>
                    <Link to="/" style={{ textDecoration: 'none' }}>Home Page</Link>
                </button>            
            </div>
            <h2>5-Day Pollen Forecast for Highlands Ranch, Colorado</h2>
            <Link to="/CurrentPollenForecast" className="current-pollen-forecast-link-in-five-day-pollen-forecast" style={{ textDecoration: 'none' }}>Current Pollen Forecast</Link>
            {errorMessage && <p className="error-message">We've encountered an unexpected error and were unable to get the 5-day pollen forecast for Highlands Ranch, CO. Please try again later.</p>}
            <div className="search-container">
                <label><strong>Search By Allergen & Pollen/Mold Scale Level:</strong></label>
                <select className="allergen-drop-down" name="allergen" value={allergenSearchValue} onChange={(event) => setAllergenSearchValue(event.target.value)}>
                    <option value="" disabled selected>select an allergen</option>
                    <option value="Grass">Grass</option>
                    <option value="Mold">Mold</option>
                    <option value="Ragweed">Ragweed</option>
                    <option value="Tree">Tree</option>
                </select>
                <select className="scale-level-drop-down" name="scale-value" value={scaleSearchValue} onChange={(event) => setScaleSearchValue(event.target.value)}>
                    <option value="" disabled selected>select scale level</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                    <option value="Extreme">Extreme</option>
                </select>
                <button className="search-button" onClick={handleSearchClick}>SEARCH</button>
                <button className="clear-search-results-button" onClick={handleClearSearchResults}>CLEAR SEARCH RESULTS</button>
            </div>
            {searchStatus && !matchingResults ? <p className="search-results-error-message">{searchResultsMessage}</p> : null} 
            {searchStatus && matchingResults ? <h3> HERE ARE YOUR SEARCH RESULTS:</h3> : null}
            <div className="five-day-pollen-forecast-cards-wrapper">
                {!searchStatus ? fiveDayPollenForecastCards : null}   
                {searchStatus && matchingResults ? searchResults.map(searchResult => {
                        return (
                            <SearchResultCard
                                key={uuidv4()}
                                searchResult={searchResult}
                            />
                        )
                    }) : null
                }
            </div>
            <p className="pollen-scale"><strong>Pollen/Mold Scale</strong></p>
            <p className="category-scale"><strong>Low:</strong> risk of pollen or mold symptoms is low.</p>
            <p className="category-scale"><strong>Moderate:</strong> risk of pollen or mold symptoms is moderate.</p>
            <p className="category-scale"><strong>High:</strong> risk of pollen or mold symptoms is high. Keep your windows closed.</p>
            <p className="category-scale"><strong>Very High:</strong> risk of pollen or mold symptoms is very high. Avoid outdoor activity in the early hours.</p>
            <p className="category-scale"><strong>Extreme:</strong> risk of pollen or mold symptoms is extremely high. Avoid outdoor activity.</p>
        </div>
    )
}

export default FiveDayPollenForecast

FiveDayPollenForecastCard.propTypes = {
    Date: PropTypes.string.isRequired,
    AirAndPollen: PropTypes.arrayOf(
        PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Value: PropTypes.number.isRequired,
            Category: PropTypes.string.isRequired,
            CategoryValue: PropTypes.number,
        })
    ).isRequired
}