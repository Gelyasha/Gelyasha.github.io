import { storage } from './storage.js';

const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '40145e66af83d072c56c69457390797f';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const ERROR = {
    INVALID_SEARCH_QUERY: 'The search query must not contain numbers',
    LOCATION_NOT_FOUND: 'Location not found in the database',
    EMPTY_SEARCH_QUERY: 'The search query must not be empty',
    LOCATION_IS_NOT_EXIST: 'There is no location with this name',
}

const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');
const currentCity = document.querySelector('#city');
const searchButton = document.querySelector('#search-button');
const input = document.querySelector('#search-input');
const locations = document.querySelector('#locations-list');
const favoriteLocation = document.querySelector('#favorite-button');
const form = document.querySelector('#search-form');
const feelsLike = document.querySelector('#current-feels-like');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

const forecast1 = document.querySelector('#forecast1');
const forecast2 = document.querySelector('#forecast2');
const forecast3 = document.querySelector('#forecast3');


const addedList = new Set([]);

let uniqueId = 0;

const hours = new Date();
const minutes = new Date();

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
    let savingCity = {};
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (!data.name) {
                currentCity.textContent = ERROR.LOCATION_NOT_FOUND;
            }
            currentCity.textContent = data.name;
            const currentTemperature = convert(data.main.temp);
            temperature.textContent = currentTemperature;
            const weatherCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
            const feelsLikeTemperature = convert(data.main.feels_like);
            feelsLike.textContent = 'Feels like: ' + feelsLikeTemperature;
            const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('ru-RU').slice(0, 5);
            sunrise.textContent = 'Sunrise: ' + sunriseTime;
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('ru-RU').slice(0, 5);
            sunset.textContent = 'Sunset: ' + sunsetTime;
            savingCity = {
                title: data.name,
                currentFeelsLike: feelsLikeTemperature,
                icon: weatherCode,
                currentSunrise: sunriseTime,
                currentSunset: sunsetTime,
                currentTemperature,
            }
        })
        .catch(error => {
            console.log('Error: ' + error.message);
            currentCity.textContent = ERROR.LOCATION_NOT_FOUND;
            favoriteLocation.setAttribute('disabled', 'true')
        });
    const url_p = `${FORECAST_URL}?q=${city}&appid=${API_KEY}`;
    fetch(url_p)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const { list } = data;
            const [date1, date2, date3] = list;
            updateDate(forecast1, date1)
            updateDate(forecast2, date2)
            updateDate(forecast3, date3)
            savingCity.forecastList = [date1, date2, date3];
            storage.saveCurrentCity(savingCity);
        })
};

const updateDate = (forecast, weather) => {
    forecast.children.data.children.time.textContent = new Date(weather.dt * 1000).toLocaleTimeString('ru-RU').slice(0, 5);
    forecast.children.data.children.temperature.textContent = 'Temperature:' + convert(weather.main.temp)
    forecast.children.data.children.feelsLike.textContent = 'Feels like: ' + convert(weather.main.feels_like)
    const weatherCode = weather.weather[0].icon;
    forecast.children.iconWrapper.children.icon.src = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
}

searchButton.addEventListener('click', event => {
    try {
        favoriteLocation.removeAttribute('disabled')
        event.preventDefault();
        const city = input.value.trim();
        checkEmptyRequest(city);
        checkValidRequest(city);
        findCity(city);
    }
    catch (error) {
        currentCity.textContent = error.message;
        favoriteLocation.setAttribute('disabled', 'true')
    }
});

const showCities = () => {
    locations.replaceChildren();
    addedList.forEach(item => {
        createLocation(item)
    })
}

const createLocation = (name) => {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    const title = document.createElement('span');

    title.textContent = name;

    title.addEventListener('click', (event) => {
        const addedCity = title.textContent;
        currentCity.textContent = addedCity;
        input.value = addedCity;
        findCity(addedCity);


    })

    const crossIcon = document.createElement('img');
    crossIcon.src = './img/delete-icon.svg';

    deleteButton.classList.add('icon');
    deleteButton.appendChild(crossIcon);

    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        try {
            addedList.delete(name);
            storage.saveFavoriteLocations(Array.from(addedList));
            showCities();
        } catch (error) {
            alert('Error: ' + error.message);
            console.log(error.message)
        }

    });

    li.classList.add('city-item');
    li.appendChild(title)
    li.appendChild(deleteButton);
    locations.appendChild(li)
};

const addLocationInList = (event) => {
    event.preventDefault();
    const newAddedLocation = currentCity.textContent;

    addedList.add(newAddedLocation);
    console.log('addedList', addedList);
    storage.saveFavoriteLocations(Array.from(addedList));
    showCities();
}

favoriteLocation.addEventListener('click', addLocationInList);

(() => {
    storage.getCurrentCity();
    const { isExist, title, currentFeelsLike, icon, currentSunrise, currentSunset, currentTemperature, forecastList } = storage.currentCity;
    if (!isExist) {
        return
    }
    currentCity.textContent = title;
    temperature.textContent = currentTemperature;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    feelsLike.textContent = 'Feels like: ' + currentFeelsLike;
    sunrise.textContent = 'Sunrise: ' + currentSunrise;
    sunset.textContent = 'Sunset: ' + currentSunset;

    const [date1, date2, date3] = forecastList;
    updateDate(forecast1, date1);
    updateDate(forecast2, date2);
    updateDate(forecast3, date3);
})();

(() => {
    storage.getFavoriteLocations();
    const favoriteLocations = storage.favoriteLocations;
    console.log(storage.favoriteLocations)
    favoriteLocations.forEach(item => {
        addedList.add(item)
    })
    showCities();
})();
