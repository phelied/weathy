import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import API from "../utils/API";

const Geolocalisation = ({ getWeatherData }) => {

  function getLocalisationUser() {
    navigator.geolocation.getCurrentPosition(function (position) {
      API.ApiGetCityFromLocation(
        position.coords.latitude,
        position.coords.longitude
      ).then((data) => {
        getWeatherData(data);
      });
    });
  }

  function errorsLocalisationUser(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const askLocalisationUser = () => {
    if (navigator.geolocation) {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              navigator.geolocation.getCurrentPosition(getLocalisationUser);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                getLocalisationUser,
                errorsLocalisationUser
              );
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
          });
      } else {
        // safari doesn't support permissions.query
        navigator.geolocation.getCurrentPosition(getLocalisationUser);
      }
    } else {
      alert("Sorry Not available!");
    }
  };

  return (
    <button onClick={askLocalisationUser} className="">
      <FontAwesomeIcon className="mr-2.5" icon={faLocationDot} />
    </button>
  );
};

export default Geolocalisation;
