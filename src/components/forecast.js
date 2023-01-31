import ForecastItem from "./forecastItem";

const Forecast = (props) => {
    let weatherData = props.weatherData;
    return (
        <div className='forecast-weather'>
            {weatherData && weatherData.length !== 0 ? (
                weatherData.daily.slice(1, 6).map((day) => (
                    <ForecastItem day={day} />
                ))) :
                (
                    <>
                        {Array.from(Array(5).keys()).map((day) => (
                            <div className='forecast-weather-item' key={day}>
                                <span className='forecast-weather-item-day'>--</span>
                                <span className='forecast-weather-item-temp'>--</span>
                                <span className='forecast-weather-item-temp'>--</span>
                                <div className="forecast-weather-item-feels-like">
                                    <span className='forecast-weather- item-title'>FEELS LIKE</span>
                                    <span className='forecast-weather-item-value'>--</span>
                                </div>
                                <div className='forecast-weather-item-wind'>
                                    <span className='forecast-weather-item-title'>WIND</span>
                                    <span className='forecast-weather-item-value'>--</span>
                                </div>
                                <div className="forecast-weather-item-humidity">
                                    <span className='forecast-weather-item-title'>HUMIDITY</span>
                                    <span className='forecast-weather-item-value'>--</span>
                                </div>
                            </div>
                        ))}
                    </>
                )}
        </div>
    );
}

export default Forecast;