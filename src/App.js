
import React, { useState } from 'react';
import './App.css';
import BunnyGif from './assets/images/bunny-copy.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import Search from './components/search';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const getWeatherData = (data, cityName) => {
    setWeatherData(data);
    setCity(cityName);
  };

  return (
    <div className="app">
      <header>
        {error !== '' ? <div className="error-message">
          <span> &#9432; {error}</span>
        </div> :
          null}
          <Search getWeatherData={getWeatherData}/>
      </header>
      <main>
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
        <div className='spline'>
          <img className="spline-img" src={BunnyGif} alt="bunny gif" />
        </div>
        <div className='forecast-weather'>
          {weatherData && weatherData.length !== 0 ? (
            weatherData.daily.slice(1, 6).map((day) => (
              <div className='forecast-weather-item' key={new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(day.dt * 1000))}>
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
