import { Box } from "@mui/material";
import { styled } from "@mui/system";

const TaskWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.dark,
    borderRadius: "0.75rem",
}));
export default TaskWrapper;