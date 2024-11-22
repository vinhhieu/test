interface WeatherSectionProps {
  city: string;
  temperature: number;
  description: string;
}

const WeatherSection: React.FC<WeatherSectionProps> = ({
  city,
  temperature,
  description,
}) => {
  return (
    <div className="flex gap-20 justify-center items-center border">
      <div>
        <h3>{city}</h3>
      </div>
      <div>{temperature}°C</div>
      <div>{description}</div>
    </div>
  );
};

export default WeatherSection;
