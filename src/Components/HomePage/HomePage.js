import '../HomePage/HomePage.css'
import cat from '../../Images/cat-sneezing.png'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <main className="homepage-wrapper">
            <nav className="links-container">
                <Link to="/CurrentPollenForecast" className="current-pollen-forecast-link">Current Pollen Forecast</Link>
                <img className="sneezing-cat" src={cat} alt="sneezing brown cartoon cat"/>
                <Link to="/FiveDayPollenForecast" className="five-day-pollen-forecast-link">5-Day Pollen Forecast</Link>
            </nav>
            <p>This application is dedicated to my husband, an allergy sufferer, as a thank you for his unwavering support on my journey to becoming a software engineer!</p>
        </main>
    )
}

export default HomePage