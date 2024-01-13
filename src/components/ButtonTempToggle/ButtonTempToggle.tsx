import { Button } from "src/components/ui/button/button";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  getTemperatureSelector,
  toggleFormatTemperature,
} from "src/store/temperature/temperatureSlice";

function ButtonTempToggle() {
  const temperature = useAppSelector((rootState) =>
    getTemperatureSelector(rootState)
  );
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => dispatch(toggleFormatTemperature())}
    >
      {temperature.isCelcium ? `°F` : `°C`}
    </Button>
  );
}

export default ButtonTempToggle;
