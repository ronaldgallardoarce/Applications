import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux-toolkit/store/store.js'

axios.defaults.baseURL = 'http://localhost:3001/api'
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
