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
      <CardHeader className="text-center text-xl">
        {mainInfoOfWeather.dt_txt.split(" ")[1].split(":")[0] +
          ":" +
          mainInfoOfWeather.dt_txt.split(" ")[1].split(":")[1]}
      </CardHeader>
      <div className="flex flex-row items-center justify-center">
        <img
          src={`https://openweathermap.org/img/wn/${mainInfoOfWeather.weather[0].icon}@2x.png`}
          alt={mainInfoOfWeather.weather[0].main}
          width={50}
        />
        <TemperatureConverter temp={mainInfoOfWeather.main.temp} />
      </div>

      <CardContent className="text-center text-sm">
        <div>
          Feels like:{" "}
          <TemperatureConverter temp={mainInfoOfWeather.main.feels_like} />
        </div>

        <div>{mainInfoOfWeather.weather[0].description}</div>
      </CardContent>
      <div className="text-center text-sm text-muted-foreground">
        <div>
          <TemperatureConverter temp={mainInfoOfWeather.main.temp_min} />
          Max Temp:{" "}
          <TemperatureConverter temp={mainInfoOfWeather.main.temp_max} />
        </div>
        <div>
          <p>Wind: {mainInfoOfWeather.wind.speed}m/s</p>
          <p>Visibility: {mainInfoOfWeather.visibility / 100}km</p>
        </div>
      </div>
    </Card>
  );
};

export default CardWeather;
