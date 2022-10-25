import API from "../hooks/utils/API";

function getLocalisationUser() {
  return navigator.geolocation.getCurrentPosition(async function (position) {
    const data = await API.ApiWeather(
      position.coords.latitude,
      position.coords.longitude
    );
    return data;
  });
}

function errorsLocalisationUser(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// get the localisation of the user
const askLocalisationUser = () => {
  //   let data;

  if (navigator.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
         console.log(navigator.geolocation.getCurrentPosition(getLocalisationUser));
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            getLocalisationUser,
            errorsLocalisationUser
          );
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
        }
        result.onchange = function () {
          console.log(result.state);
        };
      });
  } else {
    alert("Sorry Not available!");
  }
};

export default askLocalisationUser;
