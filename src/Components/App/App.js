import '../App/App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'
import CurrentPollenForecast from '../CurrentPollenForecast/CurrentPollenForecast'
import FiveDayPollenForecast from '../FiveDayPollenForecast/FiveDayPollenForecast'
import Footer from '../Footer/Footer'
import PageNotFound from '../PageNotFound/PageNotFound'

function App() {

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CurrentPollenForecast" element={<CurrentPollenForecast />} />
        <Route path="/FiveDayPollenForecast" element={<FiveDayPollenForecast />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default App