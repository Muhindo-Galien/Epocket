import React, { useEffect } from 'react'
import  { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import Try from './components/Try';
import { getEtheriumContract,getRecieverTxs,getTxs ,isWallectConnected } from './Services';

function App() {
  useEffect(() => {
    const loadData  = async()=>{
      await isWallectConnected()
      await getTxs()
      await getEtheriumContract()
      await getRecieverTxs()
    }
    loadData()
  }, [])
  
 
  return (
    <div className="max-4xl">
        <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<Try />} />
        </Routes>
      <Footer/>

      <Toaster />
    </div>
  );
}

export default App;
