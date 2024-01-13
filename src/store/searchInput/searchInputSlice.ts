import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// Define a type for the slice state
interface SearchInputState {
  isShowInput: boolean;
}

// Define the initial state using that type
const initialState: SearchInputState = {
  isShowInput: false,
};

export const searchSlice = createSlice({
  name: "searchInput",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setShowInput: (state, action: PayloadAction<boolean>) => {
      state.isShowInput = action.payload;
    },
  },
});

export const { setShowInput } = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getSearchInputSelector = (state: RootState) => state.searchInput;

export default searchSlice.reducer;
