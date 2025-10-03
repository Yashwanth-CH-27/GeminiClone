import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice"

const appStore = configureStore({
    reducers: {
       APIdata : dataReducer
    }
})

export default appStore