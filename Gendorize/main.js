const SERVER_URL = 'https://api.genderize.io';

const ERROR = {
    INVALID_SEARCH_QUERY: 'The search query must not contain Cyrillic alphabet or numbers',
    EMPTY_SEARCH_QUERY: 'The search query must not be empty',
    NAME_NOT_FOUND: 'Name not found in the database',
}

const input = document.querySelector('#search-input');
const requestButton = document.querySelector('#request-button');
const result = document.querySelector('#request-result')

const checkValidRequest = (firstName) => {
    if (!/^[a-zA-Z]+$/.test(firstName)) {
        throw new Error(ERROR.INVALID_SEARCH_QUERY);
    };
};

const checkEmptyRequest = (firstName) => {
    if (!firstName) {
        throw new Error(ERROR.EMPTY_SEARCH_QUERY);
    };
};

requestButton.addEventListener('click', (event) => {
    try {
        event.preventDefault();
        firstName = input.value;
        checkEmptyRequest(firstName);
        checkValidRequest(firstName);
        findOutGender(firstName);
    } catch (error) {
        result.textContent = error.message;
        console.log(error.message);
    }
})

const findOutGender = (firstName) => {
    const url = `${SERVER_URL}?name=${firstName}`;
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (!data.gender) {
                result.textContent = ERROR.NAME_NOT_FOUND;
                return
            }
            result.textContent = data.gender;
        })
        .catch(error => {
            console.log(error.message);
            result.textContent = error.message;
        })
};