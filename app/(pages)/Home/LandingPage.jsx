import React from 'react'
import HeroBanner from '../../components//HeroBanner/HeroBanner';
import BestSelling from "../Home/BestSelling"

const LandingPage = () => {
  return (
    <div>
      <HeroBanner/>
      <div>
        <div><BestSelling/></div>
      </div>
    </div>
  )
}

export default LandingPage
