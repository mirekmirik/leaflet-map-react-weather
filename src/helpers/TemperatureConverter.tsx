import React from "react";
import { useAppSelector } from "src/store/hooks";
import { getTemperatureSelector } from "src/store/temperature/temperatureSlice";

interface TemperatureConverterProps {
  temp: number;
}

const TemperatureConverter: React.FC<TemperatureConverterProps> = ({
  temp,
}) => {
  const isCelcium = useAppSelector(
    (rootState) => getTemperatureSelector(rootState).isCelcium
  );

  const toFixedTemp = (temp: number) => {
    const roundedTemp = Math.round(Number(temp));

    return isCelcium
      ? `${roundedTemp} °C`
      : `${toFahrenheitTemp(roundedTemp)} °F`;
  };

  const toFahrenheitTemp = (temp: number) => {
    const fahrenheitTemp = (temp * 9) / 5 + 32;
    return Math.round(fahrenheitTemp);
  };

  return <p>{toFixedTemp(temp)}</p>;
};

export default TemperatureConverter;
