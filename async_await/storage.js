// storage.saveFavoriteCities(favoriteCities)
// const favoriteCities = storage.getFavoriteCities();
// const currentCity = storage.getCurrentCity();

const CURRENT_CITY_KEY = 'currentCity';
const LOCATION_KEY = 'favoriteLocations';

const storage = {
    currentCity: {
        isExist: false,
    },
    favoriteLocations: [

    ],
    getCurrentCity() {
        const item = localStorage.getItem(CURRENT_CITY_KEY);
        if (!item) {
            this.currentCity = {
                isExist: false,
            }
        } else {
            const city = JSON.parse(item);
            this.currentCity = {
                ...city,
                isExist: true,
            };
        }
    },

    getFavoriteLocations(){
        const items = localStorage.getItem(LOCATION_KEY);
        if (!items) {
            this.favoriteLocations = []
        } else {
            const newAddedLocations = JSON.parse(items);
            this.favoriteLocations = newAddedLocations;
        }
    },

    saveCurrentCity(city) {
        const json = JSON.stringify(city);
        localStorage.setItem(CURRENT_CITY_KEY, json)
    },
    saveFavoriteLocations(newAddedLocations) {
        const locations = JSON.stringify(newAddedLocations);
        localStorage.setItem(LOCATION_KEY, locations);
    }
}


export { storage } 