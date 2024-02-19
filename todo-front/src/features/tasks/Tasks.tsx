import {useSelector} from "react-redux";
import {selectTasks, selectTasksError, selectTasksFetching} from "./TasksSlice.ts";
import {selectToken} from "../users/usersSlice.ts";
import {useEffect} from "react";
import {fetchTasks} from "./tasksThunk.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import TaskItem from "./TaskItem.tsx";

const Tasks = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();
    const token = useSelector(selectToken);
    const tasks = useSelector(selectTasks);
    const fetchingTasks = useSelector(selectTasksFetching)
    const error = useSelector(selectTasksError);
    useEffect(() => {
        if (!token) {
            return navigation('/users');
        }
        dispatch(fetchTasks());
    }, [dispatch]);

    if (fetchingTasks) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
            <h2>Tasks List</h2>
            <ul>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}/>
                ))}
            </ul>
        </>
    );
};

export default Tasks;