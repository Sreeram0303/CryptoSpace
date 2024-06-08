import React from 'react'
import Search from './Search'
import Currencyset from './Currencyset'
const Filters = () => {
  return (
    <div className='flex relative h-12 items-center 
    justify-between rounded-lg w-full border-2 border-gray-100'>
      <Search />
      <Currencyset />
    </div>
  )
}

export default Filters