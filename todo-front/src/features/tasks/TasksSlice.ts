import {createSlice} from "@reduxjs/toolkit";
import {TaskApi} from "../../types";
import {createTask, deleteTask, editTask, fetchTasks} from "./tasksThunk.ts";

interface TaskState {
    tasks: TaskApi[];
    fetching: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    fetching: false,
    error: null
};
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
                state.fetching = true;
            })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
                state.fetching = false;
                state.tasks = action.payload;
            })
        builder.addCase(fetchTasks.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.payload as string;
            })
        builder.addCase(createTask.pending, (state) => {
                state.fetching = true;
            })
        builder.addCase(createTask.fulfilled, (state, action) => {
                state.fetching = false;
                state.tasks.push(action.payload);
            })
        builder.addCase(createTask.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.payload as string;
            })
        builder.addCase(editTask.pending, (state) => {
                state.fetching = true;
            })
        builder.addCase(editTask.fulfilled, (state) => {
                state.fetching = false;
                // const updatedTaskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
                // if (updatedTaskIndex !== -1) {
                //     state.tasks[updatedTaskIndex] = action.payload;
                // }
            })
        builder.addCase(editTask.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.payload as string;
            })
        builder.addCase(deleteTask.pending, (state) => {
                state.fetching = true;
            })
        builder.addCase(deleteTask.fulfilled, (state) => {
                state.fetching = false;
                // state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
        builder.addCase(deleteTask.rejected, (state, action) => {
                state.fetching = false;
                state.error = action.payload as string;
            });
    },
});

export const selectTasks = (state: { tasks: TaskState }) => state.tasks.tasks;
export const selectTasksFetching = (state: { tasks: TaskState }) => state.tasks.fetching;
export const selectTasksError = (state: { tasks: TaskState }) => state.tasks.error;

export const tasksReducer = taskSlice.reducer;