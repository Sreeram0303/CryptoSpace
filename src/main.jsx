import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Home, Crypto, Trending, Saved} from './pages'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CryptoDetails from './components/CryptoDetails.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children:[
      {
        path: '/',
        element:< Crypto/>,
        children:[
          {
            path:':coinId',
            element:<CryptoDetails/>
          }
        ]
      },
      {
        path: '/trending',
        element:< Trending/>,
        children: [
          {
            path:":coinId",
            element: <CryptoDetails />
          }
        ]
      },
      {
        path: '/saved',
        element:< Saved/>,
        children:[
          {
            path:':coinId',
            element:<CryptoDetails/>
          }
        ]
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
