import React, { useEffect, useState } from "react";
import searchicon from "../assests/searchicon.svg";
import "../styles/style.css";
import axios from "axios";
import cloudy from "../assests/cloudy.png" ;
import humidity from "../assests/humidity.jpg" ;
import wind from "../assests/wind.png" ;

const Home = () => {

  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    image: cloudy
  })

  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSearch = () =>{
    if(city !== ""){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c84080932697bd66b182c99e2e52d605`
    axios.get(apiUrl).then(res => {


      setData({
        ...data,
        celcius: res.data.main.temp,
        name: res.data.name,
        humidity: res.data.main.humidity,
        speed: res.data.wind.speed,
        image: data.image
      })
    }).catch( err => console.log(err))
    }
  }

  return (
    <div className="">
      <div className="weather">
        <div className="search">
            <div className="searchbar">
              <img alt="" src={searchicon} />
              <input
                type="text"
                placeholder="Enter City..."
                className="inputs"
                value={city}
                onChange={handleChange}
              ></input>
            </div>
            <button
              type="submit"
              className="searchbtn"
                onClick={handleSearch}
            >
              Search
            </button>
          
        </div>

        <div className="card-main">
            <img src={data.image} alt="" className="icon"/>
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>
            <div className="details">
              <div className="col">
                <img src={humidity} alt=""/>
                <div className="humidity">
                  <p>{Math.round(data.humidity)}</p>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="col">
                <img src={wind} alt=""/>
                <div className="wind">
                  <p>{Math.round(data.speed)}km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
