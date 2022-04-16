import AOS from "aos";
import React from "react";
import "./App.css";
import "aos/dist/aos.css";
import arrow from "./assets/arrow.png";

const binanceData = new WebSocket(
  "wss://stream.binance.com:9443/ws/!miniTicker@arr"
);

class App extends React.Component {
  state = { assets: [], isLoading: true, search: "" };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    AOS.init();

    const queryString = {
      currency: "vs_currency=usd",
      order: "order=market_cap_desc",
      change: "price_change_percentage=1h,24h",
    };
    const data2 = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?${queryString.currency}&${queryString.order}`
      );
      const data = await response.json();
      console.log(data);
      this.setState({
        ...this.state,
        assets: data,
        isLoading: false,
      });
    };
    data2();
  }

  handleChange(e) {
    console.log(this.state);
    this.setState({ ...this.state, search: e.target.value });
  }

  render() {
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center pt-20 lg:pt-10 pb-10">
          <form className="w-full px-5 md:w-2/4 mx-auto">
            <input
              value={this.state.search}
              onChange={this.handleChange}
              className="bg-gray-200 w-full text-center focus:ring-2 focus:bg-white transition duration-150 ease-in-out py-3 px-5 rounded-md shadow-2xl outline-none ring-2 ring-yellow-300"
              placeholder="search your favorite crypto"
              required
              type="text"
            />
          </form>
        </div>
        {this.state.isLoading && (
          <div className="flex items-center justify-center">
            <div className="lds-roller pt-36">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        <div className="max-w-4xl mx-auto p-2 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {this.state.assets.length > 0 &&
            this.state.assets.map((asset, index) => {
              if (
                asset.name
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase())
              ) {
                return <Card key={index} asset={asset} />;
              }
            })}
        </div>
      </div>
    );
  }
}

export default App;

const Card = ({ asset }) => (
  <div
    data-aos="zoom-in"
    data-aos-duration="1200"
    className="max-w-xs px-3 py-5 bg-gray-800 text-gray-100 font-bold rounded-lg shadow-xl border"
  >
    <div className="flex items-center ">
      <img className="w-16 h-16 mr-2" src={asset.image} alt={asset.image} />
      <p>{asset.name}</p>
    </div>
    <div className="pl-3 pt-1">
      <p>
        <span className="text-yellow-500 mr-2">Price:</span>
        {asset.current_price}
      </p>
      <p>
        <span className="text-yellow-500 mr-2">Rank:</span>

        {asset.market_cap_rank}
      </p>

      <p>
        <span className="text-yellow-500 mr-2">Market Cap:</span>

        {asset.market_cap}
      </p>
      <p className="flex items-center">
        <span className="text-yellow-500 mr-2">24hrs %change:</span>

        <span
          className={
            asset.price_change_percentage_24h > 0
              ? "text-green-600 flex items-center"
              : "text-red-600 flex items-center"
          }
        >
          <img
            className={`h-4 w-4 ${
              asset.price_change_percentage_24h > 0 ? "" : "rotate-180"
            }`}
            src={arrow}
          />
          {asset.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
    </div>
  </div>
);

// binanceData.onopen = function (evt) {
//   binanceData.send(
//     JSON.stringify({
//       method: "SUBSCRIBE",
//       id: 1995,
//     })
//   );
// };
// binanceData.onmessage = function (evt) {
//   console.info("received data", JSON.parse(evt.data));
// };

// binanceData.onerror = function (evt) {
//   console.error("an error occurred", evt.data);
// };
