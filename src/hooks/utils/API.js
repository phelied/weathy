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
    ApiWeather: async (latitude, longitude) => {
        try {
            const response = await axios
                .request(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
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