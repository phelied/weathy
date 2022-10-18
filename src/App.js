
import React, { useState, useEffect } from 'react';
import './App.css';
// import Search from './components/Search/search.jsx';
// import logo from './assets/images/weathy-logo.png';
// import { ColorRing } from 'react-loader-spinner'
// import SplineHook from './hooks/3D/spline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import API from "./hooks/utils/API";

function App() {
  const [isActive, setActive] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleClick = (latitude, longitude) => {
    API.ApiWeather(latitude, longitude).then((data) => setWeatherData(data));
  };

  // const clearInput = () => {
  //   setSearchedData([]);
  //   setWordEntered("");
  // };

  useEffect(() => {
    if (wordEntered !== "") {
      const timer = setTimeout(() => {
        API.ApiCities(wordEntered).then((data) => setSearchedData(data));
      }, 500);

      return () => clearTimeout(timer);
    } else {
      //  clearInput();
    }
  }, [wordEntered]);

  const handleToggle = () => {
    setActive(!isActive);
    console.log(isActive);
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
                value={wordEntered}
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
                  onClick={() => handleClick(data.latitude, data.longitude)}
                >
                  {capitalizeFirstLetter(data.city)},{" "}
                  <span>{data.country}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </header>
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
      </main>
      <footer>
        <li className='navbar__link-item'><a href="https://fr.linkedin.com/in/ophelie-diomar-680162209" target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li className='navbar__link-item'><a href="https://github.com/phelied/weathy" target="_blank" rel="noreferrer">Github</a></li>
      </footer> */}
    </div>
  );
}

export default App;
