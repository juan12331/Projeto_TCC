import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD
import './index.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
=======
import Login from "./pages/user/login/login.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
>>>>>>> 60f0637d0fa809813c974e9d5acbf7d85af4c515
    <App />
    <Login />
  </React.StrictMode>,
)