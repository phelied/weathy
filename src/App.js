
import React, { useState, useEffect, Suspense } from 'react';
import './App.css';
// import Search from './components/Search/search.jsx';
// import logo from './assets/images/weathy-logo.png';
import { ColorRing } from 'react-loader-spinner';
// import SplineHook from './hooks/3D/spline';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark, faWind } from '@fortawesome/free-solid-svg-icons'
import API from "./hooks/utils/API";

// const SplineHook = React.lazy(() => import('./hooks/3D/spline'));

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

  useEffect(() => {
    if (wordEntered !== "") {
      const timer = setTimeout(() => {
        API.ApiCities(wordEntered).then((data) => setSearchedData(data));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [wordEntered]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        API.ApiWeather(position.coords.latitude, position.coords.longitude).then((data) => { setWeatherData(data) });
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  const handleToggle = () => {
    setActive(!isActive);
  };



  return (
    <div className="App">
      <header>
        {/* <nav className='navbar'>
          <img className='navbar__image' src={logo} alt='logo-Weathy' />
          <ul className='navbar__link'>
            <li className='navbar__link-item'><a href="https://fr.linkedin.com/in/ophelie-diomar-680162209" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li className='navbar__link-item'><a href="https://github.com/phelied/weathy" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </nav> */}
        <div className="search-box">
          {isActive ? (
            <><button className='btn-search-open btn-search' onClick={handleToggle}>
              <FontAwesomeIcon icon={faXmark} />
            </button>

              <input type="text" className='input-search-open input-search search__block-input'
                value={wordEntered} placeholder="Search for a city"
                onChange={(e) => setWordEntered(e.target.value.trim())} /> </>)
            :
            (<><button onClick={handleToggle} className='btn-search'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
              <input type="text" className='input-search' value={wordEntered}
                onChange={(e) => setWordEntered(e.target.value.trim())} /></>)}
        </div>
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
      </header>
      <main>
        {weatherData && weatherData.length !== 0
          && (
            <div className='main-weather'>
              <span className='main-weather-city'>{city ? city : "--"}</span>
              <span className='main-weather-temp'>{Math.round(weatherData.current.temp)}°</span>
              <span className='main-weather-phrase'>{weatherData.daily[0].weather[0].description}</span>
              <div className='main-weather-temp-more'>
                <span> Min. {Math.round(weatherData.daily[0].temp.min)}°</span>
                <span>Max. {Math.round(weatherData.daily[0].temp.max)}°</span>
              </div>
            </div>
          )}

        <div className='spline'>
          <Suspense fallback={<ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />}>
            <iframe src='https://my.spline.design/molang3dcopy-a77b38a508355d692790536f2ad9fd1c/' frameBorder='0' width='100%' height='100%'></iframe>
          </Suspense>
        </div>
      </main>
      {/* <main>
        <Search />
        <div className='spline'>
          <Suspense fallback={<ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />}>
            <SplineHook />
          </Suspense>
        </div>
      </main>*/}
      <aside className='aside__weather'>
        {weatherData && weatherData.length !== 0 ? (
          weatherData.daily.slice(1, 5).map((day, index) => (
            <div className='aside__weather-item' key={index}>
              <span className='aside__weather-item-day'>{new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(day.dt * 1000))}</span>
              <img className='aside__weather-item-icon' src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} />
              <span className='aside__weather-item-temp'>{Math.round(day.temp.min)}°• {Math.round(day.temp.max)}°</span>
            </div>
          ))) :
          (
            <><div className='aside__weather-item'>
              <span className='aside__weather-item-day'>--</span>
              <span className='aside__weather-item-temp'>--</span>
              <span className='aside__weather-item-temp'>--</span>
              <span className='aside__weather-item-description'>--</span>
            </div>
              <div className='aside__weather-item'>
                <span className='aside__weather-item-day'>--</span>
                <span className='aside__weather-item-temp'>--</span>
                <span className='aside__weather-item-temp'>--</span>
                <span className='aside__weather-item-description'>--</span>
              </div>
              <div className='aside__weather-item'>
                <span className='aside__weather-item-day'>--</span>
                <span className='aside__weather-item-temp'>--</span>
                <span className='aside__weather-item-temp'>--</span>
                <span className='aside__weather-item-description'>--</span>
              </div>
              <div className='aside__weather-item'>
                <span className='aside__weather-item-day'>--</span>
                <span className='aside__weather-item-temp'>--</span>
                <span className='aside__weather-item-temp'>--</span>
                <span className='aside__weather-item-description'>--</span>
              </div></>)
        }
      </aside>
      <footer>
        <li className='navbar__link-item'><a href="https://fr.linkedin.com/in/ophelie-diomar-680162209" target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li className='navbar__link-item'><a href="https://github.com/phelied/weathy" target="_blank" rel="noreferrer">Github</a></li>
      </footer>
    </div>
  );
}

export default App;
