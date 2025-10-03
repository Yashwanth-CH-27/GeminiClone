import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice"

const appStore = configureStore({
    reducer: {
       APIdata : dataReducer
    }
})

export default appStore