import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "../actions/authActions";
const initialState = {
    auth: false,
    user: {}
}
const authSlices = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(logIn.pending, (state, action) => {
            state.status = 'pending';
        });
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.auth = true;
            state.user = action.payload;
            state.status = 'success';

        });
        builder.addCase(logIn.rejected, (state, action) => {
            state.status = 'rejected';
        });
        builder.addCase(logOut.pending, (state, action) => {
            state.status = 'pending';
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.auth = action.payload;
            state.user = {};
            state.status = 'success';

        });
        builder.addCase(logOut.rejected, (state, action) => {
            state.status = 'rejected';
        })
    }
});

export default authSlices.reducer;