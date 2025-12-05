import React from 'react'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import Verification from './components/verification'
import WelcomePage from './components/WelcomePage';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import BoardPage from './components/BoardPage';
import Taskpage from './components/Taskpage';
import SwitchAccount from './components/SwitchAccount';
import ManageAccount from './components/ManageAccount';
import HelpPage from './components/HelpPage';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/task" element={<Taskpage />} />
        <Route path="/switch" element={<SwitchAccount />} />
        <Route path="/manage" element={<ManageAccount />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App