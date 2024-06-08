import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import Navigaiton from '../components/Navigaiton'
import { CryptoProvider } from '../context/CryptoContext'
import { TrendingProvider } from '../context/TrendingContext'
import { StorageProvider } from '../context/StorageContext'
const Home = () => {
  return (
    <CryptoProvider>

      <TrendingProvider>

        <StorageProvider>

          <main className='w-full h-full flex flex-col 
    items-center relative text-white font-nunito'>
            <div className='w-screen h-screen bg-gray-300 fixed -z-10'>

            </div>
            <Logo />
            <Navigaiton />
            <Outlet />
          </main>

        </StorageProvider>

      </TrendingProvider>


    </CryptoProvider>
  )
}

export default Home