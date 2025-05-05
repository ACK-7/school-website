import React from 'react'
import Navbar1 from '../Components/Navbar1'
import Statements from '../Components/Statements/Statements'
import Banner from '../Components/Statements/Banner'
import Footer from '../Components/Footer'

const StatementsP = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <Banner />
      <Statements />
      <Footer />
    </div>
  )
}

export default StatementsP
