import "../PageNotFound/PageNotFound.css"
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div className="page-not-found">
            <h1>404 Page Not Found</h1>
            <Link to="/" className="link-to-home-page">Return to Home Page</Link>
        </div>
    )
}

export default PageNotFound