import moment from "moment";
import React from "react";
import { MainInfoOfWeather } from "src/api/weather/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/card/Card";
import TemperatureConverter from "src/helpers/TemperatureConverter";


interface CardWeatherProps {
  mainInfoOfWeather: MainInfoOfWeather;
}

const CardWeather: React.FC<CardWeatherProps> = ({ mainInfoOfWeather }) => {
  return (
    <Card className="pb-4">
      <CardHeader>
        <p className="text-center text-xl">
          {mainInfoOfWeather.dt_txt.split(" ")[1].split(":")[0] +
            ":" +
            mainInfoOfWeather.dt_txt.split(" ")[1].split(":")[1]}
        </p>
      </CardHeader>
      <div className="flex flex-row items-center justify-center">
        <img
          src={`https://openweathermap.org/img/wn/${mainInfoOfWeather.weather[0].icon}@2x.png`}
          alt={mainInfoOfWeather.weather[0].main}
          width={50}
        />
        <CardTitle>
          <TemperatureConverter temp={mainInfoOfWeather.main.temp} />
        </CardTitle>
      </div>

      <CardContent className="text-center text-sm">
        <div>
          Feels like:{" "}
          <TemperatureConverter temp={mainInfoOfWeather.main.feels_like} />
        </div>

        <div>{mainInfoOfWeather.weather[0].description}</div>
      </CardContent>
      <CardDescription className="text-center">
        <div>
          <p>
            <TemperatureConverter temp={mainInfoOfWeather.main.temp_min} />
          </p>
          <p>
            Max Temp:{" "}
            <TemperatureConverter temp={mainInfoOfWeather.main.temp_max} />
          </p>
        </div>
        <div>
          <p>Wind: {mainInfoOfWeather.wind.speed}m/s</p>
          <p>Visibility: {mainInfoOfWeather.visibility / 100}km</p>
        </div>
      </CardDescription>
    </Card>
  );
};

export default CardWeather;
