import React from 'react'
import Banner from './Banner'
import Operations from './Operations'

const LandingPage = ({loaded}) => {
  return (
    <div >
      <Banner/>
      <Operations loaded={loaded}/>
      
    </div>
  )
}

export default LandingPage