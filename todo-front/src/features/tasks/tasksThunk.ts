import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {TaskApi, TaskMutation} from "../../types";

export const fetchTasks = createAsyncThunk<TaskApi[]>(
    'tasks/fetchTasks',
    async  ()=> {
        const response = await axiosApi.get<TaskApi[]>('/tasks');
        console.log(response.data)
        return response.data;
    });

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData: { title: string; description?: string; status: string }, thunkAPI) => {
    try {
        const response = await axiosApi.post('/tasks', taskData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const editTask = createAsyncThunk<null, {taskId: string, taskData:TaskMutation}>(
    'tasks/editTask',
    async ( {taskId, taskData},thunkAPI) => {
        try {
            const response = await axiosApi.put(`/tasks/${taskId}`, taskData);
            return response.data;
        } catch (error) {
            return thunkAPI;
        }
    }
);

export const deleteTask = createAsyncThunk<void, string>(
    'dishes/delete',
        async (taskId) => {
            await axiosApi.delete(`/tasks/${taskId}.json`);
        }
);