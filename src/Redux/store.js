import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./Slices/isLoading";

export const store = configureStore({
    reducer: {
        loading: loadingReducer
    }
})