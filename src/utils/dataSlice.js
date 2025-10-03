import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'APIdata',
    initialState: {
        countryCodeData: null
    },
    reducers:{
        addData: (state,action) => {
            state.countryCodeData = action.payload
        }
    }
})

export const {addData} = dataSlice.actions;
export default dataSlice.reducer;