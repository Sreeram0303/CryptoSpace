import React, { useContext } from 'react'
import searchSVG from '../assets/search-icon.svg'
import { CryptoContext } from '../context/CryptoContext';
import debounce from 'lodash.debounce';
const SearchInput = ({ handleSearch }) => {
    const [searchText, setSearchText] = React.useState("");

    let { SearchData,setSearchData,setCoinSearch } = useContext(CryptoContext);

    const handleInput = (e) => {
        e.preventDefault();
        let query = e.target.value;
        setSearchText(query);
        handleSearch(query);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchText);
    }

    const selectCoin = (coin) => {
        setCoinSearch(coin);
        setSearchText('');
        setSearchData();
    }

    return (
        <>
            <form onSubmit={handleSubmit}
            className='flex items-center w-96 relative ml-7 font-nunito'>
                <input onChange={handleInput}
                    value={searchText}
                    className='w-full rounded bg-gray-200 placeholder:px-2 placeholder:text-gray-100 outline-0
        border border-transparent focus:border-cyan required'
                    type="text" name='search' placeholder='search here..' />
                <button type='submit'
                    className='cursor-pointer absolute right-1'>
                    <img src={searchSVG} alt="" />
                </button>
            </form>
            {
                searchText.length > 0 ?
                    (<ul className='absolute top-11 right-0 w-96 h-96 rounded 
        overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin
         scrollbar-thumb-gray-100 scrollbar-track-gray-200  '>
                        {
                            SearchData ?
                                SearchData.map((coin) => {
                                    return (
                                        <li onClick={()=>selectCoin(coin.id)} 
                                        key={coin.id} className='flex items-center  ml-4 
                                    my-2 cursor-pointer hover:bg-gray-300'>
                                            <img src={coin.thumb} className='w-[1rem] h-[1] mx-1.5'
                                                alt={coin.name} />
                                            <span>{coin.name}</span>
                                        </li>
                                    )
                                })
                                : (<div className='flex w-full h-full justify-center items-center'>
                                <div role='status' className='w-8 h-8 border-4 border-cyan animate-spin rounded-full border-b-gray-200'>
                                </div>
                                <span className='ml-2'>Searching</span>
                            </div>)
                    
                        }
                    </ul>)
                    : null
            }
        </>
    )
}

const Search = () => {

    let { getSearchData } = useContext(CryptoContext);

    const debounceFunc = debounce(function (val) {
        getSearchData(val);
    }, 2000)

    return (
        <>
            <div className='relative'>
                <SearchInput handleSearch={debounceFunc} />
            </div>
        </>
    )
}

export default Search