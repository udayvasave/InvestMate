import React from 'react'
import { useState,useEffect, useRef } from 'react';
// import "../assets/vendor/datatables/css/jquery.dataTables.min.css";
import "../../Tv/assets/vendor/datatables/css/jquery.dataTables.min.css"
// import demo from "./js/functions/functions.js";
import demo from '../../Tv/js/functions/functions.js';
import html2canvas from "html2canvas";
// import axios from "../../networkInterceptor.js";
import axios from '../../network/networkInterceptor.js';
// import ChartComponent from "./components/chartcomponents";
import ChartComponent from '../ChartComponent.js';
// import ChatScreen from "./chatScreen";
import ChatScreen from '../../Tv/chatScreen.js';
import ClipLoader from "react-spinners/ClipLoader";
// import "./dashboard.css";
import "../../Tv/dashboard.css";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabBar from './TabBar.jsx';
import './chartdefault.css';
// import Orders from "../Components/Tab-bar/Orders.jsx";
// import TopUpFunds from "../Components/TopUpFunds.js";

// import ChartDefault from "../Components/Tab-bar/ChartDefault.jsx";
import { Manager } from "socket.io-client";
import { base } from '../../variables.js';

var socket = null;







const ChartDefault = () => {


    const location = useLocation();
    const { hash, pathname, search } = location;
    const divRef = useRef(null);
    const [query, setQuery] = useState("");
    const [stockTitle, setStockTitle] = useState("Apple INC");
    const [stockTicker, setStockTicker] = useState("AAPL");
    const [suggestions, setSuggestions] = useState([]);
    // const [orders, setOrders] = useState([]);
    const [selectedStockData, setSelectedStockData] = useState(null);
    const [isStockLoading, setStockLoading] = useState(false);
    const [accountMoney, setAccountMoney] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [userMessage, setUserMessage] = useState("");


     //ORDER RELATED VARIABLES
  const [showDialog, setShowDialog] = useState(false);
  const [orderType, setOrderType] = useState("");
  const [quantity, setQuantity] = useState("");

  const openDialog = (type) => {
    setShowDialog(true);
    setOrderType(type);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setQuantity("");
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };


  useEffect(()=>{
    const manager = new Manager(base, {
      autoConnect: true
    });
    
    socket = manager.socket("/");
    socket.on("connect", () => {
      console.log("connected");
      const roomId = window.localStorage.getItem('email');
      socket.emit("join", roomId);
       });



       socket.on('chat', (data) => {
       console.log(data);
      });

    manager.open((err) => {
      if (err) {
        // an error has occurred
      } else {
        // the connection was successfully established
      }
    });



  },[]);



  function sendMessage(message){


    const roomId = window.localStorage.getItem('email');

    if(socket && roomId){

      socket.emit("chat", {
        userId: roomId,
        data: message,
        type: 'text',
        timeStamp: Date.now()
      });

    
  }
  }



const handleOrderForm = async (event) => {
        event.preventDefault();
        // Do something with the quantity and orderType
        if (!quantity) {
          alert("Please enter quantity");
          return;
        }
        console.log(`Quantity: ${quantity}, Order Type: ${orderType}`);
    
        try {
          const response = await axios.post("/orders/place", {
            ticker: stockTicker,
            quantity: parseInt(quantity),
            price: currentPrice,
    
            orderTime: Date.now(),
            orderType: "BUY",
          });
    
          toast.success(
            `${orderType} order for ${quantity} of ${stockTicker} placed at USD${currentPrice} each`
          );
          console.log("Order placed:", response.data);
          // Handle the response data as needed
        } catch (error) {
          console.error("Error placing order:", error.response.data.error);
          if (error.response.data.error === "Insufficient funds") {
            toast.warn("Insufficient funds");
          } else {
            toast.success("Failed to place an order");
          }
    
          // Handle the error
        }
    
        getUserAccountMoney();
        // getOrders();
    
        // Close the dialog
        closeDialog();
      };
    
      function formatDateTime(dateTime) {
        var currentDate = new Date();
        var targetDate = new Date(dateTime);
    
        // Check if the date is today
        if (
          targetDate.getDate() === currentDate.getDate() &&
          targetDate.getMonth() === currentDate.getMonth() &&
          targetDate.getFullYear() === currentDate.getFullYear()
        ) {
          // If it's today, return the hour and seconds
          var hours = targetDate.getHours();
          var minutes = targetDate.getMinutes();
          var seconds = targetDate.getSeconds();
          return hours + ":" + minutes + ":" + seconds;
        } else {
          // If it's not today, return the date
          var year = targetDate.getFullYear();
          var month = targetDate.getMonth() + 1; // January is 0
          var date = targetDate.getDate();
          return year + "-" + month + "-" + date;
        }
      }
    
  
      //ORDER RELATED VARIABLES : END
    
      const handleDownloadClick = () => {
        // Get the DOM node of the div
        const divElement = divRef.current;
    
        // Use html2canvas to capture the div as a canvas
        html2canvas(divElement)
          .then((canvas) => {
            // Convert canvas to data URL
            const imgData = canvas.toDataURL("image/png");
    
            // Create a temporary link element
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "screenshot.png";
    
            // Simulate click on the link to trigger download
            link.click();
          })
          .catch((error) => {
            console.error("Error generating screenshot:", error);
          });
      };
    
      async function getUserAccountMoney() {
        try {
          var response = await axios.get(`/account/money`);
          if (response.data.amount) {
            setAccountMoney(response.data.amount.toFixed(2));
          }
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
        autofetchStock();
        getUserAccountMoney();
        // getOrders();
      }, []);
    
      async function autofetchStock() {
        setSuggestions([]);
        setQuery("");
    
        try {
          const response = await axios.get(`/stocks/data/?ticker=` + stockTicker);
          //console.log(response.data);
          setCurrentPrice(response.data.historical[0].close)
          setSelectedStockData(response.data);
        } catch (error) {
          console.error("Error fetching stock data:", error.message);
        }
      }


      const fetchStockBySearch = async (event) => {
        setQuery(event.target.value);
        if (event.target.value.length < 1) {
          setSuggestions([]);
          return;
        }
        try {
          const response2 = await fetch(
            `https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;searchTerm=${query}`
          );
          const response = await response2.json();
    
          if (response.items !== null) {
            setSuggestions(response.items);

console.log(response.items)
            // setCurrentPrice(response.items[0].close)
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };
    
      const getImage = (e) => {
        if (this.TradingWidget) {
          this.setState({
            divStyle: {
              width: 1440,
              height: 600,
              opacity: 0,
            },
          });
    
          setTimeout(() => {
            this.TradingWidget.postMessage.get(
              "imageURL",
              {},
              function (t) {
                this.downloadImage(
                  `https://s3.tradingview.com/snapshots/${t
                    .slice(0, 1)
                    .toLowerCase()}/${t}.png`
                );
              }.bind(this)
            );
          }, 100);
        }
      };
    
      const handleClick = async ({ symbol, name }) => {
        setStockTicker(symbol);
        setStockLoading(true);
        setSuggestions([]);
        setStockTitle(name);
    
        setQuery("");
        try {
          const response = await axios.get(`/stocks/data/?ticker=${symbol}`);
          setCurrentPrice(response.data.historical[0].close)
          setSelectedStockData(response.data);
        } catch (error) {
          console.error("Error fetching stock data:", error.message);
        }
        setStockLoading(false);
      };
    





  return (
    <>
                    <div class="row charRow"  >
              <div class="col-xl-8">
                <div class="card">
                  <div
                    className="stockTitle"
                    style={{
                      color: "#a98898",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "right",
                      textAlign: "right",
                    }}
                  >
                    <span className='balance-charts'> Balance : USD {accountMoney}$</span>
                  </div>
                  <div class="card-body">
                    <input
                      style={{
                        width: "100%",
                        height: "45px",
                        border: "1px solid #B3C0CD",
                        marginBottom: "15px",
              borderRadius: "5px",
                        paddingLeft: "10px",
                      }}
                      type="text"
                      placeholder="Search Stock Name.."
                      value={query}
                      onChange={fetchStockBySearch}
                    />

                    {suggestions.length > 0 ? (
                      <ul className="stockSuggestionlist-ul">
                        {suggestions.map((stock) => (
                          <li
                            className="stockSuggestionlist-li"
                            key={stock.symbol}
                            onClick={() => handleClick(stock)}
                          >
                            <span>
                              {stock.name} ({stock.symbol})
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div />
                    )}

                    <div
                      className="stockTitle"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {/* <div id="tradingview_85dc0" class="" ref={divRef}></div> */}
                      <div className="stockTitle">
                        {stockTitle}{" "}
                        {isStockLoading ? (
                          <ClipLoader
                            color="#00ff00"
                            loading={isStockLoading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                    {selectedStockData && (
                      <ChartComponent stockData={selectedStockData} />
                    )}

                    <div className="stock-button-holder">
                      <button
                        className="stock-button buy-button"
                        onClick={() => openDialog("buy")}
                      >
                        Buy
                      </button>
                      <button
                        className="stock-button sell-button"
                        onClick={() => openDialog("sell")}
                      >
                        Sell
                      </button>
                    </div>

                    {showDialog && (
                      <div className="dialog">
                        <div className="dialog-content">
                          <span className="close" onClick={closeDialog}>
                            &times;
                          </span>
                          <h2>{stockTitle}</h2>
                          <h5>Enter Quantity</h5>

                          <label htmlFor="quantity">Quantity:</label>
                          <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            required
                          />
                          <br />
                          <br />
                          <div
                            className="place-button"
                            onClick={handleOrderForm}
                          >
                            {orderType}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <button onClick={getImage}>Download Screenshot</button> */}
                </div>
              </div>

              <div class="col-xl-4">
                <div class="card" id="chatscreen">
                  <div class="card-header border-0 pb-0">
                    <h4 class="card-title mb-0">Chatbot</h4>
                  </div>
                  <div class="card-body pt-2">
                    <div className="chat-content">
                      <ChatScreen />
                    </div>
                    <form>
                      {/* <div class="mt-3 d-flex justify-content-between">
										<input className='askinput' type='text'/>
										<a href="javascript:void(0)" class="btn btn-danger btn-sm light text-uppercase btn-block">Sell</a>
									</div> */}

                      <div className="row charRow"  >
                        <div className="col-8">
                          <input
                            className="askinput form-control"
                            id="prompt_text"
                            type="text"
                            placeholder="ASk.."
                            value={userMessage}
                            onChange={e => setUserMessage(e.target.value)}
                          />
                        </div>
                        <div className="col-4">
                          <button
                            className="btn btn-success btn-sm light text-uppercase btn-block"
                            onClick={e=>{
                              e.preventDefault();
                              sendMessage(userMessage);
                              setUserMessage("");
                            
                            }}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default ChartDefault