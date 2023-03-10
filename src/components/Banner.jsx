import React from 'react'
import fanacial from '../assets/fanacial.png'

const Banner = () => {
  return (
    <div className='pt-20 ms:pt-20 max-w-4xl mx-auto text-gray-50 '>
      <div className="mx-4 sm:mx-6 lg:mx-0">

          <div className='flex flex-col sm:flex-row  items-center justify-between gap-4'>
            <div className='text-center sm:text-left w-full sm:w-4/5'>
              <h1 className='font-bold text-4xl lg:text-5xl pb-4'>We make it easier</h1>
              <h4 className='text-base sm:text-lg font-bold sm:font-bold  '>Send tokens Using our E-pocket</h4>
              <p className='text-sm sm:text-base'>
              A digital wallet that allows users to send, & receive cryptocurrency & other digital assets on the decentralized web.
              </p>
              <div className='flex gap-4 my-4 justify-center sm:justify-start'>
                <button className='px-4 py-2 rounded cursor-pointer bg-gray-900 text-white'>Get started</button>
                {/* <button className='bg-gray-50 text-gray-900 px-4 py-2 rounded cursor-pointer'>Get started</button> */}
              </div>
            </div>
            <img className='h-80 order-first sm:order-last' src={fanacial} alt="fanacial-wallet" />

          </div>
          <div>
            <div>

            </div>
          </div>
      </div>
    </div>
  )
}

export default Banner