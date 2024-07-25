import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {},
})


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
          <App />
          <Toaster />
      </React.StrictMode>
    </BrowserRouter>,
  </Provider>
)
