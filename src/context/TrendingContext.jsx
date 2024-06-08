import React, { useEffect, createContext, useState } from 'react'


export const TrendingContext = createContext();

export const TrendingProvider = ({ children }) => {

    const [trendData, setTrendData] = useState([])

    const resetTrending = () => {
        getTrendData();
    }
    const getTrendData = async () => {

        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
                .then((res) => res.json())
                .then((res) => res);
            console.log("trend_data",data);
            setTrendData(data.coins)
        } catch (error) {
            console.log(error);
        }



    }

    useEffect(() => {
        getTrendData()
    }, [])

    return (
        <TrendingContext.Provider value={{
            trendData,
            resetTrending
        }}>
            {children}

        </TrendingContext.Provider>
    )
}

