import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { CryptoContext } from '../context/CryptoContext';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 100, pv: 2400, amt: 2400 }];
function CustomTooltip({ payload, label, active, currency = 'USD' }) {
    if (active && payload && payload.length > 0) {
        return (
            <div className="custom-tooltip">
                <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat('en-IN'
                    , {
                        style: 'currency',
                        currency: currency,
                        minimumFractionDigits: 2
                    })
                    .format(payload[0].value)
                    }`}</p>
            </div>
        );
    }

    return null;
}
const ChartComponent = ({ data, currency, type }) => {
    return (
        <ResponsiveContainer height="90%">
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey={type} stroke="#14ffec" strokeWidth={"1px"} />
                <CartesianGrid stroke="#323232" />
                <XAxis dataKey="date" hide />
                <YAxis domain={["auto", "auto"]} dataKey={type} hide />
                <Tooltip content={<CustomTooltip />} currency={currency}
                    cursor={false}
                    wrapperStyle={{ outline: "none" }}
                />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    )
}




const Chart = ({ id }) => {

    const [chartData, setChartData] = useState();
    const [type, setType] = useState('prices');
    const [days, setDays] = useState(7);
    let { currency } = useContext(CryptoContext);
    useEffect(() => {
        const getChartData = async (id) => {
            try {
                const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
                    .then((res) => res.json())
                    .then((res) => res);
                console.log("chart-data ", data);

                let convertedData = data[type].map(item => {
                    return {
                        date: new Date(item[0]).toLocaleDateString(),
                        [type]: item[1]
                    }
                })

                console.log("chart-data ", convertedData);
                setChartData(convertedData)
            } catch (error) {
                console.log(error);
            }
        }
        getChartData(id);

    }, [id, type, days])

    return (
        <div className='w-full h-[60%]'>
            <ChartComponent currency={currency} data={chartData} type={type} />
            <div className='flex '>
                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === "prices"
                        ? "bg-cyan text-cyan"
                        : "bg-gray-200 text-gray-100"
                        }`}
                    onClick={() => setType("prices")}>Prices</button>
                <button
                    className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === "market_caps"
                        ? "bg-cyan text-cyan"
                        : "bg-gray-200 text-gray-100"
                        }`}
                    onClick={() => setType("market_caps")}>Market Cap</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${type === "total_volumes"
                    ? "bg-cyan text-cyan"
                    : "bg-gray-200 text-gray-100"
                    }`} onClick={() => setType("total_volumes")}>Total Volume</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${days === 7 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
                    }`}  onClick={() => setDays(7)} >7d</button>
                <button  className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 14 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`} onClick={() => setDays(14)} >14d</button>
                <button  className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 30 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`} onClick={() => setDays(30)} >30d</button>
            </div>
        </div>

    )
}

export default Chart