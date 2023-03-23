export const calculateAQI = (components) => {
    // convertir les concentrations de μg/m3 à ppm
    const co = components.co / 1000;
    const no2 = components.no2 / 1000;
    const o3 = components.o3 / 1000;
    const so2 = components.so2 / 1000;
    const pm25 = components.pm2_5;
    const pm10 = components.pm10;

    // calculer l'Air Quality Index (AQI) pour chaque polluant
    const coAQI = calculatePollutantAQI(co, "co");
    const no2AQI = calculatePollutantAQI(no2, "no2");
    const o3AQI = calculatePollutantAQI(o3, "o3");
    const so2AQI = calculatePollutantAQI(so2, "so2");
    const pm25AQI = calculatePollutantAQI(pm25, "pm25");
    const pm10AQI = calculatePollutantAQI(pm10, "pm10");

    const averageAQI = (coAQI + no2AQI + o3AQI + so2AQI + pm25AQI + pm10AQI) / 6;

    return Math.floor(averageAQI);
}

// fonction pour calculer l'indice de qualité de l'air pour un polluant donné
function calculatePollutantAQI(concentration, pollutant) {
    const breakpoints = getBreakpoints(pollutant);

    // trouver les deux seuils de concentration les plus proches de la concentration donnée
    let lowerBreakpoint, upperBreakpoint;
    for (let i = 0; i < breakpoints.length - 1; i++) {
        if (concentration >= breakpoints[i].value && concentration <= breakpoints[i + 1].value) {
            lowerBreakpoint = breakpoints[i];
            upperBreakpoint = breakpoints[i + 1];
            break;
        }
    }

    // calculer l'Air Quality Index (AQI) correspondant à la concentration donnée
    const aqi =
        ((upperBreakpoint.aqi - lowerBreakpoint.aqi) / (upperBreakpoint.value - lowerBreakpoint.value)) *
        (concentration - lowerBreakpoint.value) +
        lowerBreakpoint.aqi;

    return aqi;
}

// fonction pour obtenir les seuils de concentration pour un polluant donné
function getBreakpoints(pollutant) {
    switch (pollutant) {
        case "co":
            return [
                { value: 0, aqi: 0 },
                { value: 4.5, aqi: 50 },
                { value: 9.5, aqi: 100 },
                { value: 12.5, aqi: 150 },
                { value: 15.5, aqi: 200 },
                { value: 30.5, aqi: 300 },
                { value: 40.5, aqi: 400 },
                { value: 50.5, aqi: 500 },
            ];
        case "no2":
            return [
                { value: 0, aqi: 0 },
                { value: 0.054, aqi: 50 },
                { value: 0.101, aqi: 100 },
                { value: 0.361, aqi: 150 },
                { value: 0.65, aqi: 200 },
                { value: 1.25, aqi: 300 },
                { value: 1.65, aqi: 400 },
                { value: 2.049, aqi: 500 },
            ];
        case "o3":
            return [
                { value: 0, aqi: 0 },
                { value: 0.055, aqi: 50 },
                { value: 0.071, aqi: 100 },
                { value: 0.086, aqi: 150 },
                { value: 0.106, aqi: 200 },
                { value: 0.201, aqi: 300 },
                { value: 0.405, aqi: 400 },
                { value: 0.505, aqi: 500 },
            ];
        case "so2":
            return [
                { value: 0, aqi: 0 },
                { value: 0.036, aqi: 50 },
                { value: 0.076, aqi: 100 },
                { value: 0.186, aqi: 150 },
                { value: 0.305, aqi: 200 },
                { value: 0.605, aqi: 300 },
                { value: 0.805, aqi: 400 },
                { value: 1.005, aqi: 500 },
            ];
        case "pm25":
            return [
                { value: 0, aqi: 0 },
                { value: 12.1, aqi: 50 },
                { value: 35.5, aqi: 100 },
                { value: 55.5, aqi: 150 },
                { value: 150.5, aqi: 200 },
                { value: 250.5, aqi: 300 },
                { value: 350.5, aqi: 400 },
                { value: 500.5, aqi: 500 },
            ];
        case "pm10":
            return [
                { value: 0, aqi: 0 },
                { value: 54, aqi: 50 },
                { value: 154, aqi: 100 },
                { value: 254, aqi: 150 },
                { value: 354, aqi: 200 },
                { value: 424, aqi: 300 },
                { value: 504, aqi: 400 },
                { value: 604, aqi: 500 },
            ];
        default:
            throw new Error(`Pollutant ${pollutant} not supported`);
    }
}