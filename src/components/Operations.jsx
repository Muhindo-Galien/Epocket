import React from 'react'

const Operations = () => {
  return (
    <div className='max-w-4xl mx-auto text-gray-50 pt-2 pb-20 '>
      <div className="mx-4 sm:mx-0 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6  justify-between  items-start">
        <div>
          <h2 className='font-bold text-xl pb-4 top-3 sm:text-left text-center'>Make a tranfer</h2>
          <form action="" className='flex flex-col gap-2 sm:w-4/5'>
            <input type="text" placeholder="Reciever's Name" className='placeholder:text-white bg-transparent border rounded  px-2.5 py-2 text-white outline-none'/>
            <input type="text" placeholder="Reciever's Address" className='placeholder:text-white  bg-transparent border rounded  px-2.5 py-2 text-white outline-none'/>
            <input type="number" placeholder="Number" className='placeholder:text-white bg-transparent border rounded  px-2.5 py-2 text-white outline-none'/>
            <button className='px-2.5 py-2 text-white outline-none rounded bg-gray-50 text-gray-800'>send</button>
          </form>

        </div>
        <div>
          <h2 className='font-bold text-xl pb-4 top-0 sm:text-left text-center'>Your Transaction history</h2>
          <div className='border px-2.5 py-2 rounded'>
            <p className='text-center'> 2 hours ago</p>
            <div className="flex justify-between">
              <h2><span className='font-bold text-base'>From: </span>Me</h2>
              <h2><span className='font-bold text-base'>To: </span> oreoqworiwem</h2>
            </div>
            <div className="flex justify-between">
              <h2><span className='font-bold text-base'>Amount: </span> 20 ETH</h2>
              <h2><span className='font-bold text-base'> Name: </span> Bella</h2>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default Operations