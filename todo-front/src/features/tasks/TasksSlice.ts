import {createSlice} from "@reduxjs/toolkit";
import {TaskApi} from "../../types";
import {createTask, deleteTask, editTask, fetchTaskById, fetchTasks} from "./tasksThunk.ts";

interface TaskState {
    tasks: TaskApi[];
    selectTask: TaskApi | null;
    fetching: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    selectTask: null,
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
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.fetching = false;
            state.tasks = action.payload;
        });
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchTaskById.pending, (state) => {
            state.fetching = true;
        })
        builder.addCase(fetchTaskById.fulfilled, (state, {payload: task}) => {
            state.fetching = false;
            state.selectTask = task;
        })
        builder.addCase(fetchTaskById.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.payload as string;
        })
        builder.addCase(createTask.pending, (state) => {
            state.fetching = true;
        });
        builder.addCase(createTask.fulfilled, (state, {payload: task}) => {
            state.fetching = false;
            state.tasks.push(task);
        });
        builder.addCase(createTask.rejected, (state, {payload: task}) => {
            state.fetching = false;
            state.error = task as string;
        });
        builder.addCase(editTask.pending, (state) => {
            state.fetching = true;
        });
        builder.addCase(editTask.fulfilled, (state, {payload: task}) => {
            state.fetching = false;
            const updatedTask = task;
            if (updatedTask) {
                const index = state.tasks.findIndex((task) => task.id === updatedTask.id);

                if (index !== -1) {
                    state.tasks[index] = updatedTask;
                }
            }
        });
        builder.addCase(editTask.rejected, (state, action) => {
            state.fetching = false;
            state.error = action.payload as string;
        });
        builder.addCase(deleteTask.pending, (state) => {
            state.fetching = true;
        });
        builder.addCase(deleteTask.fulfilled, (state) => {
            state.fetching = false;
            // state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        });
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