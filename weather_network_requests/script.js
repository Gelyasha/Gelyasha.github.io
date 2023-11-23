const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

const ERROR = {
    INVALID_SEARCH_QUERY: 'The search query must not contain numbers',
    LOCATION_NOT_FOUND: 'Location not found in the database',
    EMPTY_SEARCH_QUERY: 'The search query must not be empty',
}

const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');
const currentCity = document.querySelector('#city');
const searchButton = document.querySelector('#search-button');
const input = document.querySelector('#search-input');

const checkEmptyRequest = (city) => {
    if (!city) {
        throw new Error(ERROR.EMPTY_SEARCH_QUERY)
    };
};

const checkValidRequest = (city) => {
    if (!/^[a-zA-Zа-яА-Я\s]+$/.test(city)) {
        throw new Error(ERROR.INVALID_SEARCH_QUERY)
    };
};

const convert = (temperature) => {
    return Math.round(temperature - 273.15)
};

const findCity = (city) => {
    const url = `${SERVER_URL}?q=${city}&appid=${API_KEY}`;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (!data.name) {
                currentCity.textContent = ERROR.LOCATION_NOT_FOUND;
            }
            currentCity.textContent = data.name;
            temperature.textContent = convert(data.main.temp);
            const weatherCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
        })
        .catch(error => {
            console.log('Error: ' + error.message);
            currentCity.textContent = ERROR.LOCATION_NOT_FOUND;
        })
};

searchButton.addEventListener('click', event => {
    try {
        event.preventDefault();
        const city = input.value.trim();
        checkEmptyRequest(city);
        checkValidRequest(city);
        findCity(city);
    }
    catch (error) {
        currentCity.textContent = error.message;
    }
});
