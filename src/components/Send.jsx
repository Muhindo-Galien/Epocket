import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { connectWallet, performTransfer, removeToken, selectToken } from '../Services';
import { BsCoin } from 'react-icons/bs';
import { setGlobalState, useGlobalState } from '../store';

const Send = () => {
  const [amount, setAmount] = useState('');
  const [reciever, setReciever] = useState('');
  const [started] = useGlobalState('started');
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [ercLoading] = useGlobalState('ercLoading');
  const [symbol] = useGlobalState('symbol');
  const [currency] = useGlobalState('currency');
  const [connectedAccountBalance] = useGlobalState('connectedAccountBalance');
  const [tokenChanged] = useGlobalState('tokenChanged');
  const [ercTokenAddress] = useGlobalState('ercTokenAddress');
  const [showErc] = useGlobalState('showErc');

  console.log(ercTokenAddress);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount == '') return;
    await performTransfer(amount, reciever);
  };
  return (
    <div>
          <h2 className='font-bold text-xl pb-4 top-3 sm:text-left text-center capitalize'>
            Make a transfer
          </h2>
               <form action='' className='flex flex-col gap-1 md:w-5/6 shadow-md py-2 px-3 rounded'>
                <div className='flex justify-between'>
                    <div 
                    onClick={()=> setGlobalState('showErc', !showErc)}
                    className="cursor-pointer flex px-4 py-2 my-1 text-center outline-none rounded bg-[#f8a546] text-gray-50 capitalize">
                        <BsCoin className='text-2xl mr-2'/> <span>{currency}</span>
                      </div>
                    <button
                      className='bg-gray-800 font-semibold px-2.5 py-2 rounded text-gray-50 my-1'
                      disabled
                      >
                      {Number(connectedAccountBalance).toFixed(2)} {symbol}
                    </button>
                </div>
                <div className={`flex w-full ${showErc?'':'hidden'}`}>
                  <input
                    onChange={(e)=>setGlobalState('ercTokenAddress',e.target.value)}
                    value= {ercTokenAddress}
                    type='text'
                    required
                    placeholder="Past ERC20 Token Address"
                    className='w-4/5 placeholder:text-white bg-transparent border rounded  px-2.5 py-2 text-white outline-none'
                    />
                  {ercLoading?(
                    <div className="ml-2 px-4 py-2 w-1/4  text-center outline-none rounded bg-[#f8a546] text-gray-800 capitalize">
                      <TailSpin
                      height={28}
                      width={28}
                      color="#fff"
                    />
                    </div>
                  ):(
                    tokenChanged?(
                      <div 
                      onClick={removeToken} 
                      className="cursor-pointer ml-2 px-3 py-2 w-2/6 text-white text-center outline-none rounded bg-red-600 capitalize">
                        Remove
                      </div>
                      
                      ):(
                        <div 
                        onClick={() => selectToken()}
                        className="cursor-pointer ml-2 px-4 py-2 w-1/4 text-center outline-none rounded bg-[#f8a546] text-gray-50 capitalize">
                        Select
                      </div>
                  )
                  )}
               </div>
              <div action='' className='flex flex-col gap-2 w-full mt-1'>
            
                <input
                  type='text'
                  onChange={(e) => setReciever(e.target.value)}
                  value={reciever}
                  required
                  placeholder="Reciever's Address"
                  className='placeholder:text-white  bg-transparent border rounded  px-2.5 py-2 text-white outline-none'
                />
                <input
                  type='number'
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  required
                  min={1}
                  placeholder='E.g 2 ETH'
                  className='placeholder:text-white bg-transparent border rounded  px-2.5 py-2 text-white outline-none'
                />
              
                {connectedAccount ? (
                  started ? (
                    <button
                      disabled
                      className='px-2.5 py-2 outline-none rounded bg-gray-50 text-gray-800 capitalize'
                      onClick={handleSubmit}
                    >
                      sending...
                    </button>
                  ) : (
                    <button
                      className='px-2.5 py-2 outline-none rounded bg-gray-50 text-gray-800 capitalize'
                      onClick={handleSubmit}
                    >
                      send
                    </button>
                  )
                ) : (
                  <button
                    className='px-2.5 py-2 outline-none rounded bg-gray-50 text-gray-800 capitalize'
                    onClick={() => connectWallet()}
                  >
                    connect your Wallet
                  </button>
                )}
              </div>
              </form>
        </div>
  )
}

export default Send