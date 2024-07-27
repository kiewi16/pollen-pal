import github from '../../Images/github-icon.png'
import linkedin from '../../Images/linkedin-icon.png'
import '../Footer/Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <h2 className="created-by">Created By:</h2>
            <div className="info-section">
                <p className='name'>Kim Ewing</p>
                <a href='https://github.com/kiewi16'>
                    <img className='github' src={github} alt='GitHub-logo' />
                </a>
                <a href='https://www.linkedin.com/in/kimberlypekar/'>
                    <img className='linkedin' src={linkedin} alt='LinkedIn-Logo' />
                </a>
            </div>
        </footer>
    )
}

export default Footer