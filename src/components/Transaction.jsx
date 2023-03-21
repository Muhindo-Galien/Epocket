import moment from 'moment'
import React from 'react'
import { truncate} from '../store'

const Transaction = ({data,sent}) => {
  return (
    <>
     {data.length <=0?(
      <p className='text-lg font-semibold text-center 10'>
       {sent?('No sent tx found!'):('No recieved tx found!')} 
      </p>
  ):(
    data.map((tx,i)=>{
      return(

        <div className='border px-2.5 py-2 rounded' key={i}>
          <p className='text-center'> {moment(Number(tx.timeOfTx + '000')).fromNow()}</p>
          <div className="flex justify-between">
            {sent?(
              <>
                <h2><span className='font-bold text-base'>From: </span>Me</h2>
                <h2><span className='font-bold text-base'>To: </span> {truncate(tx.reciever, 6, 6, 15)}</h2>
              </>
            ):(
              <>
                <h2><span className='font-bold text-base'>From: </span> {truncate(tx.reciever, 6, 6, 15)}</h2>
                <h2><span className='font-bold text-base'>To: </span>Me</h2>
              </>
            )}
          </div>
          <div className="flex justify-between">
            <h2><span className='font-bold text-base'>Amount: </span> {tx.amount} <span className='font-bold text-base'>ETH</span></h2>
            <h2><span className='font-bold text-base'> Name: </span> {tx.namOfTheReciever}</h2>
          </div>
      </div>
      )
      })
    // =====
      
    )}
    </>
    )
}

export default Transaction