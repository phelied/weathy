
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun, faWind } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import Search from '../components/search';
import Forecast from '../components/forecast';
import "../assets/styles/home.css";
import paris from "../assets/images/paris.png";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import clouds from "../assets/images/clouds.png";
import ChartDataLabels from 'chartjs-plugin-datalabels';



import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const image = new Image();
    image.src = { clouds };
    const labels = [20, 34, 28, 22];

    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "#EF9056",
                borderColor: "#EF9056",
                data: [20, 34, 28, 22],
            },
        ],
    };

    const [defaultCityWeather, setDefaultCityWeather] = useState([]);
    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    const imageURLs = [
        'https://i.stack.imgur.com/2RAv2.png',
        'https://i.stack.imgur.com/Tq5DA.png',
        'https://i.stack.imgur.com/3KRtW.png',
        'https://i.stack.imgur.com/iLyVi.png'
    ];
    const images = imageURLs.map(v => {
        var image = new Image();
        image.src = v;
        return image;
    });

    // const getWeatherData = (data, cityName) => {
    //     setWeatherData(data);
    //     setCity(cityName);
    // };
    return (<div className="app">
        {/* <header>
            <nav>
                <Search getWeatherData={getWeatherData} />
            </nav>
        </header> */}
        <main className='bg-white px-4 text-[#1A2840]'>
            <div className='font-["Jost"] flex h-max flex-col bg-[#BEE6E6] rounded-xl'>
                <div className='flex pl-2 pt-4 items-center '>
                    <FontAwesomeIcon className='h-4 bg-white py-2 px-1 rounded-full text-[#FDAA67]' icon={faCloudSun} />
                    <div className='flex pl-2 flex-col'>
                        <span className='text-xl font-semibold'>Paris</span>
                        <span className='text-sm'>What's the weather ? </span>
                    </div>
                </div>
                <div className='flex flex-col pl-2 pt-4 mt-2'>
                    <div className='flex pl-2 flex-row items-center'>
                        <span className='text-3xl font-semibold'>22°C</span>
                        <span className='text-sm bg-white ml-4 rounded-md px-2 py-px font-semibold'>11°C</span>
                    </div>
                    <span className='h-5 pl-2 text-black text-sm'>Partly Cloudy</span>
                </div>
                <div className='grid grid-cols-3 gap-x-6 mx-8 my-6 justify-around'>
                    <div className='flex flex-col items-center py-2 justify-center bg-[#1A2840] text-white rounded-xl'>
                        <span className='text-sm font-medium'>Pressure</span>
                        <span className='text-base font-semibold'>800mb </span>
                    </div>
                    <div className='flex flex-col  items-center py-2 justify-center bg-[#CBE175] rounded-xl'>
                        <span className='text-sm font-medium'>Visibility</span>
                        <span className='text-base font-semibold'>4.3 km</span>
                    </div>
                    <div className='flex flex-col items-center py-2 justify-center bg-white rounded-xl'>
                        <span className='text-sm font-medium'>Humidity</span>
                        <span className='text-base font-semibold'>87%</span>
                    </div>
                </div>
            </div>
            <div className='font-["Jost"] flex h-max flex-col bg-[#55ADE2] rounded-xl mt-6 text-white'>
                <div className='flex pl-2 pt-4 items-center '>
                    <FontAwesomeIcon className='h-4 bg-white py-2 px-2 rounded-full text-[#FDAA67]' icon={faWind} />
                    <div className='flex pl-2 flex-col'>
                        <span className='text-xl font-semibold'>Air Quality</span>
                        <span className='text-sm'>What's the weather ? </span>
                    </div>
                </div>
                <div className='flex flex-col pl-2 pt-4 mt-2'>
                    <div className='flex pl-2 flex-row items-center'>
                        <span className='text-3xl font-semibold'>390</span>
                        <span className='text-sm bg-white ml-4 rounded-md font-semibold px-2 bg-[#CBE175] py-1 text-[#1A2840]'>AQI</span>
                    </div>
                    <span className='h-5 pl-2 text-white text-sm'>West Wind</span>
                </div>
                <div className='mt-10 mx-2 rounded-xl bg-white text-[#1A2840] px-3 py-3 mb-3'>
                    <div>
                        <span className='text-sm font-semibold'>Good</span>
                        <span className='text-sm font-semibold float-right'>Hazardous</span>
                    </div>
                    <ProgressBar className='mt-2 h-2 text-black' variant="warning" animated now={60} />
                </div>
            </div>
            <div className='text-[#1A2840] font-bold text-3xl mt-8'>
                <span>How's the</span><br />
                <span>temperature today ? </span>
            </div>
            <div className='w-full mt-12'>
                <div className='grid grid-cols-4 w-full mt-4 text-black absolute justify-center'>
                    <img src={clouds}  style={{bottom: "2em"}} className='h-12 p-2 border-[#F4F5F7] border rounded-full relative' alt="Rectangle-1" border="0" />
                    <img src={clouds} style={{bottom: "4em"}} className='h-12 p-2 border rounded-full relative' alt="Rectangle-1" border="0" />
                    <img src={clouds} style={{bottom: "2em"}} alt="Rectangle-1 " className='h-12 p-2 border relative rounded-full' border="0" />
                    <img src={clouds} style={{bottom: "2em"}} alt="Rectangle-1" border="0" className='h-12 p-2 border relative rounded-full' />
                </div>
                <div className='h-16'>
                    <Line
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    top: 30,
                                
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false
                                }, tooltip: {
                                    enabled: false
                                }
                            }, elements: {
                                line: {
                                    tension: 0.4
                                },
                                point: {
                                    hoverRadius: 3,
                                }
                            },
                            scales: {
                                y: {
                                    display: false,
                                    grid: {
                                        display: false
                                    },
                                },
                                x: {
                                    display: false,
                                    grid: {
                                        display: false
                                    },
                                },
                            }
                        }}
                    />
                </div>
                <div className='grid grid-cols-4 gap-5 mt-4 text-black'>
                    <div className='flex flex-col justify-center items-center'>
                        <span className='font-bold  text-lg'>20°</span>
                        <span className='text-[#828282] font-semibold mt-0.5'>Morning</span>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <span className='font-bold  text-lg' >34°</span>
                        <span className='text-[#828282] font-semibold mt-0.5'>Afternoon</span>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <span className='font-bold  text-lg' >28°</span>
                        <span className='text-[#828282] font-semibold mt-0.5'>Evening</span>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <span className='font-bold  text-lg' >22°</span>
                        <span className='text-[#828282] font-semibold mt-0.5'>Night</span>
                    </div>

                </div>
            </div>
            <div className='font-["Jost"] grid h-[18rem] grid-cols-1 bg-[#CBE175] mt-6 rounded-xl text-black content-between'>
                <div className='flex pl-6 pt-4 flex-col'>
                    <span className='text-2xl font-semibold'>Tomorrow</span>
                    <span className='text-lg'>Paris</span>
                </div>
                <div className='flex flex-col pl-6 pt-4 mt-2 mb-10'>
                    <span className='text-5xl font-semibold'>22°C</span>
                    <span className='h-5 mt-2 text-black text-base'>Partly Cloudy</span>
                </div>
            </div>

            {/* <div className='main-weather-current'>
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
            <Forecast weatherData={weatherData} />
            <div className='more-current-weather'>
                <div className='more-current-weather-item'>
                    <span className='more-current-weather-item-title'>WIND</span>
                    <img src={require("../assets/images/icons/vent.png")} alt="wind" />
                    <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "8"} <span>km/h</span></span>
                </div>
                <div className='more-current-weather-item'>
                    <span className='more-current-weather-item-title'>HUMIDITY</span>
                    <img src={require("../assets/images/icons/humidite.png")} alt="humidity" />
                    <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "12"} <span>%</span></span>
                </div>
                <div className='more-current-weather-item'>
                    <span className='more-current-weather-item-title'>PRESSURE</span>
                    <img src={require("../assets/images/icons/jauge.png")} alt="pressure" />
                    <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "1024"} <span>hPa</span></span>
                </div>
                <div className='more-current-weather-item'>
                    <span className='more-current-weather-item-title'>FEELS LIKE</span>
                    <img src={require("../assets/images/icons/thermometre.png")} alt="temperature" />
                    <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "23"} <span>°</span></span>
                </div>
                <div className='more-current-weather-item'>
                    <span className='more-current-weather-item-title'>CLOUDS</span>
                    <img src={require("../assets/images/icons/thermometre.png")} alt="temperature" />
                    <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "23"} <span>°</span></span>
                </div>
                <div className='more-current-weather-item'>
                    <span className='more-current-weather-item-title'>UV</span>
                    <img src={require("../assets/images/icons/thermometre.png")} alt="temperature" />
                    <span className='more-current-weather-item-value'>{weatherData && weatherData.length !== 0 ? weatherData.current.wind_speed : "23"} <span>°</span></span>
                </div>
            </div> */}
        </main>
        {/* <footer>
            <nav className='nav-footer__link'>
                <a href="https://github.com/phelied/weathy" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faSquareGithub} />
                </a>
            </nav>
        </footer> */}
    </div>);
};

export default Home;
