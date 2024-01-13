import { WeatherOfPlace } from "src/api/weather/types";
import TemperatureConverter from "src/helpers/TemperatureConverter";

interface CustomTooltipProps {
  data: WeatherOfPlace;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ data }) => {
  return (
    <div className="flex flex-col min-w-[55px] w-auto">
      <p className="text-orange-300 font-bold">{data.name}</p>
      <div className="flex flex-row items-center gap-[2px]">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          width={40}
          alt={data.weather[0].main}
        />
        <TemperatureConverter temp={data.main.temp} />
      </div>
    </div>
  );
};

export default CustomTooltip;