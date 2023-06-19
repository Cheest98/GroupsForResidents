import { Button } from '@mui/material';
import React from 'react';
import TaskWrapper from '../WidgetWrapper';

const TaskItem = ({ task, deleteTask, updateTaskStatus }) => {
    const handleDelete = async () => {
        await deleteTask(task._id);
    };
    const handleStatusChange = async (newStatus) => {
        await updateTaskStatus(task._id, newStatus);
    };

    const renderStatusButtons = () => {
        if (task.status === 'todo') {
            return (
                <>
                    <Button onClick={() => handleStatusChange('doing')}>Set Doing</Button>
                    <Button onClick={() => handleStatusChange('done')}>Set Done</Button>
                </>
            );
        } else if (task.status === 'doing') {
            return (
                <>
                    <Button onClick={() => handleStatusChange('todo')}>Set Todo</Button>
                    <Button onClick={() => handleStatusChange('done')}>Set Done</Button>
                </>
            );
        } else if (task.status === 'done') {
            return (
                <>
                    <Button onClick={() => handleStatusChange('todo')}>Set Todo</Button>
                    <Button onClick={() => handleStatusChange('doing')}>Set Doing</Button>
                </>
            );
        }
        return null;
    };

    return (
        <TaskWrapper sx={{ border: '1px dashed grey' }}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
            {renderStatusButtons()}
        </TaskWrapper>
    );
};

export default TaskItem;