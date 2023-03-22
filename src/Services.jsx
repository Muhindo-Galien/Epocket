import Web3 from 'web3';
import { getGlobalState, setGlobalState } from './store';
import { toast } from 'react-hot-toast';
import abi from './abis/Epocket.json';
import linkErcAbi from './abis/LinkAbi.json';
import { ethers } from 'ethers';
export const contractAddress = '0x2FC92244bd4B3F35fB19b7b3B93c78cE9A2D2821';

const { ethereum } = window;
window.web3 = new Web3(ethereum);
window.web3 = new Web3(window.web3.currentProvider);

const connectWallet = async () => {
  try {
    if (!ethereum) return console.log('Please install Metamask');
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase());
    window.location.reload();
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

const isWallectConnected = async () => {
  try {
    if (!ethereum) return console.log('Please install Metamask');
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase());
      await isWallectConnected();
      window.location.reload();
    });

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase());
    } else {
      toast.error('Please install Metamask');

      setGlobalState('connectedAccount', '');
    }
    const chainID =  await window.ethereum.request({method: 'eth_chainId'})
    if (chainID == "0xaa36a7" ){
      setGlobalState('currentChain', 'Sepolia');
      setGlobalState('currency', 'SepoliaEther');
      setGlobalState('symbol', 'sEth');
      setGlobalState('explorer', 'https://sepolia.etherscan.io/tx');
    }
    else{
      toast.error('Can only access Sepolia')
      setGlobalState('connectedAccount', '');
    }
  } catch (error) {
    reportError(error);
  }
};

// Contracts 
const ERCContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount');
  const ercTokenAddress = getGlobalState('ercTokenAddress');

  if (connectedAccount) {
    const ercContract = new window.web3.eth.Contract(linkErcAbi.abi, ercTokenAddress)
    setGlobalState('ercContract', await ercContract);
    return ercContract;
  } else {
    return getGlobalState('contract');
  }
};

// ===========================================
const selectToken = async () => {
  try {
  const currentUser = getGlobalState('connectedAccount');
  setGlobalState('ercLoading', true);
  const contract = await ERCContract();
  const name = await contract.methods.name().call();
  const balance = await contract.methods.balanceOf(currentUser).call();
  const symbol = await contract.methods.symbol().call();
  setGlobalState(
    'connectedAccountBalance',
    window.web3.utils.fromWei(balance, 'ether')
  );
  setGlobalState('symbol', symbol);
  setGlobalState('currency', name);
  setGlobalState('tokenChanged', true);
  setGlobalState('ercLoading', false);

  } catch(error) {
    toast.error(error.message)
    setGlobalState('ercLoading', false);
  }
}

const removeToken = async () => {
  const currentChain = getGlobalState('currentChain');
  try {
    if(currentChain == "Sepolia") {
            setGlobalState('currency', 'SepoliaEther');

      setGlobalState('symbol',"sEth")
      }  
    setGlobalState( 'ercTokenAddress', '');
    setGlobalState('showErc', false);
    setGlobalState('tokenChanged', false);
    getUserBalance();
  } catch(error) {
    toast.error(error.message)
  }
}
// ============================================

const getEtheriumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount');
  
  if (connectedAccount) {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(abi.abi, contractAddress);
    setGlobalState('contract', await contract);

    return contract;
  } else {
    return getGlobalState('contract');
  }
};
  // ============================================
  const transferAmount = async () => {
    const sender = getGlobalState('connectedAccount');
    const tokenChanged = getGlobalState('tokenChanged');
    const recipientAddress = getGlobalState('recipientAddress');
    const symbol= getGlobalState('symbol')
    setGlobalState('txLoading',true)
    const amount = getGlobalState('amount');
    const value = window.web3.utils.toWei(amount.toString(), 'ether');
    const contract = await ERCContract();
    const epocketContract = await getEtheriumContract();

    try {
      if(tokenChanged) {
        const tx = await contract.methods.transfer(recipientAddress, value).send({from: sender});
        selectToken();
        setGlobalState('recentTx',{
          txhash: tx.transactionHash,
          from: sender,
          to: recipientAddress,
          amount: amount,
          symbol: symbol
        })
  
        setGlobalState('showRecentTx',true);
        setGlobalState('recipientAddress','');
        setGlobalState('ercTokenAddress','');

  
      } else {
        const tx = await epocketContract.methods
        ._transfer(recipientAddress, symbol)
        .send({ from: sender, value: value });
        
        getUserBalance();
        setGlobalState('showRecentTx',true);

      }
  
      toast.success("Transaction Sucessfull!")
      setGlobalState('amount','');
      setTimeout(function() {
        setGlobalState('showRecentTx',false);
        window.location.reload()
        
      }, 6000);

    } catch (error) {
      toast.error(error.message)
    }
    setGlobalState('txLoading',false);
    
  // =============================================
};
const saveTx = async () => {
  const recentTx = getGlobalState('recentTx');

  setGlobalState('saveTxLoad',true);
  const value = window.web3.utils.toWei(recentTx.amount, 'ether');
  try {
    const contract = await getEtheriumContract()
    await contract.methods.saveTx(recentTx.from, recentTx.to, value, recentTx.symbol).call();    
    toast.success("Transaction Saved Sucessfully!")

  } catch (error) {
    toast.error(error.message)
  }
  
  setGlobalState('showRecentTx',false);
  setGlobalState('saveTxLoad',false);
}

const structuredTxs = (txs) => {
  return txs
    ?.map((tx) => ({
      from: tx.from,
      reciever: tx.reciever.toLowerCase(),
      amount: window.web3.utils.fromWei(tx.amount),
      namOfTheReciever: tx.name,
      timeOfTx: tx.timestamp,
    }))
    .reverse();
};

const getTxs = async () => {
  const sender = getGlobalState('connectedAccount');
  if (!ethereum) console.log('Please install Metamask');
  const allTxs = [];
  const contract = await getEtheriumContract();

  const transactionNumber = await contract.methods
    .transactionCount(sender)
    .call();
  for (let i = 0; i < transactionNumber; i++) {
    const tx = await contract.methods.myTransactions(sender, i + 1).call();
    allTxs.push(tx);
  }
  setGlobalState('myOwnTxs', structuredTxs(allTxs));
};

async function getRecieverTxs() {
  const sender = getGlobalState('connectedAccount');
  if (!ethereum) console.log('Please install Metamask');
  const contract = await getEtheriumContract();
  const txs = await contract.methods.getAllContracTxs().call();
  const allRecieverTxs = [];
  for (let i = 0; i < txs?.length; i++) {
    if (sender === txs[i].reciever.toLowerCase()) {
      allRecieverTxs.push(txs[i]);
    }
  }
  setGlobalState('recieverTxs', structuredTxs(allRecieverTxs));
}

const getUserBalance = async () => {
  const web3 = window.web3;
  const currentUser = getGlobalState('connectedAccount');
  const balance =await web3.eth.getBalance(currentUser)

  setGlobalState(
    'connectedAccountBalance',
    window.web3.utils.fromWei(balance, 'ether')
  );
};


const addRecipient = async () => {
  const recipientName = getGlobalState('recipientName');
  const recipientAddress = getGlobalState('recipientAddress');
  try {
    setGlobalState('participantLoading', true)
    const contact = await getEtheriumContract()
    const tx = await contact.methods.addRecipient(recipientAddress, recipientName).call();
    toast.success("Recipient Saved Sucessfully!")  
    setGlobalState(recipientAddress,'');
    setGlobalState(recipientName,'');    
    setGlobalState('participantLoading',false);    
  } catch (error) {
    toast.error(error.message)
    setGlobalState('participantLoading',false);    
    
  }

  // let nextnum = num + 1;
  // setNum(nextnum);

}
export {
  connectWallet,
  getTxs,
  isWallectConnected,
  getEtheriumContract,
  getRecieverTxs,
  getUserBalance,
  selectToken,
  removeToken,
  transferAmount,
  saveTx,
  addRecipient
}

