import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import OpenRoute from './components/core/Auth/OpenRoute'
import Signup from './pages/Signup'

function App() {

  return (
    
    <div className="App flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App
