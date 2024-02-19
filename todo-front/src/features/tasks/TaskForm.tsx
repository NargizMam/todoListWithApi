import {useSelector} from 'react-redux';
import React, {useState} from "react";
import {createTask, deleteTask, editTask} from "./tasksThunk.ts";
import {selectToken} from "../users/usersSlice.ts";
import {useAppDispatch} from "../../app/hooks.ts";

interface TaskFormProps {
    taskId?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskId }) => {
    const dispatch = useAppDispatch();
    const token = useSelector(selectToken);
    const [formData, setFormData] = useState(
        { title: '',
                    description: '',
                    status: 'new'
        });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            console.log('User not logged in. Cannot create or edit tasks.');
            return;
        }

        if (taskId) {
            dispatch(editTask({ taskId, taskData: formData }));
        } else {
            dispatch(createTask(formData));
        }

        setFormData({ title: '', description: '', status: 'new' });
    };

    const handleDelete = () => {
        if (!token) {
            console.log('User not logged in. Cannot delete tasks.');
            return;
        }

        if (taskId) {
            dispatch(deleteTask(taskId));
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit} style={{width: '70%'}}>
            <div>
                Title:
                <input
                    type="text"
                    style={{border: `1px solid black`, marginBottom: '10px'}}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
            </div>
            <div>
                Description:
                <input
                    type="text"
                    style={{border: `1px solid black`,marginBottom: '10px'}}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>
            <div>
                Status:
                <select
                    value={formData.status}
                    style={{marginBottom: '10px'}}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="complete">Complete</option>
                </select>
            </div>
            <button type="submit" disabled={!token}>
                {taskId ? 'Edit Task' : 'Create Task'}
            </button>
            {taskId && (
                <button type="button" onClick={handleDelete} >
                    Delete Task
                </button>
            )}
        </form>
            </>
    );
};

export default TaskForm;
