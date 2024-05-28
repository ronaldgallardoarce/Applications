import { createAsyncThunk } from '@reduxjs/toolkit'
export const logIn = createAsyncThunk('/logIn', async (payload) => {
    try {
        return payload
    } catch (error) {
        return error.message
    }
});
export const logOut = createAsyncThunk('/logOut', async (payload) => {
    try {
        return payload
    } catch (error) {
        return error.message
    }
});