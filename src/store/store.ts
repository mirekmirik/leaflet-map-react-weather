import { configureStore } from "@reduxjs/toolkit";
import drawerSlice from "./drawer/drawerSlice";
import searchSlice from "./searchInput/searchInputSlice";
import temperatureSlice from "./temperature/temperatureSlice";
// ...

export const store = configureStore({
  reducer: {
    drawer: drawerSlice,
    searchInput: searchSlice,
    temperature: temperatureSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
