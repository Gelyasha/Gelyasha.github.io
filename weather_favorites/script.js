const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

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
// const exampleCity = document.querySelector('#city');
const form = document.querySelector('#search-form');

const addedList = [];

let uniqueId = 0;

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
            favoriteLocation.setAttribute('disabled', 'true')
        })
};

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
        createLocation(item.id, item.name)
    })
}

const createLocation = (id, name) => {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    const title = document.createElement('span');

    title.textContent = name;

    title.addEventListener('click', (event) => {
        console.log('click')
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
        const cityIndex = addedList.findIndex(item => item.id === id);
        try {
            if (cityIndex >= 0) {
                addedList.splice(cityIndex, 1);
            } else {
                throw new Error(ERROR.LOCATION_IS_NOT_EXIST);
            };
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
    const isExist = addedList.some(city => {
        return city.name === newAddedLocation
    })

    if (isExist) {
        return
    }

    const newLocation = { id: ++uniqueId, name: newAddedLocation };
    addedList.push(newLocation);
    showCities();
}

favoriteLocation.addEventListener('click', addLocationInList);