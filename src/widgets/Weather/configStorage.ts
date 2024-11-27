export default class WeatherConfig {
    static API_KEY_STORAGE_KEY = "weather_api_key"

    getConfig() {
        const key = window.localStorage.getItem(WeatherConfig.API_KEY_STORAGE_KEY);

        if (!key) {
            return false;
        }

        //id for Krakow
        //https://api.openweathermap.org/data/2.5/forecast?id=3094802&units=metric&appid=
        //https://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=5&units=metric&appid=
        //https://api.openweathermap.org/data/2.5/weather?id=3094802&units=metric&appid=${key}`

        return {
            apiUrl: `https://api.weatherapi.com/v1/forecast.json?q=50.0379009%2C19.99330&days=3&key=${key}`
        }
    }

    setApiKey(key: string) {
        window.localStorage.setItem(WeatherConfig.API_KEY_STORAGE_KEY, key);
    }
}