import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { addRecipient } from '../Services';
import { setGlobalState, useGlobalState } from '../store';

const Recipient = () => {
  const [recipientAddress] = useGlobalState('recipientAddress');
  const [recipientName] = useGlobalState('recipientName');
  const [participantLoading] = useGlobalState('participantLoading');
  

  // const addRec = async (e) => {
  //   e.preventDefault();
  //   await addRecipient()
  // };
  return (
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
        type='text'
        onChange={(e) => setGlobalState('recipientName', e.target.value)}
        value={recipientName}
        required
        min={1}
        placeholder="Reciever's Name"
        className='placeholder:text-white bg-transparent border rounded  px-2.5 py-2 text-white outline-none'
      />
      {participantLoading ? (
        <button
          disabled
          className=' py-2 w-full  flex justify-center outline-none rounded bg-gray-50 text-gray-800 capitalize'
        >
          <div className='flex justify-center items-center'>
            <span className='mr-1'>Sending </span>{' '}
            <ThreeDots height={10} width={28} color='#000' />
          </div>
        </button>
      ) : (
        <button
          className='px-2.5 py-2 text-center outline-none rounded bg-gray-50 text-gray-800 capitalize'
          onClick={addRecipient}
        >
          Add recipent
        </button>
      )}
    </div>
  );
};

export default Recipient;
