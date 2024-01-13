import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Signup from './components/Signup'

import {BrowserRouter, Routes, Route ,  Navigate} from 'react-router-dom'
import Portfolio from './components/Portfolio'
import Login from './components/Login'

function App() {
  


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path='/' element={<Portfolio/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
           
            {/* <Route path='/logins' element={<Logins/>} ></Route>
            <Route path="*" element={<Navigate to="/errorpage" />} />
            <Route path="/errorpage" element={<ErrorPage />} />  */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
