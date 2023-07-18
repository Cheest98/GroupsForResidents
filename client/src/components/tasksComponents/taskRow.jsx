import React, { useState } from 'react';
import TaskItem from './TaskItem';
import WidgetWrapper from '../WidgetWrapper';
import { Box, Button } from '@mui/material';

import ShoppingStatus from '../ShoppingStatus';

const TaskRow = ({ tasks, status, deleteTask, updateTaskStatus }) => {

    const [displayedTaskCount, setDisplayedTaskCount] = useState(6);

    const handleLoadMore = () => {
        setDisplayedTaskCount(prevCount => prevCount + 6);
    }

    return (
        <Box>
            <ShoppingStatus
                mb="0.5rem"
                mt="0.5rem">
                <h2>{status}</h2>
            </ShoppingStatus>
            <Box>
                {tasks.slice(0, displayedTaskCount).map((task) => (
                    <TaskItem key={task.id} task={task} deleteTask={deleteTask} updateTaskStatus={updateTaskStatus} />
                ))}
            </Box>
            {
                displayedTaskCount < tasks.length && (
                    <Button onClick={handleLoadMore}>More Lists</Button>
                )
            }
        </Box>
    );
};

export default TaskRow;