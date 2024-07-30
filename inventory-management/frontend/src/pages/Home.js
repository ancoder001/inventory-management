import React from 'react'
import "../index.css"

const Home = () => {
  return (
    <div className='flex w-screen'>
        <div className='bg-blue-400 min-h-screen max-h-screen  w-[20%]'>
            sidebar
        </div>
        <div className='bg-gray-100 max-h-screen min-h-screen w-[80%]'>
            <div className='flex gap-4 justify-center mt-5'>
                <div className='h-20 w-44 rounded-xl text-lg flex flex-col items-center justify-center shadow'>
                 <p>Total No. of Stocks</p>
                 <p>{"3000"}</p>
                </div>

                <div className='h-20 w-44 rounded-xl text-lg flex flex-col items-center justify-center shadow'>
                 <p>Total Investment</p>
                 <p>&#8377;{"3000"}</p>
                </div>

                <div className='h-20 w-44 rounded-xl text-lg flex flex-col items-center justify-center shadow'>
                 <p>Total Earnings</p>
                 <p>&#8377;{"3000"}</p>
                </div>

                <div className='h-20 w-44 rounded-xl text-lg flex flex-col items-center justify-center shadow'>
                 <p>Total Profit</p>
                 <p>&#8377;{"3000"}</p>
                </div>
            </div>
            <div className='bg-yellow-200 w-full h-4/6 mt-7'>
                 chart
            </div>
        </div>
    </div>
  )
}

export default Home