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

    return (
        <div
            className={styles.weatherWrapper}
            onClick={() => {
                setIsConfigVisible(true)
            }}
        >
            <div>
                <div>current:</div>
                {weatherData?.main?.temp && <div className={styles.temperature}>temp: {weatherData?.main?.temp}</div>}
                {weatherData?.main?.humidity &&
                    <div className={styles.humidity}>humidity: {weatherData?.main?.humidity}</div>}
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
