import React, { useState } from 'react';

interface WeatherSearchProps {
  onSearch: (city: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-20">
      <input
        className="p-10"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default WeatherSearch;
