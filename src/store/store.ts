import { configureStore, Middleware } from "@reduxjs/toolkit";
import taskReducer from "../features/task/taskSlice";
import { priorityApi } from "../features/task/priorityApiSlice";
import { localStorageMiddleware, reloadStoreFromLocalStorage } from "./middleware";

export default configureStore({
  reducer: {
    task: taskReducer,
    [priorityApi.reducerPath]: priorityApi.reducer,
  },
  preloadedState: reloadStoreFromLocalStorage(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware as Middleware),
});
