export interface IWeatherApiResponse {
  cod: string;
  count: number;
  list: IWeatherData[];
  message: string;
}

export interface IWeatherData {
  name: string;
  main: IMainTag;
  weather: IWeatherTag[];
}

export interface IMainTag {
  temp: number;
}

export interface IWeatherTag {
  description: string;
}

export interface IWeatherItem {
  city: string;
  temperature: number;
  description: string;
}
