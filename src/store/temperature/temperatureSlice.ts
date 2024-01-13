import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// Define a type for the slice state
interface TemperatureState {
  isCelcium: boolean;
}

// Define the initial state using that type
const initialState: TemperatureState = {
  isCelcium: true,
};

export const temperatureSlice = createSlice({
  name: "isCelcium",
  initialState,
  reducers: {
    toggleFormatTemperature: (state) => {
      state.isCelcium = state.isCelcium ? false : true;
    },
  },
});

export const { toggleFormatTemperature } = temperatureSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getTemperatureSelector = (state: RootState) => state.temperature;

export default temperatureSlice.reducer;
