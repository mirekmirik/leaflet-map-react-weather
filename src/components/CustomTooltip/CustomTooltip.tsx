import { WeatherOfPlace } from "src/api/weather/types";
import { WeatherOfCity } from "../../data/types";
import { toFixedTemp } from "../../helpers/helpers";

interface CustomTooltipProps {
  // data: WeatherOfCity;
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
        />
        <p>{toFixedTemp(data.main.temp)}</p>
      </div>
    </div>
  );
};

export default CustomTooltip;
