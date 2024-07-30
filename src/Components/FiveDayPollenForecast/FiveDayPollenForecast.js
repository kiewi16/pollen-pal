import '../FiveDayPollenForecast/FiveDayPollenForecast.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FiveDayPollenForecastCard from '../FiveDayPollenForecastCard/FiveDayPollenForecastCard'

function FiveDayPollenForecast() {
    const [fiveDayPollenForecastData, setFiveDayPollenForecast] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [categorySearchValue, setCategorySearchValue] = useState("")
    const [allergenSearchValue, setAllergenSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState("")
    const [searchResultsMessage, setSearchResultsMessage] = useState("")

    function getFiveDayPollenForecast() {
        fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&language=en-us&details=true&metric=false')
            .then(response => response.json())
            .then(data => setFiveDayPollenForecast(data.DailyForecasts))
            .catch(error => setErrorMessage(error.message))
    }

    useEffect(() => {
        getFiveDayPollenForecast()
    }, [])

    const fiveDayPollenForecastCards = searchResults.length > 0 ?
        searchResults.map(fiveDayPollenForecast => {
            return (
                <FiveDayPollenForecastCard
                    key={fiveDayPollenForecast.Date}
                    fiveDayPollenForecast={fiveDayPollenForecast}
                />
            )
        })
        :
        fiveDayPollenForecastData.map(fiveDayPollenForecast => (
            <FiveDayPollenForecastCard
                key={fiveDayPollenForecast.Date}
                fiveDayPollenForecast={fiveDayPollenForecast}
            />
        ))

    function handleSearchClick() {
        let matchingResults = []
        fiveDayPollenForecastData.forEach(fiveDayPollenForecast => {
            fiveDayPollenForecast.AirAndPollen.forEach(pollenData => {
                if (pollenData.Name === allergenSearchValue && pollenData.Category === categorySearchValue) {
                    matchingResults.push(fiveDayPollenForecast)
                }
            })
        })

        if (matchingResults.length > 0) {
            setSearchResults(matchingResults)
            setSearchResultsMessage("")
        } else {
            setSearchResultsMessage("No Matches Returned")
        }
    }

    function handleClearSearchResults() {
        setCategorySearchValue("")
        setAllergenSearchValue("")
        setSearchResults("")
        setSearchResultsMessage("")
    }

    return (
        <div className="five-day-pollen-forecast">
            <h2>5-Day Pollen Forecast for Highlands Ranch, Colorado</h2>
            <Link to="/CurrentPollenForecast" className="current-pollen-forecast-link-in-five-day-pollen-forecast">Current Pollen Forecast</Link>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="search-container">
                <label>Search By Allergen & Pollen/Mold Scale Level:</label>
                <select className="drop-down" name="date" value={allergenSearchValue} onChange={(event) => setAllergenSearchValue(event.target.value)}>
                    <option value="" disabled selected>select an allergen</option>
                    <option value="Grass">Grass</option>
                    <option value="Mold">Mold</option>
                    <option value="Ragweed">Ragweed</option>
                    <option value="Tree">Tree</option>
                </select>
                <select className="drop-down" name="date" value={categorySearchValue} onChange={(event) => setCategorySearchValue(event.target.value)}>
                    <option value="" disabled selected>select scale level</option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                    <option value="Extreme">Extreme</option>
                </select>
                <button className="search-button" onClick={handleSearchClick}>SEARCH</button>
                <button className="clear-search-results" onClick={handleClearSearchResults}>CLEAR SEARCH RESULTS</button>
                {searchResultsMessage && <p className="search-results-error-message">{searchResultsMessage}</p>}
            </div>
            <div className="five-day-pollen-forecast-cards-wrapper">
                {fiveDayPollenForecastCards}
            </div>
            <p className="pollen-scale"><strong>Pollen/Mold Scale</strong></p>
            <p className="low"><strong>Low:</strong> risk of pollen or mold symptoms is low.</p>
            <p className="moderate"><strong>Moderate:</strong> risk of pollen or mold symptoms is moderate.</p>
            <p className="high"><strong>High:</strong> risk of pollen or mold symptoms is high. Keep your windows closed.</p>
            <p className="very-high"><strong>Very High:</strong> risk of pollen or mold symptoms is very high. Avoid outdoor activity in the early hours.</p>
            <p className="extreme"><strong>Extreme:</strong> risk of pollen or mold symptoms is extremely high. Avoid outdoor activity.</p>
        </div>
    )
}

export default FiveDayPollenForecast