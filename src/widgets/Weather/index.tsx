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

        if (previousWeatherData && ((Date.now() - previousWeatherData?.setTime) / 1000 < 60 * 10)) {
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

    const wetherConditions = weatherData?.condition?.length ? weatherData?.weather[0] : null;

    return (
        <div
            className={styles.weatherWrapper}
            onClick={() => {
                setIsConfigVisible(true)
            }}
        >
            <div className={styles.currentWeather}>
                <div className={styles.generalData}>
                    {weatherData?.current?.temp_c &&
                        <div className={styles.temperature}>{weatherData?.current?.temp_c}&deg;C</div>}
                    {weatherData?.current?.feelslike_c && <div className={styles.temperatureFeals}>Feels
                        like: {weatherData?.current?.feelslike_c}&deg;C</div>}

                    <div className={styles.temMinMax}>
                        {weatherData?.forecast?.forecastday[0].day.mintemp_c &&
                            <div
                                className={styles.tempMin}>min: {weatherData?.forecast?.forecastday[0].day.mintemp_c}&deg;C</div>}
                        {weatherData?.forecast?.forecastday[0].day.maxtemp_c &&
                            <div
                                className={styles.tempMax}>max: {weatherData?.forecast?.forecastday[0].day.maxtemp_c}&deg;C</div>}
                    </div>

                    {weatherData?.current?.humidity &&
                        <div className={styles.humidity}>{weatherData?.current?.humidity}%</div>}
                </div>

                {weatherData?.current?.condition && (<div className={styles.weatherConditions}>
                    <div>
                        <img alt="wether icon" src={weatherData.current.condition.icon.replace('64x64','128x128')}></img>
                    </div>
                    <div>{weatherData.current.condition.text}</div>
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
                    getWeatherData()
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
