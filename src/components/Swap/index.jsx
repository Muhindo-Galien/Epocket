import React from 'react'

const index = () => {
  return (
    <div className='max-w-4xl mx-auto  pt-2 pb-20 '>
      <div className='mx-4 flex justify-center items-center'>
        <div className='flex flex-col  bg-blue-400 shadow-2xl rounded-xl  justify-center w-full sm:w-3/6'>
          <h1 className='m-2 sm:mx-4 text-gray-50 font-medium'>Swap</h1>
          <div className='flex items-center justify-between rounded-tr-lg rounded-tl-lg py-4 shadow-2xl bg-blue-500 pl-2 mx-2 sm:mx-4'>
            <input type="text"
            placeholder='0'
            className='border-none outline-none bg-transparent font-medium text-gray-100 placeholder:text-gray-100 placeholder:text-3xl py-2 text-2xl w-2/5 ms:w-3/5 '
            />
            <button  className='flex justify-center items-center 
            bg-gray-50 px-2 py-1 text-lg rounded-2xl mx-4'>select Token</button>
          </div>
          <div className='flex items-center justify-between rounded-br-lg rounded-bl-lg py-4 bg-blue-500  pl-2 mx-2 sm:mx-4 mb-4'>
            <input type="text"
            placeholder='0'
            className='border-none outline-none bg-transparent font-medium text-gray-100 placeholder:text-gray-100 placeholder:text-3xl py-2 text-2xl w-2/5 ms:w-3/5 '
            />
            <button  className='flex justify-center items-center 
            bg-gray-50 px-2 py-1 text-lg rounded-2xl mx-4'>select Token</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default index