import React from 'react';
import TaskRow from './taskRow';
import { Box, useMediaQuery } from '@mui/material';


const TaskList = ({ tasks }) => {
    // Podziel zadania na trzy rzędy w zależności od statusu
    const todoTasks = tasks.filter((task) => task.status === 'todo');
    const doingTasks = tasks.filter((task) => task.status === 'doing');
    const doneTasks = tasks.filter((task) => task.status === 'done');
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (

        <Box
            width="100%"
            padding="1rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
        ><Box flexBasis={isNonMobileScreens ? "33%" : undefined}>
                <TaskRow tasks={todoTasks} status="todo" /> </Box>
            <Box flexBasis={isNonMobileScreens ? "33%" : undefined}><TaskRow tasks={doingTasks} status="doing" /> </Box>
            <Box flexBasis={isNonMobileScreens ? "33%" : undefined}> <TaskRow tasks={doneTasks} status="done" /></Box>
        </Box>
    );
};

export default TaskList;