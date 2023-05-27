import React from 'react'
import TaskItem from './taskItem'
import WidgetWrapper from '../WidgetWrapper';
import { Box, useMediaQuery, Grid } from '@mui/material';
import TaskWrapper from '../tasksComponents/TaskWrapper'

const TaskRow = ({ tasks, status }) => {
    return (
        <WidgetWrapper>
            <h2>{status}</h2>
            <Box >
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}</Box>
        </WidgetWrapper>
    );
};

export default TaskRow;