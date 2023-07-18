import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../scenes/navbar";
import MyTaskWidget from "../../scenes/widgets/NewTaskWidget";
import TasksWidget from "../widgets/TasksWidget";
import { useSelector, useDispatch } from 'react-redux';
import { setTasks } from "../../state";

const TaskPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const getTasks = async () => {
        const response = await fetch(`http://localhost:3001/tasks/group/${user.group}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setTasks({ tasks: data }));
    };

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                gap="0.5rem"
                display="flex"
                justifyContent="space-around"
                alignItems="center"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyTaskWidget getTasks={getTasks} />
                </Box>
            </Box>
            <TasksWidget getTasks={getTasks} />
        </Box>
    );
};

export default TaskPage;