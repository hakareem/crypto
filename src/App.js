import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./Components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  //filtering through every coin by name
  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className='App'>
      <div className='titleContainer'>
        <h1>Welcome to Crypto Checker</h1>
      </div>
      <div className='cryptoHeader'>
        <input
          type='text'
          placeholder='Enter Coin Name'
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
        />
      </div>
      <div className='cryptoDisplay'>
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price.toFixed(2)}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
