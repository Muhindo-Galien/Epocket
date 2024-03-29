import React from 'react';
import Identicon from 'react-identicons';
import { Link } from 'react-router-dom';
import { connectWallet } from '../Services';
import { truncate, useGlobalState } from '../store';
import { FaEthereum } from 'react-icons/fa';

const NavBar = () => {
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [connectedAccountBalance] = useGlobalState('connectedAccountBalance');
  const [currentChain] = useGlobalState('currentChain');

  return (
    <div className=' sm:px-8 bg-blue-500 z-50 mx-auto w-full fixed shadow-sm text-gray-50'>
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
          {connectedAccount ? (
            <div className='flex items-center gap-2'>
              { currentChain?
                (
                  <div className='flex gap-1 items-center bg-blue-500 shadow-lg px-3 py-2 rounded-full'>
                  <FaEthereum className='text-2xl bg-blue-400  rounded-full p-0.5'/> <span className="font-normal">{currentChain} </span> 
                  </div>
                  ): null
              }
              <button
                disabled
                type='button'
                className='hidden sm:block bg-green-50 font-medium  px-3 py-2 rounded text-gray-900 my-1'
              >
                {truncate(connectedAccount, 5, 5, 13)}
              </button>
              <Identicon
                string={connectedAccount}
                size={35}
                className='rounded-full bg-gray-50'
              />
            </div>
          ) : (
            <button
              type='button'
              className='bg-green-50 font-medium  px-3 py-2 text-gray-900 rounded'
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
