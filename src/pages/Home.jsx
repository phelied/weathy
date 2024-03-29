import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faWind } from "@fortawesome/free-solid-svg-icons";
import Search from "../components/search";
import ProgressBar from "react-bootstrap/ProgressBar";
// import ChartData from '../components/chartData';
import Rain from "../assets/images/rain.png";

import API from "../utils/API";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { calculateAQI } from "../utils/aqiCalculator";

const Home = () => {
  const defaultCity = { lon: 2.3486, lat: 48.853401 };
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState("");

  const getWeatherData = (data) => {
    setWeatherData(data);
  };

  useEffect(() => {
    API.ApiWeather(defaultCity.lat, defaultCity.lon).then((data) => {
      data.name = "Paris";
      setWeatherData(data);
    });
  }, []);

  return (
    <AppContainer>
      <Header>
        <Search getWeatherData={getWeatherData} />
      </Header>
      {error && <AlertDanger>{error}</AlertDanger>}
      {weatherData && weatherData.length !== 0 && (
        <Main>
          <WeatherCard
            data-testid="current-weather"
            theme={{ backgroundColor: "#BEE6E6" }}
          >
            <WeatherCardContent>
              <WeatherIcon icon={faCloudSun} />
              <div className="flex pl-2 flex-col">
                <span className="text-xl font-semibold">
                  {weatherData.name}
                </span>
                <span className="text-sm">What&apos;s the weather ? </span>
              </div>
            </WeatherCardContent>
            <WeatherTempContainer>
              <WeatherTemp>
                <h4>{Math.floor(weatherData.main.temp)}°C</h4>
                <span>{Math.floor(weatherData.main.temp_max)}°C</span>
              </WeatherTemp>
              <WeatherDescription>
                {weatherData.weather[0].description}
              </WeatherDescription>
            </WeatherTempContainer>
            <WeatherStats>
              <WeatherStatCard
                theme={{ color: "white", backgroundColor: "#1A2840" }}
              >
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
          <WeatherCard
            data-testid="air-quality-container"
            theme={{ backgroundColor: "#55ADE2", color: "white" }}
          >
            <WeatherCardContent>
              <WeatherIcon icon={faWind} />
              <div className="flex pl-2 flex-col">
                <span className="text-xl font-semibold">Air Quality</span>
                <span className="text-sm">What&apos;s the weather ? </span>
              </div>
            </WeatherCardContent>
            <WeatherTempContainer>
              <WeatherTemp>
                <h4>{calculateAQI(weatherData.air.components.pm2_5)}</h4>
                <span>AQI</span>
              </WeatherTemp>
              <WeatherDescription className="text-white">
                West Wind
              </WeatherDescription>
            </WeatherTempContainer>
            <AirQualityProgressBar>
              <span>Good</span>
              <span>Hazardous</span>
              <ProgressBar
                className="mt-2 h-2 text-black"
                variant="warning"
                animated
                now={
                  weatherData.air.main.aqi === 1
                    ? 1
                    : weatherData.air.main.aqi * 20
                }
              />
            </AirQualityProgressBar>
          </WeatherCard>
          {/* <ChartData data={weatherData}/> */}
          <WeatherCard
            data-testid="forecast-weather-container"
            theme={{ backgroundColor: "#CBE175" }}
          >
            <img className="rain" src={Rain} />

            <div>
              <ForecastContent>
                <span className="text-2xl font-semibold">Tomorrow</span>
                <span className="text-lg">{weatherData.name}</span>
              </ForecastContent>
              <ForecastContent className="flex flex-col pl-6 pt-4 mt-2 mb-10">
                <span className="text-5xl font-semibold">
                  {Math.floor(weatherData.forecast[0].main.temp)}°C
                </span>
                <span className="h-5 mt-2 text-black text-base">
                  {weatherData.forecast[0].weather[0].description}
                </span>
              </ForecastContent>
            </div>
            <WeatherDaysContainer className="flex flex-col">
              {weatherData.forecast.slice(1).map((day, index) => (
                <WeatherDayContent
                  key={index}
                  className=" font-semibold bg-white"
                >
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  />
                  <WeatherDescriptionContainer className="flex flex-col">
                    <span className="">
                      {new Intl.DateTimeFormat("fr-FR", {
                        month: "long",
                      }).format(new Date(day.dt_txt)) +
                        " " +
                        new Date(day.dt_txt).getDate()}
                    </span>
                    {day.weather[0].description}
                  </WeatherDescriptionContainer>
                  <span className="text-[#fdaa67] place-self-end">{`${Math.floor(
                    day.main.temp_min
                  )}° / ${Math.floor(day.main.temp_max)}°`}</span>
                </WeatherDayContent>
              ))}
            </WeatherDaysContainer>
          </WeatherCard>
        </Main>
      )}
    </AppContainer>
  );
};

const AppContainer = styled.div`
  margin: 0 1rem;
  font-family: "Jost", sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  background-color: white;
  box-sizing: border-box;
`;

const AlertDanger = styled.div`
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  margin: 1rem 0;
`;

const Main = styled.main`
  background-color: white;
  color: #1a2840;
  position: relative;
`;

const WeatherCard = styled.div`
  font-family: "Jost", sans-serif;
  display: flex;
  z-index: -1;
  flex-direction: column;
  height: max-content;
  border-radius: 1rem;
  margin-top: 1rem;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};

  & .rain {
    position: absolute;
    z-index: 1;
    height: 28%;
    object-fit: cover;
    bottom: 16%;
    left: 47%;
    width: 57%;
  }
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
  padding: 0.5rem 0.5rem;
  border-radius: 9999px;
  color: #fdaa67;
`;

const WeatherTempContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
  padding-top: 1rem;
  margin-top: 0.5rem;
`;

const WeatherTemp = styled.div`
  display: flex;
  padding-left: 0.5rem;
  flex-direction: row;
  align-items: center;

  & span {
    background-color: white;
    font-size: 0.875rem;
    margin-left: 1rem;
    padding: 1px 0.5rem;
    border-radius: 0.375rem;
    font-weight: 600;
    color: #1a2840;
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

  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};

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

const AirQualityProgressBar = styled.div`
margin: 2.5rem 0.75rem 0.5rem 0.5rem;
border-radius: 0.75rem;
background-color: white;
color: #1A2840;
padding: 0.75rem;

& span {
    font-size: 0.875rem;
line-height: 1.25rem;
font-weight: 600;
}

& span:nth-child(2) {
    float: right;
`;

const ForecastContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 1.5rem;
  position: relative;
  z-index: 9999;
`;

const WeatherDaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  margin-bottom: 1rem;
  z-index: 3;
`;

const WeatherDayContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1.5fr;
  border-radius: 0.375rem;
  padding: 0.5rem 0.5rem;
  margin-bottom: 0.75rem;
`;
const WeatherDescriptionContainer = styled.div`
  display: grid;
  flex-direction: column;
  font-size: 0.75rem;
  margin-left: 0.5rem;
  align-content: space-between;

  & span {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 600;
    color: #b8bbc2;
  }
`;

export default Home;
