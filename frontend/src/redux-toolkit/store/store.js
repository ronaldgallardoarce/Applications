import { configureStore } from "@reduxjs/toolkit";
import authSlices from "../slices/authSlices";
const store = configureStore({
    reducer: {
        auth: authSlices,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
export default store;