import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { performTransfer } from '../Services'
import { useGlobalState } from '../store'
import Transaction from './Transaction'

const Operations = () => {
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const [reciever, setReciever] = useState('')
  const [started] = useGlobalState('started')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!!!amount || amount == '') return
    await performTransfer(amount,name,reciever)
    
  }

  return (
    <div className='max-w-4xl mx-auto text-gray-50 pt-2 pb-20 '>
      <div className="mx-4 sm:mx-0 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6  justify-between  items-start">
        <div>
          <h2 className='font-bold text-xl pb-4 top-3 sm:text-left text-center'>Make a tranfer</h2>
          <form action="" className='flex flex-col gap-2 sm:w-4/5'>
            <input type="text" 
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Reciever's Name" 
              className='placeholder:text-white bg-transparent border rounded  px-2.5 py-2 text-white outline-none'/>
            <input type="text" 
              onChange={(e) => setReciever(e.target.value)}
              value={reciever}
              required
              placeholder="Reciever's Address" 
              className='placeholder:text-white  bg-transparent border rounded  px-2.5 py-2 text-white outline-none'/>
            <input type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
              min={1}
              placeholder="E.g 2 ETH"
              className='placeholder:text-white bg-transparent border rounded  px-2.5 py-2 text-white outline-none'/>
         
              {
                started?(
                  <button disabled className='px-2.5 py-2 text-white outline-none rounded bg-gray-50 text-gray-800' onClick={handleSubmit}>sending...</button>
                ):(
                  <button  className='px-2.5 py-2 text-white outline-none rounded bg-gray-50 text-gray-800' onClick={handleSubmit}>send</button>
                )
              }
          </form>

        </div>
        <div>
          <h2 className='font-bold text-xl pb-4 top-0 sm:text-left text-center'>Your Transaction history</h2>
          <div className="flex flex-col gap-2">
            <Transaction/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Operations