import '../CurrentPollenForecast/CurrentPollenForecast.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CurrentPollenForecastCard from '../CurrentPollenForecastCard/CurrentPollenForecastCard'
import SearchResultCardCurrentForecast from '../SearchResultCurrentForecast/SearchResultCardCurrentForecast'
const { v4: uuidv4 } = require('uuid')

function CurrentPollenForecast() {
    const [currentPollenForecastData, setCurrentPollenForecast] = useState([])
    const [errorMessage, setErrorMessage] = useState(false)
    const [searchStatus, setSearchStatus] = useState(false)
    const [matchingResults, setMatchingResults] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchResultsMessage, setSearchResultsMessage] = useState("")

    function getCurrentPollenForecast() {
        fetch('http://dataservice.accuweather.com/forecasts/v1/daily/1day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&details=true')
            .then(response => {
                if (!response.ok) {
                    throw new Error("We've encountered an unexpected error and were unable to get the current pollen forecast for Highlands Ranch, CO. Please try again later.")
                }
                return response.json()
            })
            .then(data => filterCurrentPollenForecastData(data.DailyForecasts[0].AirAndPollen))
            .then(filteredData => setCurrentPollenForecast(filteredData))
            .catch(error => setErrorMessage(true))
    }

    useEffect(() => {
        getCurrentPollenForecast()
    }, [])

    function filterCurrentPollenForecastData(data) {
        const filteredCurrentPollenForecastData = data.filter(forecast => {
            return forecast.Name !== "UVIndex" && forecast.Name !== "AirQuality"
        })
        return filteredCurrentPollenForecastData
    }

    const currentPollenForecastCards = searchResults.length > 0 ?
        searchResults.map(currentPollenForecast => (
            <CurrentPollenForecastCard
                key={uuidv4()}
                currentPollenForecast={currentPollenForecast}
            />
        ))
        :
        currentPollenForecastData.map(currentPollenForecast => (
            <CurrentPollenForecastCard
                key={uuidv4()}
                currentPollenForecast={currentPollenForecast}
            />
        ))

    function handleSearchClick() {
        const currentPollenForecastSearchResults = currentPollenForecastData.filter(currentPollenForecast => {
            return currentPollenForecast.Category === searchValue
        })
        if (currentPollenForecastSearchResults.length > 0) {
            setSearchResults(currentPollenForecastSearchResults)
            setMatchingResults(true)
            setSearchStatus(true)
            setSearchResultsMessage("")
        }
        else {
            setSearchStatus(true)
            setMatchingResults(false)
            setSearchResultsMessage("No Matches Returned")
        }
    }

    function handleClearSearchResults() {
        setSearchValue("")
        setSearchStatus(false)
        setSearchResults([])
        setSearchResultsMessage("")
    }

    return (
        <div className="current-pollen-forecast">
            <div className="home-page-button-container">
                <button className="home-page-button">
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home Page</Link>
                </button>
            </div>
            <h2>Current Pollen Forecast for Highlands Ranch, Colorado</h2>
            <Link to="/FiveDayPollenForecast" className="five-day-pollen-forecast-link-in-current-pollen-forecast" style={{ textDecoration: 'none' }}>5-Day Pollen Forecast</Link>
            {errorMessage && <p className="error-message">We've encountered an unexpected error and were unable to get the current pollen forecast for Highlands Ranch, CO. Please try again later.</p>}
            <div className="search-container">
                <label>Search By Pollen/Mold Scale Level:</label>
                <select className="drop-down" name="date" value={searchValue} onChange={(event) => setSearchValue(event.target.value)}>
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
            {searchStatus && matchingResults ? <h3>HERE ARE YOUR SEARCH RESULTS:</h3> : null}
            <div className="current-pollen-forecast-cards-wrapper">
                {!searchStatus ? currentPollenForecastCards : null}
                {searchStatus && matchingResults ? searchResults.map(searchResult => {
                        return (
                            <SearchResultCardCurrentForecast
                                key={uuidv4()}
                                searchResult={searchResult}
                            />
                        )
                    }) : null
                }
            </div>
            <p className="pollen-scale-current-forecast"><strong>Pollen/Mold Scale</strong></p>
            <p className="category-scale-low"><strong>Low:</strong> risk of pollen or mold symptoms is low.</p>
            <p className="category-scale-moderate"><strong>Moderate:</strong> risk of pollen or mold symptoms is moderate.</p>
            <p className="category-scale-high"><strong>High:</strong> risk of pollen or mold symptoms is high. Keep your windows closed.</p>
            <p className="category-scale-very-high"><strong>Very High:</strong> risk of pollen or mold symptoms is very high. Avoid outdoor activity in the early hours.</p>
            <p className="category-scale-extreme"><strong>Extreme:</strong> risk of pollen or mold symptoms is extremely high. Avoid outdoor activity.</p>
        </div>
    )
}

export default CurrentPollenForecast