import React from 'react'
import { Box, } from '@mui/material';
import TaskWrapper from '../WidgetWrapper';
const TaskItem = ({ task }) => {
    return (
        <TaskWrapper sx={{ border: '1px dashed grey' }} >
            <h1>{task.title}</h1>
            <p1>{task.description}</p1>
        </TaskWrapper >
    )
}
export default TaskItem;
