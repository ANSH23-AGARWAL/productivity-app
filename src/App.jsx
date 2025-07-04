import React from 'react'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import Verification from './components/verification'
import { BrowserRouter,Routes, Route } from "react-router-dom"  
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/verification" element={<Verification />} />
    </Routes>  
    </BrowserRouter> 
      
    
  )
}

export default App