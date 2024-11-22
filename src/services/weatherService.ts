import { API_KEY, BASE_URL } from '../app/constant';
import {
  IWeatherApiResponse,
  IWeatherData,
} from '../entities/weather/model/weather';

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data: IWeatherApiResponse = await response.json();
    if (data.list.length > 0) {
      return data.list.map((item: IWeatherData) => {
        return {
          city: item.name,
          temperature: item.main.temp,
          description: item.weather[0].description,
        };
      });
    }
    return [];
  } catch (error) {
    throw error;
  }
};
