import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/public/LandingPage/LandingPage';
import Packages from './pages/public/Packages/Packages'
import CustomerSignup from './pages/auth/CustomerSignup/CutomerSignup';
import Login from './pages/auth/Login/Login';
import AgentSignup from './pages/auth/AgentSignup/AgentSignup';
import AdminRoutes from './Routes/AdminRoutes';
import AgentRoutes from './Routes/AgentRoutes';
import UserRoutes from './Routes/UserRoutes';
import AgentLayout from './Layouts/AgentLayout';
import Agent_DashBoard from './pages/Agent/agent_DashBoard/Agents_DashBoard';
import AddPackage from './pages/Agent/AddPackages/AddPackages';
import AdminLogin from './pages/auth/AdminLogin/AdminLogin';
import ForgotPassword from './pages/auth/ForgetPassword/ForgetPassword';
import AboutUs from './pages/public/AboutUs/AboutUs';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/customer-signup' element={<CustomerSignup />} />
        <Route path='/agent-signup' element={<AgentSignup />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/packages' element={<Packages />} />
        <Route path='/aboutus' element={<AboutUs />} />

        {/* AdminRoute */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* user Route */}
        <Route path="/user/*" element={<UserRoutes />} />

        {/* Agent Routes */}
        <Route path="/agent/*" element={<AgentRoutes />} />
      </Routes>

      <Login />
    </>
  )
}

export default App
