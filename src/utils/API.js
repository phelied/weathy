import axios from "axios";
import { defaultCity } from "./const";

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
        // let urls = [
        //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
        //     `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
        //     `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
        // ];
        try {

            // const requests = urls.map((url) => axios.get(url));
            const response = await axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
            const airPollution = await axios
                .get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
            const forecastData = await axios
                .get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
            response['data']['forecast'] = forecastData.data.list[16]
            response['data']['air'] = airPollution.data.list[0]
            return (response.data);
        } catch (error) {
            console.error(error);
        }
    },
    ApiGetCityFromLocation: async (latitude, longitude) => {
        const opencage = require('opencage-api-client');
        let cityName = await opencage
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
        return cityName;
    }
}

export default API;