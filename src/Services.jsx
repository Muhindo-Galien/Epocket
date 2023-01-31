import Web3 from 'web3'
import { getGlobalState, setGlobalState } from './store'
import { toast } from 'react-hot-toast'
import abi from './abis/Epocket.json'
export const contractAddress = '0x51474B65Da25CA89ABBC0362ffD79fF623f2e412'

const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)


const connectWallet = async () => {
  try {
    if (!ethereum) return console.log('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
  } catch (error) {
    console.log(error.message)
  }
}

const isWallectConnected = async () => {
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
const performTransfer = async (amount,name,reciever) => {
  try {
  const sender = getGlobalState('connectedAccount')
  const value = window.web3.utils.toWei(amount, 'ether')
  if (!ethereum) console.log('Please install Metamask')
    const contract = await getEtheriumContract()
    toast.success('Transfer started...')
    setGlobalState('started',true)
    const tx= await contract.methods.transferFund(reciever,name).send({ from: sender, value: value })
    toast.success('Token sent successfully')
    window.location.reload()
    setGlobalState('started',false)
} catch (error) {
  console.log(error);
  setGlobalState('started',false)
  toast.error('Transfer Failed')
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
    const contract = await getEtheriumContract()
   
    const transactionNumber = await contract.methods.transactionCount(sender).call()
    for(let i = 0; i < transactionNumber; i++){
        const tx = await contract.methods.myTransactions(sender,i+1).call()
        allTxs.push(tx)
    }
    setGlobalState('myOwnTxs',structuredTxs(allTxs));  
  }
  
  async function getRecieverTxs(){
    const sender = getGlobalState('connectedAccount')
    if (!ethereum) console.log('Please install Metamask')
    const contract = await getEtheriumContract()
    const txs = await contract.methods.getAllContracTxs().call()
    const allRecieverTxs = []
    for(let i = 0; i < txs?.length; i++){
      if(sender ===  (txs[i].reciever).toLowerCase()){
        allRecieverTxs.push(txs[i]);
        }
  }
      setGlobalState('recieverTxs',structuredTxs(allRecieverTxs))
}

const getUserBalance=async()=>{
  const contract = await getEtheriumContract()
  const userBalance = await contract.methods.getBalanceAccount().call()
  setGlobalState('connectedAccountBalance',window.web3.utils.fromWei(userBalance))
}
export {
  connectWallet,
  getTxs,
  isWallectConnected,
  getEtheriumContract,
  performTransfer,
  getRecieverTxs,
  getUserBalance
}