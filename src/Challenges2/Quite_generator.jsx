import React, { useEffect, useState } from 'react';
const quotes = [
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    // Add more quotes here...
  ];
  const Quite_generator = () => {
    const [data,setdata]=useState()
  
  const  handleclick=()=>{
    const random=Math.floor(Math.random()*quotes.length)

       setdata(quotes[random])

  }

    return (
        <div>
            <button onClick={handleclick}>generate quates</button>
            <h1>{data}</h1>

        </div>
    );
};

export default Quite_generator;