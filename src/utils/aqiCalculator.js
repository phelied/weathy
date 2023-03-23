export const calculateAQI = (pm2_5) => {
    let aqi = 0;

    const interpolate = (value, low1, high1, low2, high2) => {
        return Math.round(((value - low1) * (high2 - low2)) / (high1 - low1) + low2);
    };

    if (pm2_5 >= 0 && pm2_5 <= 12.0) {
        aqi = interpolate(pm2_5, 0, 12.0, 0, 50);
    } else if (pm2_5 > 12.0 && pm2_5 <= 35.4) {
        aqi = interpolate(pm2_5, 12.1, 35.4, 51, 100);
    } else if (pm2_5 > 35.4 && pm2_5 <= 55.4) {
        aqi = interpolate(pm2_5, 35.5, 55.4, 101, 150);
    } else if (pm2_5 > 55.4 && pm2_5 <= 150.4) {
        aqi = interpolate(pm2_5, 55.5, 150.4, 151, 200);
    } else if (pm2_5 > 150.4 && pm2_5 <= 250.4) {
        aqi = interpolate(pm2_5, 150.5, 250.4, 201, 300);
    } else if (pm2_5 > 250.4 && pm2_5 <= 350.4) {
        aqi = interpolate(pm2_5, 250.5, 350.4, 301, 400);
    } else if (pm2_5 > 350.4 && pm2_5 <= 500.4) {
        aqi = interpolate(pm2_5, 350.5, 500.4, 401, 500);
    } else {
        aqi = "N/A";
    }
    return aqi;
};