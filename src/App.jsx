import React from 'react'
import { HashRouter as Router,Routes,Route } from 'react-router-dom'
import Index from './Pages/Index'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import About from './Pages/About';
import Administration from './Pages/AdministrationP';
import Statements from './Pages/StatementsP';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} caseSensitive={false} />
        <Route path="/administration" element={<Administration />} caseSensitive={false} />
        <Route path="/mission-vision" element={<Statements />} caseSensitive={false} />
      </Routes>
    </Router>
  )
}

export default App
