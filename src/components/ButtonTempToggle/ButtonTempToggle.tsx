import { Button } from "src/components/ui/button/button";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { toggleFormatTemperature } from "src/store/temperature/temperatureSlice";

function ButtonTempToggle() {
  const { temperature } = useAppSelector((state) => state);
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
