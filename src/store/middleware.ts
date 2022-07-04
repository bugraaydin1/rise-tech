import { Action, Store } from "@reduxjs/toolkit";

// middleware: save to local storage
export const localStorageMiddleware = (store: Store) => {
  const { getState } = store;

  return (next: any) => (action: Action) => {
    const result = next(action);
    localStorage.setItem("appState", JSON.stringify(getState()));
    return result;
  };
};

// middleware: save to local storage
export const reloadStoreFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("appState") ?? "[]");
};
