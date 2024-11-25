export default class WeatherDataStore {
    static STORAGE_KEY = "weather_data"

    saveData(data: any) {
        window.localStorage.setItem(WeatherDataStore.STORAGE_KEY, JSON.stringify({
            setTime: Date.now(),
            rawData: data
        }));
    }

    getData() {
        const data = window.localStorage.getItem(WeatherDataStore.STORAGE_KEY)
        if (data) {
            return JSON.parse(data);
        }

        return null;
    }
}

