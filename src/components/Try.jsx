import moment from 'moment'
import React from 'react'
import { connectWallet, getTxs, transfer } from '../Services'
import { truncate, useGlobalState } from '../store'

const Try = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [myOwnTxs] = useGlobalState('myOwnTxs')
  const [recieverTxs] = useGlobalState('recieverTxs')
  console.log("myOwnTxs",myOwnTxs.length);
  console.log("recieverTxs",recieverTxs.length);
  
  return (
    <div>
          <div>
            E-pocket
          </div>
          {connectedAccount ? (
            <div>
              <br />

              <button
                type="button">
                {truncate(connectedAccount, 8, 9, 20)}
              </button>
            </div>
        ) : (
          <button
            type="button"
            
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
        <br />
        <input type="number" placeholder='1 Eth'/>
        <br />
        <button onClick={transfer}> send</button>
        <div>
          
          <h2>Transaction history</h2>
          {myOwnTxs.map((tx,i)=>{
            return(
              <div key={i}>
                <hr />
                <p>{moment(Number(tx.timeOfTx + '000')).fromNow()}</p>
                <p>From: Me</p>
                <p>To: {truncate(tx.reciever, 8, 9, 20)}</p>
                <p>Receiver's name: {tx.namOfTheReciever}</p>
                <p>Amount: {tx.amount}<span>ETH</span></p>
                <hr />
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Try