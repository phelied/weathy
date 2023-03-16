
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun, faWind } from '@fortawesome/free-solid-svg-icons';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import Search from '../components/search';
import "../assets/styles/home.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import clouds from "../assets/images/clouds.png";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import API from "../utils/API";
import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
    const defaultCity = { 'lon': 2.3486, 'lat': 48.853401 };
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState("");

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


    return (<AppContainer>
        <Header>
            <Search getWeatherData={getWeatherData} />
        </Header>
        {error && <AlertDanger>{error}</AlertDanger>}
        {weatherData && weatherData.length !== 0 &&
            <Main>
                <WeatherCard theme={{ backgroundColor: "#BEE6E6" }}>
                    <WeatherCardContent>
                        <WeatherIcon icon={faCloudSun} />
                        <div className='flex pl-2 flex-col'>
                            <span className='text-xl font-semibold'>{weatherData.name}</span>
                            <span className='text-sm'>What's the weather ? </span>
                        </div>
                    </WeatherCardContent>
                    <WeatherTempContainer>
                        <WeatherTemp>
                            <h4>{Math.floor(weatherData.main.temp)}°C</h4>
                            <span>{Math.floor(weatherData.main.temp_max)}°C</span>
                        </WeatherTemp>
                        <WeatherDescription>{weatherData.weather[0].description}</WeatherDescription>
                    </WeatherTempContainer>
                    <WeatherStats>
                        <WeatherStatCard theme={{ color: "white", backgroundColor: "#1A2840" }}>
                            <h6>Pressure</h6>
                            <h3>{weatherData.main.pressure} mb</h3>
                        </WeatherStatCard>
                        <WeatherStatCard theme={{ backgroundColor: "#CBE175" }}>
                            <h6>Visibility</h6>
                            <h3>{weatherData.visibility / 1000}km</h3>
                        </WeatherStatCard>
                        <WeatherStatCard theme={{ backgroundColor: "white" }}>
                            <h6>Humidity</h6>
                            <h3>{weatherData.main.humidity}%</h3>
                        </WeatherStatCard>
                    </WeatherStats>
                </WeatherCard>
                <WeatherCard theme={{ backgroundColor: "#55ADE2", color: "white" }}>
                    <WeatherCardContent>
                        <WeatherIcon icon={faWind} />
                        <div className='flex pl-2 flex-col'>
                            <span className='text-xl font-semibold'>Air Quality</span>
                            <span className='text-sm'>What's the weather ? </span>
                        </div>
                    </WeatherCardContent>
                    <WeatherTempContainer>
                        <div className='flex pl-2 flex-row items-center'>
                            <span className='text-3xl font-semibold'>{calculateAqi(weatherData.air.components["pm2_5"])}</span>
                            <span className='text-sm bg-white ml-4 rounded-md font-semibold px-2 bg-[#CBE175] py-1 text-[#1A2840]'>AQI</span>
                        </div>
                        <span className='h-5 pl-2 text-white text-sm'>West Wind</span>
                    </WeatherTempContainer>
                    <div className='mt-10 mx-2 rounded-xl bg-white text-[#1A2840] px-3 py-3 mb-3'>
                        <div>
                            <span className='text-sm font-semibold'>Good</span>
                            <span className='text-sm font-semibold float-right'>Hazardous</span>
                        </div>
                        <ProgressBar className='mt-2 h-2 text-black' variant="warning" animated now={weatherData.air.main.aqi * 20} />
                    </div>
                </WeatherCard>
                {/* <div className='text-[#1A2840] font-bold text-3xl mt-8'>
                    <span>How's the</span><br />
                    <span>temperature today ? </span>
                </div> */}
                {/* <div className='w-full mt-12'>
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
                </div> */}
                <div className='font-["Jost"] grid h-[18rem] grid-cols-1 bg-[#CBE175] mt-6 rounded-xl text-black content-between'>
                    <div className='flex pl-6 pt-4 flex-col'>
                        <span className='text-2xl font-semibold'>Tomorrow</span>
                        <span className='text-lg'>{weatherData.name}</span>
                    </div>
                    {console.log(weatherData)}
                    <div className='flex flex-col pl-6 pt-4 mt-2 mb-10'>
                        <span className='text-5xl font-semibold'>{Math.floor(weatherData.forecast.main.temp)}°C</span>
                        <span className='h-5 mt-2 text-black text-base'>{weatherData.forecast.weather[0].description}</span>
                    </div>
                </div>
            </Main>
        }
        <footer>
            <nav className='nav-footer__link mt-2 flex justify-end'>
                <a href="https://github.com/phelied/weathy" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faSquareGithub} />
                </a>
            </nav>
        </footer>
    </AppContainer>);
};

const AppContainer = styled.div`
  padding: 1rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  background-color: white;
`;

const AlertDanger = styled.div`
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: .75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: .25rem;
  margin: 1rem 0;
`;

const Main = styled.main`
  background-color: white;
  color: #1A2840;
`;

const WeatherCard = styled.div`
  font-family: 'Jost', sans-serif;
  display: flex;
  flex-direction: column;
  height: max-content;
  border-radius: 1rem;
  margin-top: 1rem;
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.backgroundColor};
`;

const WeatherCardContent = styled.div`
  display: flex;
  padding-left: 1rem;
  padding-top: 1rem;
  align-items: center;
`;

const WeatherIcon = styled(FontAwesomeIcon)`
  height: 1rem;
  background-color: white;
  padding: 0.5rem 0.50rem;
  border-radius: 9999px;
  color: #FDAA67;
`;

const WeatherTempContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  padding-top: 1.0rem;
  margin-top: 0.5rem;
`;

const WeatherTemp = styled.div`
    display: flex;
    padding-left: 0.5rem;
    flex-direction: row;
    align-items: center;
    font-weight: 600;

  & span {
    background-color: white;
    font-size: 0.875rem;
    margin-left: 1rem;
    padding: 1px 0.5rem;
    border-radius: 0.375rem;
    font-weight: 600;
  }

  & h4 {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 600;
  }
`;

const WeatherDescription = styled.span`
  height: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-left: 0.5rem;
  color: black;
`;

const WeatherStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.5rem;
  justify-content: space-around;
  margin: 1.5rem 0.75rem;
`;

const WeatherStatCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  border-radius: 0.75rem;

  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.color};

  & h6 {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
  }

  & h3 {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
  }
`;

export default Home;
