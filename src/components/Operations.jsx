import React, { useState } from 'react';
import { useGlobalState } from '../store';
import Send from './Send';
import Transaction from './Transaction';

const Operations = ({ loaded }) => {
  const [myOwnTxs] = useGlobalState('myOwnTxs');
  const [recieverTxs] = useGlobalState('recieverTxs');
  const [data, setData] = useState(myOwnTxs);
  const [active, setActive] = useState(1);
  const [sent, setSent] = useState(true);


  const txs = [
    {
      name:'Sent',
      display:function(){
        setData(myOwnTxs)
        setSent(true)
      },

    },
    {
      name:'Recieved',
      display:function(){
        setData(recieverTxs)
        setSent(false)
      },
    }
  ]
 
  return (
    <div className='max-w-4xl mx-auto text-gray-50 pt-2 pb-20 '>
      <div className='mx-4 sm:mx-6 lg:mx-0 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6  justify-between  items-start'>
        <Send/>
        <div>
          <h2 className='font-bold text-xl pb-4 top-0 sm:text-left text-center capitalize'>
            Your Transaction history
          </h2>
          <div className='flex gap-2 sm:justify-start justify-center items-center pb-4'>
          {txs.map((item,i)=>{
              return(
                <button 
                key={i+1} 
                className={`px-4 py-2 rounded cursor-pointer ${active === i+1?'bg-gray-900 text-gray-50':'bg-gray-50 text-gray-800'} `}
                onClick={()=>{setActive(i+1); item.display()}}>{item.name}</button>
              )
            })}
          </div>
          <div className='flex flex-col gap-2'>
          {loaded ? (
              <Transaction data={data&&data} sent={sent}/>
            ):null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
