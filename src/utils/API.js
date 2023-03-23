import axios from "axios";

const API = {
    ApiListCities: async (city) => {
        const options = {
            method: "GET",
            url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
            params: { includeDeleted: 'ALL', sort: '-population', types: 'CITY', namePrefix: city, limit: "5", languageCode: 'fr' },
            headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_GEO_DB_API_KEY
                ,
                "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
        };

        try {
            const response = await axios
                .request(options);
            return (response.data.data);
        } catch (error) {
            console.error(error);
        }
    },
    ApiWeather: async (lat, lon) => {
        const urls = [
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`),
            axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`),
            axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`),
        ];
        try {
            const [response, airPollution, forecastData] = await Promise.all(urls);
            response.data.forecast = forecastData.data.list[16]
            response.data.air = airPollution.data.list[0]
            return (response.data);
        } catch (error) {
            console.error(error);
        }
    },
    ApiGetCityFromLocation: async (latitude, longitude) => {
        const opencage = require('opencage-api-client');
        const cityName = await opencage
            .geocode({ q: [latitude, longitude], key: process.env.REACT_APP_OPENCAGE_API_KEY })
            .then((data) => {
                if (Object.prototype.hasOwnProperty.call(data.results[0].components, "city")) {
                    return data.results[0].components.city;
                }
                return data.results[0].components.county;

            })
            .catch((error) => {
                console.log('error', error.message);
            });
            const response = await API.ApiWeather(latitude, longitude);
            response.data.name = cityName;

        return response;
    }
}

export default API;