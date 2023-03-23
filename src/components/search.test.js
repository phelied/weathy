import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import API from '../utils/API';
import Search from './search';

describe('Search component', () => {
    const getWeatherData = jest.fn();

    beforeEach(() => {
        render(<Search getWeatherData={getWeatherData} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders an input element with a placeholder', () => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search city ...')).toBeInTheDocument();
    });

    it('renders a Geolocalisation component', () => {
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders a FontAwesomeIcon component', () => {
        expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument();
    });

    //   it('renders a SelectData component when searchedData is present', () => {
    //     const { container } = render(<Search getWeatherData={getWeatherData} />);
    //     container.querySelector('input').value = 'Paris';
    //     fireEvent.change(container.querySelector('input'));
    //     expect(screen.getByText('Paris, France')).toBeInTheDocument();
    //   });

    

    //   it('updates the wordEntered state on input change', () => {
    //     const input = screen.getByRole('textbox');
    //     fireEvent.change(input, { target: { value: 'Paris' } });
    //     expect(input).toHaveValue('Paris');
    //   });

    //   it('calls the API.ApiListCities method with the correct parameters on input change', () => {
    //     const input = screen.getByRole('textbox');
    //     fireEvent.change(input, { target: { value: 'Paris' } });
    //     expect(API.ApiListCities).toHaveBeenCalledWith('Paris');
    //   });

    //   it('clears the searchedData and wordEntered state when clearInput is called', () => {
    //     const { container } = render(<Search getWeatherData={getWeatherData} />);
    //     container.querySelector('input').value = 'Paris';
    //     fireEvent.change(container.querySelector('input'));
    //     const button = screen.getByText('Clear');
    //     fireEvent.click(button);
    //     expect(container.querySelector('input')).toHaveValue('');
    //   });

    //   it('calls the API.ApiWeather method and clears the searchedData and wordEntered state when handleClick is called', async () => {
    //     const data = { name: 'Paris', main: { temp: 20 } };
    //     API.ApiWeather.mockResolvedValueOnce(data);
    //     const { container } = render(<Search getWeatherData={getWeatherData} />);
    //     container.querySelector('input').value = 'Paris';
    //     fireEvent.change(container.querySelector('input'));
    //     const searchButton = screen.getByTestId('search-icon');
    //     fireEvent.click(searchButton);
    //     expect(API.ApiWeather).toHaveBeenCalledWith(48.8566, 2.3522);
    //     expect(getWeatherData).toHaveBeenCalledWith(data);
    //     expect(container.querySelector('input')).toHaveValue('');
    //   });
});
