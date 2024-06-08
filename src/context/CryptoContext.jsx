import React, { useEffect,createContext,useState } from 'react'


export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
    
    const [CryptoData, setCryptoData] = useState([])
    const [SearchData, setSearchData] = useState()
    const [CoinSearch, setCoinSearch] = useState("")
    const [currency,setCurrency] = useState("usd")
    const [sortby,setSortby] = useState('market_cap_desc')
    const [page,setPage] = useState(1)
    const [perPage,setPerPage] = useState(10)
    const [totalPages,setTotalPages] = useState(250);
    const [coinData,setCoinData] = useState()

    const resetFunction = () => {
        setPage(1);
        setCoinSearch("");

    }

    const getCryptoData = async () => {
        setCryptoData()
        setTotalPages(14724);
        // try {
        //     const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
        //     .then((res)=>res.json())
        //     .then((res)=>res);
        //     console.log(data);
        //     setTotalPages(data.length)
        // } catch (error) {
        //     console.log(error);
        // }



        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortby}&ids=${CoinSearch}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`)
            .then((res)=>res.json())
            .then((res)=>res);
            console.log("CryptoData",data);
            setCryptoData(data);

        } catch (error) {
            console.log(error);
        }
    }

    const getCoinData = async (query) => {
        setCoinData()
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/${query}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`)
            .then((res)=>res.json())
            .then((res)=>res);
            console.log(data);
            setCoinData(data);

        } catch (error) {
            console.log(error);
        }
    }

    const getSearchData = async (query) => {
        setSearchData()
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
            .then((res)=>res.json())
            .then((res)=>res);
            console.log(data.coins);
            setSearchData(data.coins);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCryptoData()
    }, [CoinSearch,currency,sortby,page,perPage])
    
    return (
        <CryptoContext.Provider value={{CryptoData,SearchData,getSearchData,
        setCoinSearch,setSearchData,currency,setCurrency,sortby,setSortby,
        page,setPage,totalPages,resetFunction,setPerPage,perPage,getCoinData,coinData}}  >
            {children}
        </CryptoContext.Provider>
    )
}

