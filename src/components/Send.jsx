import React, { useState } from 'react';
import { ThreeDots, TailSpin } from 'react-loader-spinner';
import {
  connectWallet,
  transferAmount,
  removeToken,
  selectToken,
  saveTx,
} from '../Services';
import { BsCoin } from 'react-icons/bs';
import { setGlobalState, truncate, useGlobalState } from '../store';

const Send = () => {
  const [txLoading] = useGlobalState('txLoading');
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [amount] = useGlobalState('amount');
  const [recipientAddress] = useGlobalState('recipientAddress');
  const [ercLoading] = useGlobalState('ercLoading');
  const [symbol] = useGlobalState('symbol');
  const [currency] = useGlobalState('currency');
  const [connectedAccountBalance] = useGlobalState('connectedAccountBalance');
  const [tokenChanged] = useGlobalState('tokenChanged');
  const [ercTokenAddress] = useGlobalState('ercTokenAddress');
  const [showErc] = useGlobalState('showErc');
  const [recentTx] = useGlobalState('recentTx');
  const [explorer] = useGlobalState('explorer');
  const [showRecentTx] = useGlobalState('showRecentTx');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount == '') return;
    await transferAmount();
  };
  return (
    <div>
      <h2 className='font-bold text-xl pb-4 top-3 sm:text-left text-center capitalize'>
        Make a transfer
      </h2>
      <div className='flex flex-col gap-1 md:w-5/6 shadow-md py-2 px-3 rounded'>
        <div className='flex justify-between'>
          <div
            onClick={() => setGlobalState('showErc', !showErc)}
            className='cursor-pointer flex px-4 py-2 my-1 text-center outline-none rounded bg-[#f8a546] text-gray-50 capitalize'
          >
            <BsCoin className='text-2xl mr-2' /> <span>{currency}</span>
          </div>
          <button
            className='bg-gray-800 font-semibold px-2.5 py-2 rounded text-gray-50 my-1'
            disabled
          >
            {Number(connectedAccountBalance).toFixed(2)} {symbol}
          </button>
        </div>
        <div className={`flex w-full ${showErc ? '' : 'hidden'}`}>
          <input
            onChange={(e) => setGlobalState('ercTokenAddress', e.target.value)}
            value={ercTokenAddress}
            type='text'
            required
            placeholder='Past ERC20 Token Address'
            className='w-4/5 placeholder:text-white bg-transparent border rounded  px-2.5 py-2 text-white outline-none'
          />
          {ercLoading ? (
            <div className='ml-2 px-4 py-2 w-1/4  text-center outline-none rounded bg-[#f8a546] text-gray-800 capitalize'>
              <TailSpin height={28} width={28} color='#fff' />
            </div>
          ) : tokenChanged ? (
            <div
              onClick={removeToken}
              className='cursor-pointer ml-2 px-3 py-2 w-2/6 text-white text-center outline-none rounded bg-red-600 capitalize'
            >
              Remove
            </div>
          ) : (
            <div
              onClick={() => selectToken()}
              className='cursor-pointer ml-2 px-4 py-2 w-1/4 text-center outline-none rounded bg-[#f8a546] text-gray-50 capitalize'
            >
              Select
            </div>
          )}
        </div>
        <div className='flex flex-col gap-2 w-full mt-1'>
          <input
            type='text'
            onChange={(e) => setGlobalState('recipientAddress', e.target.value)}
            value={recipientAddress}
            required
            placeholder="Reciever's Address"
            className='placeholder:text-white  bg-transparent border rounded  px-2.5 py-2 text-white outline-none'
          />
          <input
            type='number'
            onChange={(e) => setGlobalState('amount', e.target.value)}
            value={amount}
            required
            min={1}
            placeholder='E.g 2 ETH'
            className='placeholder:text-white bg-transparent border rounded  px-2.5 py-2 text-white outline-none'
          />

          {txLoading ? (
            <button disabled className=' py-2 w-full  flex justify-center outline-none rounded bg-gray-50 text-gray-800 capitalize'>
              <div className="flex justify-center items-center">
                <span className='mr-1'>Sending </span> <ThreeDots height={10} width={28} color='#000' />
              </div>
            </button>
          ) : (
            <button
              className='px-2.5 py-2 text-center outline-none rounded bg-gray-50 text-gray-800 capitalize'
              onClick={handleSubmit}
            >
              send
            </button>
          )}
          {/*======================  */}
          <div
            className={`${showRecentTx ? '' : 'hidden'
              }  rounded bg-opacity-60 border  w-full`}
          >
            <div className='flex w-full items-center justify-center rounded-t-lg'>
            </div>
              <a target={'_blank'} href={`${explorer}/${recentTx.txhash}`}>
                <div className="font-mono w-full rounded-b-lg mb-2 underline text-center cursor-pointer px-2.5 py-2  text-opacity-30">
                  View Tansaction
                </div>
              </a>
          </div>
          {/* ------------- */}
        </div>
      </div>
    </div>
  );
};

export default Send;
