import {createSlice} from "@reduxjs/toolkit";
import {usersLogin, usersRegister} from "./usersThunk.ts";
import {RootState} from "../../app/store.ts";

interface UsersState{
    tokenApi: string | null,
    fetchLoading: boolean
}
const initialState: UsersState = {
    tokenApi: null,
    fetchLoading: false
}
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(usersRegister.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(usersRegister.fulfilled, (state, {payload: token}) => {
            state.fetchLoading = false;
            state.tokenApi = token;
        });
        builder.addCase(usersRegister.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(usersLogin.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(usersLogin.fulfilled, (state, {payload: token}) => {
            state.fetchLoading = false;
            state.tokenApi = token;
        });
        builder.addCase(usersLogin.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});

export const usersReducer = usersSlice.reducer;

export const selectToken = (state: RootState) => state.users.tokenApi;
export const isLoading = (state: RootState) => state.users.fetchLoading;
