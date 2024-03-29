import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {User} from "../../types";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AxiosRequestConfig} from "axios";

export const usersRegister = createAsyncThunk<null, User>(
    'users/register',
    async (user) => {
        const usersResponse = await axiosApi.post('/users', user);
        localStorage.setItem('token', usersResponse.data);
        return usersResponse.data;
    }
);
export const usersLogin = createAsyncThunk<null, User>(
    'users/login',
    async (user, thunkAPI) => {
        try{
            axiosApi.interceptors.request.use((config) => {
                const token  = localStorage.getItem('token');
                if(token) {
                    config.headers.Authorization = `_bearer${token}`;
                }
                return config;
            });
            const usersResponse = await axiosApi.get('/users/sessions', user as AxiosRequestConfig);
            localStorage.setItem('token', usersResponse.data);
            return usersResponse.data;
        }catch (e) {
            return thunkAPI.rejectWithValue(error)
        }

    }
);
