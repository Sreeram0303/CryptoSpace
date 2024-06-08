import React, { useEffect, createContext, useState,useContext } from 'react'
import { CryptoContext } from './CryptoContext';

export const StorageContext = createContext();

export const StorageProvider = ({ children }) => {

    const [allCoins, setAllCoins] = useState([])
    const [savedData,setSavedData] = useState();
    const { currency, sortby} = useContext(CryptoContext);

    const saveCoin = (coinId) => {
        let oldCoin = JSON.parse(localStorage.getItem('coins'));

        if (oldCoin.includes(coinId)) {
            return null;
        }
        else {
            let newCoin = [...oldCoin, coinId];
            setAllCoins(newCoin);
            localStorage.setItem('coins', JSON.stringify(newCoin));
        }

    }
    const removeCoin = (coinId) => {
        let oldCoin = JSON.parse(localStorage.getItem('coins'));
        let newCoin = oldCoin.filter((coin) => coin !== coinId);
        setAllCoins(newCoin);
        localStorage.setItem('coins', JSON.stringify(newCoin));
    }
    const resetSaved = () => {
        getSavedData();
    }
    const getSavedData = async (totalCoins = allCoins) => {
        try {
          const data = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
              ","
            )}&order=${sortby}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
          )
            .then((res) => res.json())
            .then((json) => json);
    
          setSavedData(data);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{
        if(allCoins.length > 0){

            getSavedData();
        }
        else{
            setSavedData();
        }
    },[allCoins])

    useEffect(() => {
        let isThere = JSON.parse(localStorage.getItem('coins')) || false;
        if (!isThere) {
            localStorage.setItem('coins', JSON.stringify([]));
        }
        else {
            let totalCoins = JSON.parse(localStorage.getItem('coins'));
            setAllCoins(totalCoins);
            if(totalCoins.length > 0){
                getSavedData(totalCoins);
            }
        }
    }, [])

    return (
        <StorageContext.Provider value={{
            saveCoin,
            allCoins,
            removeCoin,
            savedData,
            resetSaved
        }}>
            {children}

        </StorageContext.Provider>
    )
}

