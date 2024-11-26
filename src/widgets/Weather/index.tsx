import React, {useEffect, useState} from 'react';
import styles from './index.module.css'
import classNames from 'classnames';
import WeatherConfig from './configStorage';
import WeatherDataStore from './weatherDataStore';

const configProvider: WeatherConfig = new WeatherConfig();
const weatherDataStore = new WeatherDataStore();

const Weather = () => {
    const [isConfigVisible, setIsConfigVisible] = useState(false);
    const [newApiKey, setNewApiKey] = useState('');
    const [weatherData, setWeatherData] = useState<any>({});

    const getWeatherData = () => {
        const previousWeatherData: any = weatherDataStore.getData();

        console.log("previousWeatherData");
        console.log(previousWeatherData);

        if (previousWeatherData && ((Date.now() - previousWeatherData?.setTime) / 1000 < 600)) {
            setWeatherData(previousWeatherData.rawData);

            return;
        }

        const config = configProvider.getConfig();


        if (!config) {
            return;
        }

        fetch(config.apiUrl)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("-=-=-=-=-=-=-=-=-=-=-11112222");
                console.log(data);
                weatherDataStore.saveData(data);

                setWeatherData(data);
            })
    };

    useEffect(() => {
        console.log("+++++++");
        getWeatherData();
        const updateWeatherDataInterval = setInterval(getWeatherData, (1000 * 60));

        return (() => {
            return clearInterval(updateWeatherDataInterval)
        });
    }, [])

    const wetherConditions = weatherData?.weather?.length?weatherData?.weather[0]:null;

    return (
        <div
            className={styles.weatherWrapper}
            onClick={() => {
                setIsConfigVisible(true)
            }}
        >
            <div className={styles.currentWeather}>
                {/*<div>current:</div>*/}
                {weatherData?.main?.temp &&
                    <div className={styles.temperature}>{weatherData?.main?.temp.toFixed(1)}&deg;C</div>}
                {weatherData?.main?.feels_like && <div className={styles.temperatureFeals}>Feels
                    like: {weatherData?.main?.feels_like.toFixed(1)}&deg;C</div>}
                {weatherData?.main?.temp_min &&
                    <div className={styles.tempMin}>min: {weatherData?.main?.temp_min.toFixed(1)}&deg;C</div>}
                {weatherData?.main?.temp_max &&
                    <div className={styles.tempMax}>max: {weatherData?.main?.temp_max.toFixed(1)}&deg;C</div>}
                {weatherData?.main?.humidity && <div className={styles.humidity}>{weatherData?.main?.humidity}%</div>}
                {wetherConditions && (<div className={styles.weatherConditions}>
                    <div>
                        <img alt="wether icon" src={`https://openweathermap.org/img/wn/${wetherConditions.icon}@2x.png`}></img>
                    </div>
                    <div>{wetherConditions.main} ({wetherConditions.description})</div>
                </div>)}
            </div>

            {isConfigVisible && (<div className={classNames(styles.configWindow)}>
                <div style={{fontSize: "30px", color: "#fff"}} onClick={(event) => {
                    event.stopPropagation()
                    setIsConfigVisible(false)
                }}>close
                </div>
                <input
                    type="text"
                    style={{fontSize: "30px", marginTop: "20px"}}
                    value={newApiKey}
                    onChange={(event) => {
                        setNewApiKey(event.target.value)
                        console.log(event.target.value)
                    }}
                />
                <button style={{fontSize: "30px", color: "#fff"}} onClick={(event) => {
                    event.stopPropagation()
                    configProvider.setApiKey(newApiKey)
                    setNewApiKey('')
                }}>
                    Set
                </button>
            </div>)}
        </div>
    )
        ;
}

export default Weather;
