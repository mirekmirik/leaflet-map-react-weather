import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";

import {
  MapContainer,
  Marker,
  TileLayer,
  GeoJSON,
  useMapEvent,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet";
import { GeoJsonObject } from "geojson";
import UkraineBorders from "../../data/geoUkraine.json";
import { locationsOfCities } from "../../data/data";
import { POSITION, ZOOM } from "../../settings/map";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { useToast } from "../../hooks/use-toast";
import { ToastAction } from "../ui/toaster/toast";
import { useSearchParams } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import SearchCities from "../SearchCities/SearchCities";
import { useTheme } from "../theme-provider";
import { getFetchWeather } from "src/api/weather/weather";
import { WeatherOfPlace } from "src/api/weather/types";
import DrawerWeather from "../Drawer/DrawerWeather";
import { useAppDispatch } from "src/store/hooks";
import { setShowDrawer } from "src/store/drawer/drawerSlice";
import ButtonTempToggle from "../ButtonTempToggle/ButtonTempToggle";
import { Progress } from "../ui/progress/progress";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const [geoJSON, setGeoJSON] = useState(UkraineBorders as GeoJsonObject);
  const [weatherOfCities, setWeatherOfCities] = useState<WeatherOfPlace[]>([]);
  const [isTransformed, setIsTransformed] = useState(false);
  const dispatch = useAppDispatch();

  const [progress, setProgress] = useState(13);

  useEffect(() => {
    let timer: any = 0;
    if (!isTransformed) {
      timer = setTimeout(() => setProgress(66), 500);
    }
    timer = setTimeout(() => setProgress(100), 1000);
    return () => clearTimeout(timer);
  }, [isTransformed]);

  useEffect(() => {
    getInitialFetchWeather();
  }, []);

  useEffect(() => {
    if (weatherOfCities.length) {
      transformGeoJson();
    }
  }, [weatherOfCities]);

  const initialUrlPosition = useMemo((): LatLngTuple => {
    const lat = Number(searchParams.get("lat"));
    const lng = Number(searchParams.get("lng"));
    if (!lat || !lng) {
      const [defaultLat, defaultLng] = POSITION;
      const zoom = ZOOM;
      setSearchParams({
        lat: defaultLat.toString(),
        lng: defaultLng.toString(),
        zoom: zoom.toString(),
      });
      return [defaultLat, defaultLng];
    }
    return [lat, lng];
  }, [isTransformed]);

  const initialUrlZoom = useMemo(() => {
    const zoom = Number(searchParams.get("zoom"));
    if (!zoom) return ZOOM;
    return zoom;
  }, [isTransformed]);

  const mapPolygonColorToDensity = (temp: number) => {
    const density = Number(temp?.toFixed(0));
    if (density <= -10) {
      return "#2c7fb8";
    } else if (density <= -5) {
      return "#41b6c4";
    } else if (density <= 0) {
      return "#7fcdbb";
    } else if (density <= 5) {
      return "#c7e9b4";
    } else if (density <= 10) {
      return "#ffffcc";
    } else {
      return "#fff";
    }
  };

  const style = (feature: any) => {
    return {
      fillColor: mapPolygonColorToDensity(feature.temp),
      weight: 1,
      opacity: 1,
      color: theme === "light" ? "black" : "#bebebe",
      dashArray: "2",
      fillOpacity: 0.5,
    };
  };

  const transformGeoJson = () => {
    const newGeoJSON = weatherOfCities
      .map((data) => {
        // @ts-ignore
        const findElement = geoJSON.features.find((feature: any) => {
          const shapeName = feature.properties.shapeName;
          const weatherCityName = data.name;
          return (
            shapeName.split(" ")[0].slice(0, 7) === weatherCityName.slice(0, 7)
          );
        });
        if (findElement) {
          return { ...findElement, temp: data.main.temp };
        }
      })
      .filter((geojson) => geojson !== undefined);

    const kyivGeoJSON = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [30.8275783, 50.4053995],
            [30.826138, 50.4045662],
            [30.8215047, 50.4082731],
            [30.8105971, 50.4107237],
            [30.8086617, 50.4096191],
            [30.7981798, 50.4153223],
            [30.7961902, 50.4176282],
            [30.801033, 50.4207558],
            [30.8021656, 50.42301830000001],
            [30.7997731, 50.4249833],
            [30.8015562, 50.4268059],
            [30.7920129, 50.4338555],
            [30.7899094, 50.4328796],
            [30.7768815, 50.43859290000001],
            [30.7768811, 50.4433177],
            [30.7590214, 50.4487412],
            [30.7425803, 50.4584656],
            [30.7546732, 50.4616015],
            [30.7506646, 50.464206],
            [30.7533546, 50.4664029],
            [30.7515727, 50.4676094],
            [30.7536858, 50.4690149],
            [30.7524384, 50.4697877],
            [30.7414507, 50.4687957],
            [30.7499086, 50.474364],
            [30.746183, 50.477633],
            [30.7486933, 50.4838431],
            [30.759833, 50.48355],
            [30.7543842, 50.4902307],
            [30.7491, 50.487583],
            [30.74695, 50.491967],
            [30.7425382, 50.4903672],
            [30.7376702, 50.4989221],
            [30.7458355, 50.503106],
            [30.7462062, 50.502082],
            [30.7504739, 50.502413],
            [30.7489567, 50.5046146],
            [30.7577289, 50.5078392],
            [30.7572488, 50.5088074],
            [30.7619215, 50.509033],
            [30.7609112, 50.5165299],
            [30.7578296, 50.5155121],
            [30.754174, 50.5166283],
            [30.7550208, 50.5189453],
            [30.82335, 50.537117],
            [30.821283, 50.53865],
            [30.8176, 50.557617],
            [30.814167, 50.560283],
            [30.815883, 50.565083],
            [30.797417, 50.570067],
            [30.783867, 50.580017],
            [30.783183, 50.57745],
            [30.771067, 50.57565],
            [30.7667, 50.5838],
            [30.754083, 50.583283],
            [30.719583, 50.590833],
            [30.717267, 50.589983],
            [30.721383, 50.585867],
            [30.70833, 50.57281],
            [30.71091, 50.57178],
            [30.714, 50.55565],
            [30.6989546, 50.5546532],
            [30.6974279, 50.5620134],
            [30.6811289, 50.55579],
            [30.6699636, 50.553772],
            [30.66407, 50.5515026],
            [30.6559671, 50.5368852],
            [30.6481308, 50.5347849],
            [30.5938772, 50.5362906],
            [30.57804, 50.54054],
            [30.5569711, 50.540275],
            [30.5529666, 50.5363809],
            [30.5542884, 50.5305815],
            [30.5601346, 50.5285572],
            [30.5680213, 50.5201213],
            [30.5670772, 50.5165849],
            [30.55624, 50.5129],
            [30.55161, 50.51376],
            [30.54422, 50.522],
            [30.5344687, 50.52601580000001],
            [30.5332339, 50.5335361],
            [30.5303245, 50.5362172],
            [30.5031161, 50.5465267],
            [30.4959922, 50.5518169],
            [30.4907132, 50.5678521],
            [30.4837651, 50.5679029],
            [30.4848493, 50.5694195],
            [30.481592, 50.5722676],
            [30.4646125, 50.5717474],
            [30.4631088, 50.5843452],
            [30.4619039, 50.583426],
            [30.4468058, 50.5858145],
            [30.3709837, 50.5864363],
            [30.3706473, 50.573564],
            [30.3392267, 50.5738421],
            [30.3073207, 50.5705708],
            [30.3269942, 50.564541],
            [30.3256438, 50.5628646],
            [30.331632, 50.5593042],
            [30.3415751, 50.5573201],
            [30.3314988, 50.5565083],
            [30.3319628, 50.5532468],
            [30.3296837, 50.5528893],
            [30.3326782, 50.5513277],
            [30.3294311, 50.5495417],
            [30.3259993, 50.5500908],
            [30.3264556, 50.5462477],
            [30.3108136, 50.5551264],
            [30.3011418, 50.5533136],
            [30.2980248, 50.5544236],
            [30.2974856, 50.5515922],
            [30.3032149, 50.5477551],
            [30.3018038, 50.5472126],
            [30.3044967, 50.5440321],
            [30.302323, 50.5324797],
            [30.2927021, 50.532761],
            [30.29, 50.525783],
            [30.2814528, 50.522182],
            [30.2737952, 50.5213845],
            [30.2639869, 50.5150501],
            [30.2601765, 50.5100079],
            [30.2702395, 50.5024307],
            [30.270083, 50.4982362],
            [30.2653092, 50.4938839],
            [30.2664685, 50.4926431],
            [30.2627, 50.48775],
            [30.2534706, 50.486835],
            [30.2516596, 50.4848125],
            [30.24965, 50.474017],
            [30.255833, 50.472133],
            [30.257934, 50.4697809],
            [30.2484948, 50.46253510000001],
            [30.2404655, 50.4520566],
            [30.2403742, 50.4477311],
            [30.2466201, 50.4430026],
            [30.2467727, 50.4403576],
            [30.2425509, 50.4387299],
            [30.2418388, 50.4346607],
            [30.2363911, 50.4306638],
            [30.2421949, 50.4282008],
            [30.2454873, 50.4236148],
            [30.2505059, 50.4263426],
            [30.2549812, 50.432019],
            [30.2599468, 50.4318122],
            [30.2692879, 50.4264459],
            [30.2767158, 50.4304517],
            [30.2746054, 50.4317482],
            [30.2801168, 50.4399759],
            [30.281333, 50.4473398],
            [30.32175, 50.44235],
            [30.3440806, 50.4458725],
            [30.34218, 50.45265],
            [30.34372, 50.45437],
            [30.3475, 50.45231],
            [30.3491919, 50.4488711],
            [30.3512166, 50.449447],
            [30.3515823, 50.4457485],
            [30.3581032, 50.4452337],
            [30.3603208, 50.4331714],
            [30.3702922, 50.4206121],
            [30.3940078, 50.4059197],
            [30.417933, 50.3980407],
            [30.4182441, 50.3964041],
            [30.4234128, 50.395827],
            [30.4220603, 50.3934398],
            [30.4259077, 50.3911978],
            [30.4290163, 50.3917397],
            [30.4427137, 50.3815264],
            [30.4302718, 50.37186449999999],
            [30.4373655, 50.3678565],
            [30.4356689, 50.360893],
            [30.4379029, 50.3599251],
            [30.4376097, 50.3568832],
            [30.4522323, 50.3545496],
            [30.4549188, 50.3598594],
            [30.4577816, 50.3610548],
            [30.4683024, 50.3601008],
            [30.4672576, 50.3584963],
            [30.46955, 50.3577899],
            [30.4700259, 50.3553264],
            [30.4680367, 50.3525589],
            [30.4727781, 50.3514129],
            [30.47315, 50.3427],
            [30.4746085, 50.3397585],
            [30.4781838, 50.3395694],
            [30.4777481, 50.3374597],
            [30.4749546, 50.3367357],
            [30.4750199, 50.3335939],
            [30.485141, 50.33395],
            [30.4851478, 50.3360782],
            [30.4912366, 50.3354075],
            [30.4973859, 50.3325475],
            [30.4885072, 50.3268071],
            [30.4962523, 50.3219283],
            [30.5091575, 50.3261611],
            [30.5164919, 50.3209892],
            [30.5335806, 50.3171235],
            [30.5317, 50.302367],
            [30.5371893, 50.3003674],
            [30.5275211, 50.2906689],
            [30.546367, 50.29095],
            [30.548, 50.282783],
            [30.54225, 50.275067],
            [30.553917, 50.269317],
            [30.5534, 50.263317],
            [30.551083, 50.261683],
            [30.552983, 50.25885],
            [30.575486, 50.2595356],
            [30.5762693, 50.2586077],
            [30.5862081, 50.2453938],
            [30.5926614, 50.2132422],
            [30.6435516, 50.2260905],
            [30.6369175, 50.2353595],
            [30.6454327, 50.2373818],
            [30.645106, 50.2398952],
            [30.6336808, 50.24694],
            [30.6327545, 50.2511363],
            [30.6252703, 50.2571605],
            [30.6263754, 50.2630913],
            [30.617502, 50.26553770000001],
            [30.6161756, 50.2718567],
            [30.6100345, 50.2769072],
            [30.610567, 50.280733],
            [30.6410412, 50.2802193],
            [30.646111, 50.2858562],
            [30.6466127, 50.2918667],
            [30.6459761, 50.29819480000001],
            [30.6307429, 50.3149771],
            [30.6225125, 50.3291794],
            [30.612515, 50.3376171],
            [30.6162374, 50.3398961],
            [30.6112776, 50.3463984],
            [30.625417, 50.3488],
            [30.6130091, 50.3577438],
            [30.6158, 50.35995],
            [30.61975, 50.358917],
            [30.635717, 50.36235],
            [30.6461, 50.36305],
            [30.647567, 50.3567],
            [30.674683, 50.358417],
            [30.676403, 50.3532051],
            [30.69555, 50.34965],
            [30.69675, 50.34725],
            [30.711417, 50.352317],
            [30.7130866, 50.3546293],
            [30.7135432, 50.3581179],
            [30.7070716, 50.3657095],
            [30.7095551, 50.3678938],
            [30.7148728, 50.3688031],
            [30.7116676, 50.3728803],
            [30.7134213, 50.3735299],
            [30.7115859, 50.3785755],
            [30.716862, 50.3823618],
            [30.725333, 50.380033],
            [30.7288923, 50.3768346],
            [30.7269825, 50.3754525],
            [30.745833, 50.370517],
            [30.756233, 50.37275],
            [30.7772459, 50.3705904],
            [30.7778286, 50.3731078],
            [30.7735516, 50.37419],
            [30.7763451, 50.3796817],
            [30.7729445, 50.3801089],
            [30.7735612, 50.3819453],
            [30.7785566, 50.3830022],
            [30.7806161, 50.3855817],
            [30.7806214, 50.3879957],
            [30.7757698, 50.3892915],
            [30.7753156, 50.3944244],
            [30.7772021, 50.3957702],
            [30.7906769, 50.3980894],
            [30.7988965, 50.3935654],
            [30.8137188, 50.3916468],
            [30.8163239, 50.3888405],
            [30.8135391, 50.3866926],
            [30.8209702, 50.3859359],
            [30.8217559, 50.3992155],
            [30.8242738, 50.4022646],
            [30.8273383, 50.4019781],
            [30.8275783, 50.4053995],
          ],
          [
            [30.3490673, 50.4888667],
            [30.3480512, 50.4858839],
            [30.3442654, 50.4874087],
            [30.3393411, 50.4842723],
            [30.3372251, 50.4851062],
            [30.3363289, 50.483207],
            [30.33131, 50.483999],
            [30.320873, 50.4867039],
            [30.3177316, 50.4940779],
            [30.3193493, 50.4958711],
            [30.3256787, 50.4929765],
            [30.3348744, 50.4934469],
            [30.33988, 50.4983815],
            [30.3408965, 50.4961633],
            [30.3411584, 50.4976411],
            [30.3454349, 50.4986686],
            [30.3447733, 50.4914239],
            [30.3460501, 50.4893765],
            [30.3490673, 50.4888667],
          ],
        ],
      },
      properties: {
        shapeName: "Kyiv",
        shapeISO: "UA-30",
        shapeID: "14850775B6574925539455",
        shapeGroup: "UKR",
        shapeType: "ADM1",
      },
      temp: weatherOfCities.find((el) => el.name === "Kyiv")?.main.temp,
    };

    const updatedGeoJSON = {
      type: "FeatureCollection",
      features: [...newGeoJSON, kyivGeoJSON],
    };

    setGeoJSON(updatedGeoJSON as SetStateAction<GeoJsonObject>);
    setIsTransformed(true);
  };

  const getInitialFetchWeather = async () => {
    const weatherData: WeatherOfPlace[] = [];
    try {
      for (const location of locationsOfCities) {
        const { lat, lng } = location;
        const weather = await getFetchWeather(lat, lng);
        weatherData.push(weather);
      }
    } catch (err: any) {
      toast({
        title: err || "Something went wrong...",
      });
    }
    setWeatherOfCities(weatherData);
  };

  const addNewPlace = (place: WeatherOfPlace) => {
    setWeatherOfCities((prev) => [...prev, place]);
  };

  const actionAfterClickOnPlace = async (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    try {
      const weather = await getFetchWeather(lat, lng);
      addNewPlace(weather);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err || "Something went wrong",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => actionAfterClickOnPlace(e)}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  };

  const MovingMarker = () => {
    useMapEvent("moveend", (e) => {
      const { lat, lng } = e.target.getCenter();
      const zoom = e.target.getZoom();
      setSearchParams({
        lat,
        lng,
        zoom,
      });
    });
    useMapEvent("click", async (e) => {
      L.DomEvent.stopPropagation(e);
      await actionAfterClickOnPlace(e);
      dispatch(setShowDrawer(true));
    });
    return <span></span>;
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      L.DomEvent.disableClickPropagation(ref.current);
    }
  });

  return !isTransformed ? (
    <div className="h-screen flex items-center justify-center">
      <Progress value={progress} className="w-[60%]" />
    </div>
  ) : (
    <div className="flex flex-row h-screen w-full">
      <MapContainer
        id="leaflet-map"
        center={initialUrlPosition}
        zoom={initialUrlZoom}
        scrollWheelZoom={true}
        style={{ height: "inherit", width: "100%" }}
      >
        {theme === "light" ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href=\"https://www.jawg.io?utm_medium=map&utm_source=attribution\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
            url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=mPcYxRF0lmzqDT661aLMCodVtEGrE2OqIT2UI8CfqXkC0vHNA88o594WewcsxABH"
          />
        )}

        {geoJSON && isTransformed && <GeoJSON data={geoJSON} style={style} />}
        <MovingMarker />
        {weatherOfCities?.map((data, i) => {
          return (
            <Marker key={i} position={[data.coord.lat, data.coord.lon]}>
              <Tooltip permanent className="background">
                <CustomTooltip data={data} />
              </Tooltip>
            </Marker>
          );
        })}
        {weatherOfCities[weatherOfCities.length - 1] && (
          <DrawerWeather
            weatherOfPlace={weatherOfCities[weatherOfCities.length - 1]}
          />
        )}
        <div
          className="px-1 py-1 flex flex-row justify-end w-full gap-2 z-[70000] absolute"
          ref={ref}
        >
          <div className="h-full flex items-center gap-3">
            <ButtonTempToggle />
            <ModeToggle />
          </div>
          <SearchCities onAddNewPlace={addNewPlace} />
        </div>
      </MapContainer>
    </div>
  );
};

export default Map;
