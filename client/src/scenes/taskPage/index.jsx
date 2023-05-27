import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../scenes/navbar";
import MyTaskWidget from "../../scenes/widgets/NewTaskWidget";
import TasksWidget from "../widgets/TasksWidget";
//import TasksWidget from "../../scenes/widgets/TasksWidget";

const TaskPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

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
                    <MyTaskWidget />
                </Box>
            </Box>
            <TasksWidget />
        </Box>
    );
};

export default TaskPage;