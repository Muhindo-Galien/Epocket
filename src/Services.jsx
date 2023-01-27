import Web3 from 'web3'
// import { ethers } from 'ethers'
import { getGlobalState, setGlobalState, useGlobalState } from './store'
import { toast } from 'react-hot-toast'
import abi from './abis/Epocket.json'
export const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const contractABI = abi.abi

const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)


const connectWallet = async () => {
  try {
    if (!ethereum) return console.log('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    window.location.reload()
  } catch (error) {
    console.log(error.message)
  }
}

const isWallectConnected = async () => {
  // console.log('isWallectConnected');
  try {
    if (!ethereum) return console.log('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })
    
    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      await isWallectConnected()
    })
    
    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    } else {
      toast.error('Please install Metamask')
     
      setGlobalState('connectedAccount','')

    }
  } catch (error) {
    reportError(error)
  }
}


const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const web3 = window.web3
      const contract = new web3.eth.Contract(abi.abi, contractAddress)
      setGlobalState('contract',await contract)
  
      return contract
  } else {
    return getGlobalState('contract')
  }
}
const transfer = async () => {
  try {
  const sender = getGlobalState('connectedAccount')
  const value = window.web3.utils.toWei('7', 'ether')
  if (!ethereum) console.log('Please install Metamask')
    const contract = await getEtheriumContract()
    const reciever = '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'
     await contract.methods.transferFund(reciever,"Bella").send({ from: sender, value: value })
} catch (error) {
  console.log(error);
}
}

const structuredTxs=(txs)=>{
  return(
    txs?.map((tx)=>({
      from : tx.from,
      reciever: (tx.reciever).toLowerCase(),
      amount: window.web3.utils.fromWei(tx.amount),
      namOfTheReciever: tx.name,
      timeOfTx:tx.timestamp
    }))
  ).reverse()
}

const getTxs = async () => {
  const sender = getGlobalState('connectedAccount')
  if (!ethereum) console.log('Please install Metamask')
    const allTxs = []
    const allRecieverTxs = []
    const contract = await getEtheriumContract()
   
    const transactionNumber = await contract.methods.transactionCount(sender).call()
    for(let i = 0; i < transactionNumber; i++){
        const tx = await contract.methods.myTransactions(sender,i+1).call()
        console.log(tx);
          if(sender ===  tx.reciever){
            allRecieverTxs.push(tx)
          }
        allTxs.push(tx)
    }
    setGlobalState('recieverTxs',structuredTxs(allRecieverTxs))
    setGlobalState('myOwnTxs',structuredTxs(allTxs));  
}

export {
  connectWallet,
  getTxs,
  isWallectConnected,
  getEtheriumContract,
  transfer
}