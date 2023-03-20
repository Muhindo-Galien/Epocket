import React, { useState } from 'react';
import { connectWallet, performTransfer } from '../Services';
import { useGlobalState } from '../store';
import Recipient from './Recipient';
import Transaction from './Transaction';
import Tx from './Tx';

const Operations = ({ loaded }) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [reciever, setReciever] = useState('');
  const [started] = useGlobalState('started');
  const [myOwnTxs] = useGlobalState('myOwnTxs');
  const [recieverTxs] = useGlobalState('recieverTxs');
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [data, setData] = useState('');
  const [active, setActive] = useState(1);
  const [sent, setSent] = useState(true);
  const [route, setRoute] = useState('Recipient');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!!!amount || amount == '') return;
    await performTransfer(amount, name, reciever);
  };
  const txs = [
    {
      name: 'Recipient',
      displayeSet: function () {
        setRoute('Recipient')
      },
    },
    {
      name: 'Sent',
      displayeSet: function () {
        setData(myOwnTxs);
        setSent(true);
        setRoute('Sent')
      },
    },
    {
      name: 'Recieved',
      displayeSet: function () {
        setData(recieverTxs);
        setSent(false);
        setRoute('Recieved')
      },
    },
  ];

  return (
    <div className='max-w-4xl mx-auto text-gray-50 pt-2 pb-20 '>
      <div className='mx-4 sm:mx-6 lg:mx-0 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6  justify-between  items-start'>
        <div>
          <h2 className='font-bold text-xl pb-4 top-3 sm:text-left text-center'>
            Make a tranfer
          </h2>
          <form action='' className='flex flex-col gap-2 sm:w-4/5'>
            <input
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Reciever's Name"
              className='placeholder:text-white bg-transparent border rounded  px-2.5 py-2 text-white outline-none'
            />
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
          </form>
        </div>
        <div>
          <h2 className='font-bold text-xl pb-4 top-0 sm:text-left text-center'>
            Your Transaction history
          </h2>
          <div className='flex gap-2 sm:justify-start justify-center items-center pb-4'>
            {txs.map((item, i) => {
              return (
                <button
                  key={i + 1}
                  className={`px-4 py-2 rounded cursor-pointer ${
                    active === i + 1
                      ? 'bg-gray-900 text-gray-50'
                      : 'bg-gray-50 text-gray-800'
                  } `}
                  onClick={() => {
                    setActive(i + 1);
                    item.displayeSet()
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className='flex flex-col gap-2'>
            {(() => {
              if (route == 'Recipient') {
                return <Recipient />;
              } else if ((route == 'Sent')) {
                return (
                  loaded ? (
                    <Transaction data={data} sent={sent}/>
                  ):null);
              } else if ((route == 'Recieved')) {
                return (
                  loaded ? (
                    <Transaction data={data} sent={sent}/>
                  ):null);
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
