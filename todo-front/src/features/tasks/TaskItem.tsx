import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {TaskApi} from "../../types";
import {NavLink} from "react-router-dom";

interface Props {
    task: TaskApi;
}

const TaskItem: React.FC<Props> = ({task}) => {
    return (
        <Card sx={{minWidth: 500}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {task.title}
                </Typography>
                <Typography variant="h5" component="div">
                    {task.description}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {task.status}
                </Typography>
            </CardContent>
            <Button>
                <NavLink to='/tasks/new'>Edit</NavLink>
            </Button>
        </Card>
    )
};

export default TaskItem;