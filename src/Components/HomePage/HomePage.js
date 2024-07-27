import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <main>
            <Link to ="/CurrentPollenForecast" className="current-pollen-forecast-link">Today's Pollen Forecast</Link>
            <Link to ="/FiveDayPollenForecast" className="five-day-pollen-forecast-link">5-Day Pollen Forecast</Link>
            <p>This application is dedicated to my husband, an allergy sufferer, as a thank you for his unwavering support on my journey to becoming a software engineer!</p>
        </main>
    )
}

export default HomePage