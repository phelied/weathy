import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import API from '../utils/API';
import Search from './search';

jest.mock("../utils/API", () => ({
    ApiListCities: jest.fn(() =>
        Promise.resolve([
            , {
                "id": 144571,
                "wikiDataId": "Q90", "type": "CITY", "city": "Paris", "name": "Paris", "country": "France", "countryCode":
                    "FR", "region": "Île-de-France", "regionCode": "IDF", "regionWdId": "Q13917", "latitude": 48.8566, "longitude": 2.3522, "population": 2145906
            }, {
                "id": 3100212, "wikiDataId": "Q191066", "type": "CITY",
                "city": "15e arrondissement de Paris",
                "name": "15e arrondissement de Paris", "country": "France", "countryCode": "FR", "region": "Île-de-France", "regionCode": "IDF", "regionWdId": "Q13917", "latitude": 48.8412, "longitude": 2.3003, "population": 230981
            }, {
                "id": 3518354, "wikiDataId": "Q210720", "type": "CITY",
                "city": "20e arrondissement de Paris",
                "name": "20e arrondissement de Paris",
                "country": "France", "countryCode": "FR",
                "region": "Île-de-France", "regionCode": "IDF",
                "regionWdId": "Q13917", "latitude": 48.8646,
                "longitude": 2.3984, "population": 194994
            },
            {
                "id": 3518268, "wikiDataId": "Q200126",
                "type": "CITY", "city": "18e arrondissement de Paris",
                "name": "18e arrondissement de Paris",
                "country": "France", "countryCode": "FR",
                "region": "Île-de-France", "regionCode": "IDF",
                "regionWdId": "Q13917", "latitude": 48.8925,
                "longitude": 2.3444, "population": 192468
            }, {
                "id": 3100225, "wikiDataId": "Q204622",
                "type": "CITY", "city": "19e arrondissement de Paris",
                "name": "19e arrondissement de Paris",
                "country": "France", "countryCode": "FR",
                "region": "Île-de-France", "regionCode": "IDF",
                "regionWdId": "Q13917", "latitude": 48.8817,
                "longitude": 2.3822, "population": 184573
            }]
        )
    ), ApiWeather: jest.fn(() =>
        Promise.resolve({
            "coord": { "lon": 2.35, "lat": 48.85 },
            "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }],
            "base": "stations",
            "main": {
                "temp": 289.15, "feels_like": 288.15, "temp_min": 288.71, "temp_max": 289.82, "pressure": 1016, "humidity": 35
            },
            "visibility": 10000,
            "wind": { "speed": 4.1, "deg": 80 },
            "clouds": { "all": 0 },
            "dt": 1593084982,
            "sys": {
                "type": 1, "id": 6540, "country": "FR", "sunrise": 1593046166, "sunset": 1593099158
            },
            "timezone": 7200,
            "id": 2988507,
            "name": "Paris",
            "cod": 200
        })
    )
}));

describe('Search component', () => {
    const getWeatherData = jest.fn();

    beforeEach(() => {
        render(<Search getWeatherData={getWeatherData} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should renders an input element with a placeholder', () => {
        expect(screen.getByPlaceholderText('Search city ...')).toBeInTheDocument();
    });

    it('should renders a Geolocalisation component', () => {
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should renders a FontAwesomeIcon component', () => {
        expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument();
    });

    it('should updates the wordEntered state on input change', () => {
        const input = screen.getByTestId("search-input");
        fireEvent.change(input, { target: { value: 'Paris' } });
        expect(input).toHaveValue('Paris');
    });

    it("should show Paris, France in the list of results when typing Paris in the search input", async () => {
        const input = screen.getByTestId("search-input");
        expect(input.value).toBe("");
        fireEvent.change(input, { target: { value: "Paris" } });
        expect(input.value).toBe("Paris");
        const results = await screen.findAllByTestId("searched-data-item");
        expect(results).toHaveLength(5);
        expect(results[0]).toHaveTextContent("Paris, France");
    });

    it('should calls the API.ApiListCities method with the correct parameters on input change', async () => {
        jest.useFakeTimers();
        const input = screen.getByTestId("search-input");
        fireEvent.change(input, { target: { value: "Paris" } });
        jest.advanceTimersByTime(500);
        await waitFor(() => {
            expect(API.ApiListCities).toHaveBeenCalledWith('Paris');
        });
    });

    it('should clears the searchedData and wordEntered state when input is empty', async () => {
        jest.useFakeTimers();
        const input = screen.getByTestId("search-input");
        fireEvent.change(input, { target: { value: "Paris" } });
        expect(input.value).toBe("Paris");
        let results = await screen.findAllByTestId("searched-data-item");
        expect(results).toHaveLength(5);
        fireEvent.change(input, { target: { value: "" } });
        jest.advanceTimersByTime(500);
        results = screen.queryByTestId("searched-data-item");
        expect(input.value).toBe("");
        expect(results).toBe(null);
    });

    it('should calls the API.ApiWeather method and clears the searchedData and wordEntered state when handleClick is called', async () => {
        jest.useFakeTimers();
        const input = screen.getByTestId("search-input");
        fireEvent.change(input, { target: { value: "Paris" } });
        let results = await screen.findAllByTestId("searched-data-item");
        expect(results[0]).toHaveTextContent("Paris, France");
        jest.advanceTimersByTime(500);
        fireEvent.click(results[0]);
        waitFor(() => {
            expect(API.ApiWeather).toHaveBeenCalledWith(48.8566, 2.3522);
        });
        expect(input.value).toBe("");
        results = screen.queryByTestId("searched-data-item");
        expect(results).toBe(null);


    });
});
