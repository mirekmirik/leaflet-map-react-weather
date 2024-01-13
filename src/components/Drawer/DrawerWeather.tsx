import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer/drawer";
import { WeatherOfPlace } from "src/api/weather/types";
import CardWeather from "./CardWeather/CardWeather";
import { getFetchHourlyWeather } from "src/api/weather/weather";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  getDrawerSelector,
  setShowDrawer,
  setWeathers,
} from "src/store/drawer/drawerSlice";
import moment from "moment";
import { Button } from "../ui/button/button";
import CloseIcon from "../icons/CloseIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel/carousel";
import { UNSAFE_DataRouterStateContext } from "react-router-dom";

interface DrawerWeatherProps {
  weatherOfPlace: WeatherOfPlace;
}

const DrawerWeather: React.FC<DrawerWeatherProps> = ({ weatherOfPlace }) => {
  const drawer = useAppSelector((rootState) => getDrawerSelector(rootState));
  const dispatch = useAppDispatch();
  const [date, setDate] = useState("");
  const [api, setApi] = React.useState<CarouselApi>();
  const [lengthData, setLengthData] = useState(0);

  const minLengthData = drawer.weathers.cnt / 5;
  const maxLengthData = drawer.weathers.cnt;

  useEffect(() => {
    setLengthData(minLengthData);
  }, [drawer.weathers]);

  useEffect(() => {
    setDate(moment().format("L"));
  }, [drawer.weathers, minLengthData]);

  const setFirstSlide = () => {
    if (api?.canScrollPrev()) {
      while (api.canScrollPrev()) {
        api.scrollPrev();
      }
    }
  };

  const addDay = () => {
    const addedDate = moment(new Date(date)).add("1", "days").format("L");
    setDate(addedDate);
    setFirstSlide();
    setLengthData((prev) => prev + 8);
  };

  const removeDay = () => {
    setDate(moment(new Date(date)).subtract("1", "days").format("L"));
    setFirstSlide();
    setLengthData((prev) => prev - 8);
  };

  useEffect(() => {
    const getHourlyWeathers = async () => {
      if (drawer.isShowDrawer) {
        setDate(moment().format("L"));
        const { lat, lon } = weatherOfPlace.coord;
        const weathers = await getFetchHourlyWeather(lat, lon);
        dispatch(setWeathers(weathers));
      }
    };
    getHourlyWeathers();
  }, [weatherOfPlace, drawer.isShowDrawer, dispatch]);

  const mapWeathers = (date: string) => {
    const todayFormat = date.split("/")[1];
    const data = drawer.weathers.list.filter((list) => {
      const todayRespFormat = list.dt_txt.split(" ")[0].split("-")[2];
      return todayRespFormat === todayFormat;
    });
    return data;
  };

  return (
    <Drawer
      open={drawer.isShowDrawer}
      onClose={() => dispatch(setShowDrawer(false))}
      modal
    >
      <DrawerContent className="pb-20">
        <div className="flex flex-row justify-end pr-5">
          <div
            className="bg-blue-600 px-1 py-1 rounded-full text-white hover:opacity-70 transition cursor-pointer"
            onClick={() => dispatch(setShowDrawer(false))}
          >
            <CloseIcon />
          </div>
        </div>
        <DrawerHeader className="sm:text-center">
          <DrawerTitle className="text-2xl">{weatherOfPlace.name}</DrawerTitle>
          <p>{moment(date).format("LL")}</p>
        </DrawerHeader>
        <div className="flex justify-between mb-2">
          <div>
            <Button disabled={lengthData === minLengthData} onClick={removeDay}>
              Yesterday
            </Button>
          </div>
          <div>
            <Button onClick={addDay} disabled={lengthData === maxLengthData}>
              Tomorrow
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8">
          <div className="lg:flex hidden flex-row gap-3">
            {mapWeathers(date)?.map((weather, i) => (
              <div key={i}>
                <CardWeather mainInfoOfWeather={weather} />
              </div>
            ))}
          </div>

          <div className="max-lg:block hidden">
            <Carousel
              setApi={setApi}
              orientation="horizontal"
              className="w-full max-w-xs max-sm:max-w-[15rem] max-[330px]:max-w-[12rem]"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent className="-mt-1">
                {mapWeathers?.(date)?.map((weather, i) => (
                  <CarouselItem key={i} className="">
                    <div className="p-1 gap-3">
                      <CardWeather mainInfoOfWeather={weather} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWeather;
