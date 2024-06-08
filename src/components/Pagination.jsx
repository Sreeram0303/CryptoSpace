import React, { useContext } from 'react'
import paginationArrow from '../assets/pagination-arrow.svg'
import { CryptoContext } from '../context/CryptoContext'
import submitIcon from '../assets/submit-icon.svg'
const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if(val !== 0){
      setPerPage(val);
      inputRef.current.value = val;
    } 
      
  }
  return (
    <form action="" className=' font-nunito  relative flex items-center mr-12 
    capitalize' 
    onSubmit={handleSubmit}
    >
      <label htmlFor="perPage"
        className='relative flex justify-center items-center mr-2 font-bold '
      >perPage:</label>
      <input type="numberr" placeholder='10' min={1} max={250} 
      ref={inputRef}
        className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required
      outline-0 border border-transparent focus:border-cyan leading-4' />
      <button type='submit' className='ml-1 cursor-pointer'>
        <img src={submitIcon} alt="submit" className='w-full h-auto' />
      </button>
    </form>
  )
}



const Pagination = () => {
  let { page, setPage, totalPages,perPage,CryptoData } = useContext(CryptoContext);
  const TotalNumber = Math.ceil(totalPages /perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    }
    else {
      setPage(page + 1);
    }
  }
  const prev = () => {
    if (page === 1) {
      return null;
    }
    else {
      setPage(page - 1);
    }
  }
  const multistepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    }
    else {
      setPage(page + 3);
    }
  }
  const multistepPrev = () => {
    if (page - 3 <= 1) {
      setPage(1);
    }
    else {
      setPage(page - 2);
    }
  }

  if(CryptoData && CryptoData.length >= perPage){
    return (
      <div className='flex items-center'>
        <PerPage />
        <ul className='flex items-center justify-end text-sm'>
          <li className='flex items-center'>
            <button onClick={prev} className='outline-0 hover:text-cyan w-8'>
              <img className='w-full h-auto rotate-180 ' src={paginationArrow} alt="left  " />
            </button>
          </li>
          {
            page !== 1 && page !== 2 ?
              <li><button onClick={multistepPrev} className="ouline-0 hover:text-cyan
          rounded-full w-8 h-8 flex items-center justify-center text-lg">...</button></li>
              : null
          }
          {
            page !== 1 ?
              <li> <button onClick={prev} className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"> {page - 1} </button></li>
              : null
          }
          <li><button disabled className="ouline-0 rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5">{page}</button></li>
          {
            page !== TotalNumber && page !== TotalNumber - 1 ?
              <li><button onClick={next} className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5 ">{page + 1} </button> </li>
              : null
          }
          {
            page !== TotalNumber && page !== TotalNumber - 1 ?
              <li><button onClick={multistepNext} className="ouline-0 hover:text-cyan
            rounded-full w-8 h-8 flex items-center justify-center text-lg">...</button></li>
              : null
          }
          {
            page !== TotalNumber ?
              <li><button onClick={() => setPage(TotalNumber)} className="ouline-0 hover:text-cyan  
            rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5" >{TotalNumber}</button></li>
              : null
          }
  
          <li>
            <button onClick={next} className='outline-0 hover:text-cyan w-8'>
              <img className='w-full h-auto' src={paginationArrow} alt="right" />
            </button>
          </li>
        </ul>
      </div>
    )
  }else{
    return null;
  }
}

export default Pagination