import axios from "axios";
import { useState } from 'react';

export const ApiWeather = () => {

}

export const ApiCities = (city) => {
}


export default {
    ApiCities: (city) => {

        const options = {
            method: "GET",
            url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
            params: { sort: "elevation", namePrefix: city, limit: "5", languageCode: 'fr' },
            headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_GEO_DB_API_KEY
                ,
                "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
        };

        return axios
            .request(options)
            .then(function (response) {
                return (response.data.data);
             
            })
            .catch(function (error) {
                console.error(error);
            });

    },
    otherApiCall: (params) => {
    }
}