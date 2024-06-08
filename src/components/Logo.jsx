import React from 'react'
import logoSvg from '../assets/logo.svg'
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
    <div>
        <Link to="/" className='absolute top-[1.5rem] left-[1.5rem]
        [text-decoration:none] text-lg text-cyan flex items-center '>
        <img src={logoSvg} alt="CryptoSpace" />
        </Link>
    </div>
  )
}

export default Logo