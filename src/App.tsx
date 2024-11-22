import React, { useState } from 'react';
import { fetchWeatherData } from './services/weatherService';
import WeatherSearch from './features/WeatherSearch';
import WeatherSection from './features/WeatherItem';
import { IWeatherItem } from './entities/weather/model/weather';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<IWeatherItem[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (city: string) => {
    if (!city || city.length < 3) {
      setError('Please search with city at least with 3 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data: IWeatherItem[] = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container gap-20">
      <h1>Weather App</h1>
      <WeatherSearch onSearch={handleSearch} />
      {error && <div className="error">{error}</div>}
      <div className="relative">
        <div className="flex flex-col gap-20">
          {weatherData &&
            weatherData.length > 0 &&
            weatherData?.map((weatherItem: IWeatherItem, index: number) => {
              return <WeatherSection key={index} {...weatherItem} />;
            })}
          {weatherData?.length === 0 && <>Not found</>}
        </div>
        {loading && <div className="lds-dual-ring"></div>}
      </div>
    </div>
  );
};

export default App;
