
import React, { useState, useEffect } from 'react';
import './App.css';
import BunnyGif from './assets/images/bunny-copy.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark, faLocationDot, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import API from "./hooks/utils/API";

function App() {
  const [isActive, setActive] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [city, setCity] = useState("");

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleClick = (city, latitude, longitude) => {
    API.ApiWeather(latitude, longitude).then((data) => {
      setWeatherData(data);
      setCity(city)
      clearInput();
    });
  };

  const clearInput = () => {
    setSearchedData([]);
    setWordEntered("");
  };

  function getLocalisationUser() {
    navigator.geolocation.getCurrentPosition(function (position) {
      API.ApiGetCityFromLocation(position.coords.latitude, position.coords.longitude).then((cityName) => {
        setCity(cityName)
      });
      API.ApiWeather(position.coords.latitude, position.coords.longitude).then((data) => {
        setWeatherData(data)
      });
    });
  };

  function errorsLocalisationUser(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // get the localisation of the user
  const askLocalisationUser = () => {
    if (navigator.geolocation) {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              navigator.geolocation.getCurrentPosition(getLocalisationUser);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(getLocalisationUser, errorsLocalisationUser);
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
            result.onchange = function () {
              console.log(result.state);
            };
          });
      } else {
        // safari doesn't support permissions.query
        navigator.geolocation.getCurrentPosition(getLocalisationUser)
      }
    } else {
      alert("Sorry Not available!");
    }
  };

  useEffect(() => {
    if (wordEntered !== "") {
      const timer = setTimeout(() => {
        API.ApiListCities(wordEntered).then((data) => setSearchedData(data));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [wordEntered]);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className="app">
      <header>
        <div className='container-search'>
          <nav className='navbar'>
            <div className="search-box">
              {isActive ? (
                <><button className='btn-search-open btn-search' onClick={handleToggle}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>

                  <input type="text" className='input-search-open input-search search__block-input'
                    value={wordEntered} placeholder="Search for a city"
                    onChange={(e) => setWordEntered(e.target.value.trim())} /> </>)
                :
                (<>
                  <button onClick={askLocalisationUser} className='btn-search btn-localisation'>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </button><button onClick={handleToggle} className='btn-search'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>

                  <input type="text" className='input-search' value={wordEntered}
                    onChange={(e) => setWordEntered(e.target.value.trim())} /></>)}
            </div>
          </nav>

          <div className="search__select-data">
            {searchedData && searchedData.length !== 0 && (
              <>
                {searchedData.map((data, index) => (
                  <div
                    key={data.city + index}
                    className="search__select-data-item"
                    onClick={() => handleClick(data.city, data.latitude, data.longitude)}
                  >
                    {capitalizeFirstLetter(data.city)},{" "}
                    <span>{data.country}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className='main-weather-current'>
          <span className='main-weather-current--city'>{city ? city : "LONDON"}</span>
          <span className='main-weather-current--temp'>{weatherData.current ? `${Math.round(weatherData.current.temp)}°` : "--"}</span>
          <span className='main-weather-current--phrase'>{weatherData.daily ? weatherData.daily[0].weather[0].description : ""} </span>
          {weatherData && weatherData.length !== 0 &&
            <div className='main-weather-current--temp-range'>
              <div className='main-weather-current--temp-min'>
                <FontAwesomeIcon icon={faArrowDown} />
                <span>{Math.round(weatherData.daily[0].temp.min)}°</span>
              </div>
              <div className='main-weather-current--temp-max'>
                <FontAwesomeIcon icon={faArrowUp} />
                <span>{Math.round(weatherData.daily[0].temp.max)}°</span>
              </div>
            </div>
          }
        </div>
      </header>
      <main>
        <div className='spline'>
          <img className="spline-img" src={BunnyGif} alt="bunny gif" />
        </div>
        <div className='forecast-weather'>
          {weatherData && weatherData.length !== 0 ? (
            weatherData.daily.slice(1, 6).map((day, index) => (
              <div className='forecast-weather-item' key={index}>
                <span className='forecast-weather-item-day'>{new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(day.dt * 1000)).substring(0, 4)}.</span>
                <img className='forecast-weather-item-icon' alt='weather-icon' src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} />
                <span className='forecast-weather-item-temp'>{Math.round(day.temp.min)}°• {Math.round(day.temp.max)}°</span>
              </div>
            ))) :
            (
              <>
                <div className='forecast-weather-item'>
                  <span className='forecast-weather-item-day'>JEU. <span className='forecast-weather-rest-day'>11 OCT.</span></span>
                  <img src={require("./assets/images/icons/cloud-computing.png")} alt='' />
                  <span className='forecast-weather-item-temp'>22° ••• 34°</span>
                  <div className="forecast-weather-item-feels-like">
                    <span className='forecast-weather-item-title'>FEELS LIKE</span>
                    <span className='forecast-weather-item-value'>23°</span>
                  </div>
                  <div className='forecast-weather-item-wind'>
                    <span className='forecast-weather-item-title'>WIND</span>
                    <span className='forecast-weather-item-value'>8KM/H</span>
                  </div>
                  <div className="forecast-weather-item-humidity">
                    <span className='forecast-weather-item-title'>HUMIDITY</span>
                    <span className='forecast-weather-item-value'>23%</span>
                  </div>
                </div><div className='forecast-weather-item'>
                  <span className='forecast-weather-item-day'>JEU. <span className='forecast-weather-rest-day'>11 OCT.</span></span>
                  <img src={require("./assets/images/icons/cloud-computing.png")} alt='' />
                  <span className='forecast-weather-item-temp'>22° ••• 34°</span>
                  <div className="forecast-weather-item-feels-like">
                    <span className='forecast-weather-item-title'>FEELS LIKE</span>
                    <span className='forecast-weather-item-value'>23°</span>
                  </div>
                  <div className='forecast-weather-item-wind'>
                    <span className='forecast-weather-item-title'>WIND</span>
                    <span className='forecast-weather-item-value'>8KM/H</span>
                  </div>
                  <div className="forecast-weather-item-humidity">
                    <span className='forecast-weather-item-title'>HUMIDITY</span>
                    <span className='forecast-weather-item-value'>23%</span>
                  </div>
                </div>
                <div className='forecast-weather-item'>
                  <span className='forecast-weather-item-day'>VEN. <span className='forecast-weather-rest-day'>11 OCT.</span></span>
                  <img src={require("./assets/images/icons/cloud-computing.png")} alt='' />
                  <span className='forecast-weather-item-temp'>22° ••• 34°</span>
                  <div className="forecast-weather-item-feels-like">
                    <span className='forecast-weather-item-title'>FEELS LIKE</span>
                    <span className='forecast-weather-item-value'>23°</span>
                  </div>
                  <div className='forecast-weather-item-wind'>
                    <span className='forecast-weather-item-title'>WIND</span>
                    <span className='forecast-weather-item-value'>8KM/H</span>
                  </div>
                  <div className="forecast-weather-item-humidity">
                    <span className='forecast-weather-item-title'>HUMIDITY</span>
                    <span className='forecast-weather-item-value'>23%</span>
                  </div>
                </div>
                <div className='forecast-weather-item'>
                  <span className='forecast-weather-item-day'>SAM. <span className='forecast-weather-rest-day'>11 OCT.</span></span>
                  <img src={require("./assets/images/icons/cloud-computing.png")} alt='' />
                  <span className='forecast-weather-item-temp'>22° ••• 34°</span>
                  <div className="forecast-weather-item-feels-like">
                    <span className='forecast-weather-item-title'>FEELS LIKE</span>
                    <span className='forecast-weather-item-value'>23°</span>
                  </div>
                  <div className='forecast-weather-item-wind'>
                    <span className='forecast-weather-item-title'>WIND</span>
                    <span className='forecast-weather-item-value'>8KM/H</span>
                  </div>
                  <div className="forecast-weather-item-humidity">
                    <span className='forecast-weather-item-title'>HUMIDITY</span>
                    <span className='forecast-weather-item-value'>23%</span>
                  </div>
                </div>
                <div className='forecast-weather-item'>
                  <span className='forecast-weather-item-day'>DIM. <span className='forecast-weather-rest-day'>11 OCT.</span></span>
                  <img src={require("./assets/images/icons/cloud-computing.png")} alt='' />
                  <span className='forecast-weather-item-temp'>22° ••• 34°</span>
                  <div className="forecast-weather-item-feels-like">
                    <span className='forecast-weather-item-title'>FEELS LIKE</span>
                    <span className='forecast-weather-item-value'>23°</span>
                  </div>
                  <div className='forecast-weather-item-wind'>
                    <span className='forecast-weather-item-title'>WIND</span>
                    <span className='forecast-weather-item-value'>8KM/H</span>
                  </div>
                  <div className="forecast-weather-item-humidity">
                    <span className='forecast-weather-item-title'>HUMIDITY</span>
                    <span className='forecast-weather-item-value'>23%</span>
                  </div>
                </div>
              </>)
          }
        </div>
        <div className='more-current-weather'>
          <div className='more-current-weather-item'>
            <span className='more-current-weather-item-title'>WIND</span>
            <img src={require("./assets/images/icons/vent.png")} alt="wind" />
            <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "8"} <span>km/h</span></span>
          </div>
          <div className='more-current-weather-item'>
            <span className='more-current-weather-item-title'>HUMIDITY</span>
            <img src={require("./assets/images/icons/humidite.png")} alt="humidity" />
            <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "12"} <span>%</span></span>
          </div>
          <div className='more-current-weather-item'>
            <span className='more-current-weather-item-title'>PRESSURE</span>
            <img src={require("./assets/images/icons/jauge.png")} alt="pressure" />
            <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "1024"} <span>hPa</span></span>
          </div>
          <div className='more-current-weather-item'>
            <span className='more-current-weather-item-title'>FEELS LIKE</span>
            <img src={require("./assets/images/icons/thermometre.png")} alt="temperature" />
            <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "23"} <span>°</span></span>
          </div>
          <div className='more-current-weather-item'>
            <span className='more-current-weather-item-title'>CLOUDS</span>
            <img src={require("./assets/images/icons/thermometre.png")} alt="temperature" />
            <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "23"} <span>°</span></span>
          </div>
          <div className='more-current-weather-item'>
            <span className='more-current-weather-item-title'>UV</span>
            <img src={require("./assets/images/icons/thermometre.png")} alt="temperature" />
            <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "23"} <span>°</span></span>
          </div>
        </div>
      </main>
      <footer>
        <nav className='nav-footer__link'>
          <a href="https://github.com/phelied/weathy" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faSquareGithub} />
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default App;
