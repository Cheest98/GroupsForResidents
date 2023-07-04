import { Box, Button } from '@mui/material';
import React from 'react';
import TaskWrapper from '../tasksComponents/TaskWrapper';


export const CompletedList = ({ list, handleDelete, addItemToList }) => {

    return (
        <TaskWrapper sx={{ border: '1px dashed grey', mb: '1rem' }}>
            {list.completed && (
                <Box>
                    <h1>{list.name}</h1>
                    <h2> Total Price: {list.totalPrice}</h2>
                    <p>Completed at: {new Date(list.completedAt).toLocaleString()}</p>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(list._id)}>Delete</Button>
                </Box>)}
        </TaskWrapper>
    )
}
export default CompletedList;