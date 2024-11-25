export default class WeatherConfig {
    static API_KEY_STORAGE_KEY = "weather_api_key"

    getConfig() {
        const key = window.localStorage.getItem(WeatherConfig.API_KEY_STORAGE_KEY);

        if (!key) {
            return false;
        }

         //id for Krakow
        return {
            apiUrl: `https://api.openweathermap.org/data/2.5/weather?id=3094802&units=metric&appid=${key}`
        }
    }

    setApiKey(key: string) {
        window.localStorage.setItem(WeatherConfig.API_KEY_STORAGE_KEY, key);
    }
}