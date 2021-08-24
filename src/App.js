import React, { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coins";
import "./App.css";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    Axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => alert("eroor"));
  }, []);

  const filteredCoins = coins.filter((coins) => {
    return coins.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text"> Search for coin</h1>
          <form>
            <input
              type="text"
              className="coin-input"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
