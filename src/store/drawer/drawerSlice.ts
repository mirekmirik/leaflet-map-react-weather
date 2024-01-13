import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { WeatherOfPlaceHourly } from "src/api/weather/types";

// Define a type for the slice state
interface DrawerState {
  isShowDrawer: boolean;
  weathers: WeatherOfPlaceHourly;
}

// Define the initial state using that type
const initialState: DrawerState = {
  isShowDrawer: false,
  weathers: {
    name: "",
    list: [],
    cod: "",
    cnt: 0,
  },
};

export const drawerSlice = createSlice({
  name: "drawer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setShowDrawer: (state, action: PayloadAction<boolean>) => {
      state.isShowDrawer = action.payload;
    },
    setWeathers: (state, action: PayloadAction<WeatherOfPlaceHourly>) => {
      state.weathers = action.payload;
    },
  },
});

export const { setShowDrawer, setWeathers } = drawerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDrawer = (state: RootState) => state.drawer;

export default drawerSlice.reducer;
