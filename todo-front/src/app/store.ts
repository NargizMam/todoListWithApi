import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from "../features/users/usersSlice.ts";
import {tasksReducer} from "../features/tasks/TasksSlice.ts";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    tasks: tasksReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;