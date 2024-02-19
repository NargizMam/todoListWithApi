import {Container, CssBaseline} from "@mui/material";
import {Routes, Route } from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Users from "./features/users/Users.tsx";
import TaskForm from "./features/tasks/TaskForm.tsx";
import './App.css'
import Tasks from "./features/tasks/Tasks.tsx";

const App = () => (
    <>
        <CssBaseline/>
        <header>
            <AppToolbar/>
        </header>
        <Container className="container" maxWidth="xl">
            <Routes>
                <Route path="/"  element={<Users/>} />
                <Route path="/users"  element={<Users/>} />
                <Route path="/tasks" element={<Tasks/>} />
                <Route path="/tasks/new" element={<TaskForm />} />
                <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
        </Container>

    </>
);

export default App
