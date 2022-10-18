import axios from "axios";


export default {
    ApiCities: async (city) => {
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
    }
}