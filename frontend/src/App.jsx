import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'

function App() {

  return (
    
    <div className="App flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </div>
  )
}

export default App
