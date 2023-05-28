import React from 'react';
import TaskItem from './taskItem';
import WidgetWrapper from '../WidgetWrapper';
import { Box } from '@mui/material';

const TaskRow = ({ tasks, status, deleteTask, updateTaskStatus }) => {
    return (
        <WidgetWrapper>
            <h2>{status}</h2>
            <Box>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} deleteTask={deleteTask} updateTaskStatus={updateTaskStatus} />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default TaskRow;