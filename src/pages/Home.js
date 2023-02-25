
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun, faWind } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import Search from '../components/search';
import Forecast from '../components/forecast';
import "../assets/styles/home.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import clouds from "../assets/images/clouds.png";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import API from "../hooks/utils/API";

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
    const getWeatherData = (data, cityName) => {
        data['name'] = cityName;
        setWeatherData(data);
    };
    const data = {
        labels: [20, 34, 28, 22],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "#EF9056",
                borderColor: "#EF9056",
                data: [20, 34, 28, 22],
            },
        ],
    };


    const defaultCity = { 'lon': 2.3486, 'lat': 48.853401 };
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        API.ApiWeather(defaultCity.lat, defaultCity.lon).then((data) => {
            data['name'] = "Paris";
            setWeatherData(data);
        });
    }, []);

    function calculateAqi(pm25) {
        let aqi;
        if (pm25 >= 0 && pm25 <= 12.0) {
            aqi = interpolate(pm25, 0, 12.0, 0, 50);
        } else if (pm25 > 12.0 && pm25 <= 35.4) {
            aqi = interpolate(pm25, 12.1, 35.4, 51, 100);
        } else if (pm25 > 35.4 && pm25 <= 55.4) {
            aqi = interpolate(pm25, 35.5, 55.4, 101, 150);
        } else if (pm25 > 55.4 && pm25 <= 150.4) {
            aqi = interpolate(pm25, 55.5, 150.4, 151, 200);
        } else if (pm25 > 150.4 && pm25 <= 250.4) {
            aqi = interpolate(pm25, 150.5, 250.4, 201, 300);
        } else if (pm25 > 250.4 && pm25 <= 350.4) {
            aqi = interpolate(pm25, 250.5, 350.4, 301, 400);
        } else if (pm25 > 350.4 && pm25 <= 500.4) {
            aqi = interpolate(pm25, 350.5, 500.4, 401, 500);
        } else {
            aqi = "N/A";
        }
        return aqi;
    }

    function interpolate(value, min1, max1, min2, max2) {
        return Math.round(((value - min1) * (max2 - min2)) / (max1 - min1) + min2);
    }


    return (<div className="app">
        <header className="flex justify-between px-4 py-6 bg-white items-center">
            <Search getWeatherData={getWeatherData} />
        </header>
        {error && <div className="alert alert-danger">{error}</div>}
        {weatherData && weatherData.length !== 0 &&
            <main className='bg-white px-4 text-[#1A2840]'>
                <div className='font-["Jost"] flex h-max flex-col bg-[#BEE6E6] rounded-xl back'>
                    <div className='flex pl-2 pt-4 items-center '>
                        <FontAwesomeIcon className='h-4 bg-white py-2 px-1 rounded-full text-[#FDAA67]' icon={faCloudSun} />
                        <div className='flex pl-2 flex-col'>
                            <span className='text-xl font-semibold'>{weatherData.name}</span>
                            <span className='text-sm'>What's the weather ? </span>
                        </div>
                    </div>
                    <div className='flex flex-col pl-2 pt-4 mt-2'>
                        <div className='flex pl-2 flex-row items-center'>
                            <span className='text-3xl font-semibold'>{Math.floor(weatherData.main.temp)}°C</span>
                            <span className='text-sm bg-white ml-4 rounded-md px-2 py-px font-semibold'>{Math.floor(weatherData.main.temp_max)}°C</span>
                        </div>
                        <span className='h-5 pl-2 text-black text-sm'>{weatherData.weather[0].description}</span>
                    </div>
                    {console.log(weatherData)}
                    <div className='grid grid-cols-3 gap-x-2 mx-3 my-6 justify-around'>
                        <div className='flex flex-col items-center py-2 justify-center bg-[#1A2840] text-white rounded-xl'>
                            <span className='text-sm font-medium'>Pressure</span>
                            <span className='text-base font-semibold'>{weatherData.main.pressure} mb</span>
                        </div>
                        <div className='flex flex-col  items-center py-2 justify-center bg-[#CBE175] rounded-xl'>
                            <span className='text-sm font-medium'>Visibility</span>
                            <span className='text-base font-semibold'>{weatherData.visibility / 1000}km</span>
                        </div>
                        <div className='flex flex-col items-center py-2 justify-center bg-white rounded-xl'>
                            <span className='text-sm font-medium'>Humidity</span>
                            <span className='text-base font-semibold'>{weatherData.main.humidity}%</span>
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
                            <span className='text-3xl font-semibold'>{calculateAqi(weatherData.air.components["pm2_5"])}</span>
                            <span className='text-sm bg-white ml-4 rounded-md font-semibold px-2 bg-[#CBE175] py-1 text-[#1A2840]'>AQI</span>
                        </div>
                        <span className='h-5 pl-2 text-white text-sm'>West Wind</span>
                    </div>
                    <div className='mt-10 mx-2 rounded-xl bg-white text-[#1A2840] px-3 py-3 mb-3'>
                        <div>
                            <span className='text-sm font-semibold'>Good</span>
                            <span className='text-sm font-semibold float-right'>Hazardous</span>
                        </div>
                        <ProgressBar className='mt-2 h-2 text-black' variant="warning" animated now={weatherData.air.main.aqi * 20} />
                    </div>
                </div>
                <div className='text-[#1A2840] font-bold text-3xl mt-8'>
                    <span>How's the</span><br />
                    <span>temperature today ? </span>
                </div>
                <div className='w-full mt-12'>
                    <div className='grid grid-cols-4 w-full mt-4 text-black absolute justify-center'>
                        <img src={clouds} style={{ bottom: "2em" }} className='h-12 p-2 border-[#F4F5F7] border rounded-full relative' alt="Rectangle-1" border="0" />
                        <img src={clouds} style={{ bottom: "4em" }} className='h-12 p-2 border rounded-full relative' alt="Rectangle-1" border="0" />
                        <img src={clouds} style={{ bottom: "2em" }} alt="Rectangle-1 " className='h-12 p-2 border relative rounded-full' border="0" />
                        <img src={clouds} style={{ bottom: "2em" }} alt="Rectangle-1" border="0" className='h-12 p-2 border relative rounded-full' />
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
            </main>
        }
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
