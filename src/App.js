import React, { useEffect } from 'react'
import  { Toaster } from 'react-hot-toast';

import './App.css';
import Try from './components/Try';
import { getEtheriumContract,getTxs ,isWallectConnected } from './Services';

function App() {
  useEffect(() => {
    const loadData  = async()=>{
      await isWallectConnected()
      await getEtheriumContract()
      await getTxs()
    }
    loadData()
  }, [])
  
 
  return (
    <div className="App">
      <br/>
      
      <br/>
      <br/>
      <br/>
      <Try/>

      <Toaster />
    </div>
  );
}

export default App;
