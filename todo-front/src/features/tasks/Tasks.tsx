import {useDispatch, useSelector} from "react-redux";
import {selectTasks, selectTasksError, selectTasksFetching} from "./TasksSlice.ts";
import {selectToken} from "../users/usersSlice.ts";
import {useEffect} from "react";
import {fetchTasks} from "./tasksThunk.ts";
import {useAppDispatch} from "../../app/hooks.ts";

const Tasks = () => {
    const dispatch = useAppDispatch();
    const token = useSelector(selectToken);
    const tasks = useSelector(selectTasks);
    const fetchingTasks = useSelector(selectTasksFetching)
    const error = useSelector(selectTasksError);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);
    return (
        <>

        </>
    );
};

export default Tasks;