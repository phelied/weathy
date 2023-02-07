const ForecastItem = (props) => {
    const day = props.day;
    return (
        <div className='forecast-weather-item' key={new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(day.dt * 1000))}>
            {/* {console.log(day)} */}
            <span className='forecast-weather-item-day'>{new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(day.dt * 1000)).substring(0, 4)}.</span>
            <img className='forecast-weather-item-icon' alt='weather-icon' src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} />
            <span className='forecast-weather-item-temp'>{Math.round(day.temp.min)}°• {Math.round(day.temp.max)}°</span>
            <div className="forecast-weather-item-feels-like">
                <span className='forecast-weather- item-title'>FEELS LIKE</span>
                <span className='forecast-weather-item-value'>{day.feels_like.day}</span>
            </div>
            <div className='forecast-weather-item-wind'>
                <span className='forecast-weather-item-title'>WIND</span>
                <span className='forecast-weather-item-value'>{day.wind_speed}</span>
            </div>
            <div className="forecast-weather-item-humidity">
                <span className='forecast-weather-item-title'>HUMIDITY</span>
                <span className='forecast-weather-item-value'>{day.humidity}</span>
            </div>
        </div>
    );
}

export default ForecastItem;