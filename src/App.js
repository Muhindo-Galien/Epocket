import React, { useEffect, useState } from 'react'
import  { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Announcement from './components/Announcement';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import {getRecieverTxs,getTxs ,getUserBalance,isWallectConnected } from './Services';

function App() {
  const [loaded,setLoaded]=useState(false)
  useEffect(() => {
    const loadData  = async()=>{
      await isWallectConnected()
      await getTxs()
      await getUserBalance()
      await getRecieverTxs()
      setLoaded(true)
    }
    loadData()
  }, [])
  
 
  return (
    <div className="max-4xl">
        <NavBar/>
        {loaded?
        <Routes>
          <Route path="/" element={<LandingPage loaded={loaded}/>} />
        </Routes>
        :(
          <Announcement/>
        )}
      <Footer/>

      <Toaster />
    </div>
  );
}

export default App;
