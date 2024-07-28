import accuweather from '../../Images/accuweather-icon.jpg'
import github from '../../Images/github-icon.png'
import linkedin from '../../Images/linkedin-icon.png'
import '../Footer/Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="accuweather-section">
                <p>AccuWeather APIs</p>
                <a href="http://www.accuweather.com">
                    <img className="accuweather" src={accuweather} alt="AccuWeather logo"/>
                </a>
            </div>
            <div className="info-section">
                <p className="name">Kim Ewing</p>
                <div className="icons">
                    <a href="https://github.com/kiewi16">
                        <img className="github" src={github} alt="GitHub logo"/>
                    </a>
                    <a href="https://www.linkedin.com/in/kimberlypekar/">
                        <img className="linkedin" src={linkedin} alt="LinkedIn logo"/>
                    </a>
                </div>
            </div>
            <div className="data-explaination-section">
                <p className="data-explaination">Data explaination</p>
            </div>
        </footer>
    )
}

export default Footer