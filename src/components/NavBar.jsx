import React, { useState } from 'react'
import Identicon from 'react-identicons'
import { Link } from 'react-router-dom'
import { connectWallet } from '../Services'
import { truncate, useGlobalState } from '../store'



const NavBar = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [connectedAccountBalance] = useGlobalState('connectedAccountBalance')

  return (
    <div className=" sm:px-8 bg-blue-500 z-50 mx-auto w-full fixed shadow-sm text-gray-50">
        <div className=' flex items-center justify-between py-4 sm:mx-0 mx-4 '>
          <Link to={'/'}>
            <h1 className='font-black text-3xl'>E-pocket</h1>
          </Link>
          {/* tablet laptop */}
          <div className=''>
            <ul className='sm:flex justify-center gap-4 lg:mx-gap-10 text-gray-50 hidden'>
              <Link to={'/'}>
                <li className='cursor-pointer'>Home</li>
              </Link>
              <Link to={'/about'}>
                <li className='cursor-pointer'>About</li>
              </Link>
              <Link to={'/'}>
                <li className='cursor-pointer'>Feedbacks</li>
              </Link>
            </ul>
          </div>

            <div className='flex gap-4 items-center'>
              {connectedAccount?
               (<div className='flex items-center gap-2'>
                <button className='bg-gray-800 font-semibold  px-3 py-2 rounded text-gray-50 my-1' disabled> {Number(connectedAccountBalance).toFixed(2)} ETH</button>
                 <button disabled type='button' className='hidden sm:block bg-green-50 font-medium  px-3 py-2 rounded text-gray-900 my-1'>
                    {truncate(connectedAccount,5,5,13)}
                </button>
                <Identicon
                string={connectedAccount}
                size={35}
                className="rounded-full bg-gray-50"
                />
               </div> 
               ):(
                  <button type='button' className='bg-green-50 font-medium  px-3 py-2 rounded text-gray-900' onClick={()=>connectWallet()}>
                  Connect Wallet
                </button> 
                )
              }
            </div>
          </div>
        </div>
  )
}

export default NavBar