import React, { useState } from 'react';
import { connectWallet, performTransfer } from '../Services';
import { useGlobalState } from '../store';
import Recipient from './Recipient';
import Send from './Send';
import Transaction from './Transaction';

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


  const txs = [
    {
      name: 'Recipient',
      displayeSet: function () {
        setRoute('Recipient')
      },
    },
    {
      name: 'Sent Tx',
      displayeSet: function () {
        setData(myOwnTxs);
        setSent(true);
        setRoute('Sent Tx')
      },
    },
    {
      name: 'Recieved Tx',
      displayeSet: function () {
        setData(recieverTxs);
        setSent(false);
        setRoute('Recieved Tx')
      },
    },
  ];

  return (
    <div className='max-w-4xl mx-auto text-gray-50 pt-2 pb-20 '>
      <div className='mx-4 sm:mx-6 lg:mx-0 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6  justify-between  items-start'>
        <Send/>
        <div>
          <h2 className='font-bold text-xl pb-4 top-0 sm:text-left text-center capitalize'>
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
              } else if ((route == 'Sent Tx')) {
                return (
                  loaded ? (
                    <Transaction data={data} sent={sent}/>
                  ):null);
              } else if ((route == 'Recieved Tx')) {
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
