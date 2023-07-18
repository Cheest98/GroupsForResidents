import {
    Button,
    Divider,
    InputBase,
    useTheme,
    Box,
    useMediaQuery
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { setTasks } from "../../state";

const NewTaskWidget = ({ getTasks }) => {
    const dispatch = useDispatch();
    const [task, setTask] = useState({ title: '', description: '' });
    const { palette } = useTheme();
    const currentTasks = useSelector((state) => state.tasks);
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

    const handleTask = async () => {

        const response = await fetch(`http://localhost:3001/tasks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: _id,
                title: task.title,
                description: task.description
            }),
        });
        if (!response.ok) {
            console.error('Server responded with status', response.status);
            return;
        }
        const newList = await response.json();

        const updatedTasks = [...currentTasks, newList];
        dispatch(setTasks({ tasks: updatedTasks }));
        setTask({ title: '', description: '' }); // Resetuj wartości title i description
        getTasks();
    };

    const handleTitleChange = (e) => {
        setTask({ ...task, title: e.target.value });
    };

    const handleDescriptionChange = (e) => {
        setTask({ ...task, description: e.target.value });
    };

    return (
        <WidgetWrapper>
            <Box width="100%"
                padding="1rem 6%"
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap="0.5rem"
            >
                <InputBase
                    placeholder="Title"
                    onChange={handleTitleChange}
                    value={task.title}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",

                    }}
                />
                <InputBase
                    placeholder="Description"
                    onChange={handleDescriptionChange}
                    value={task.description}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </Box>

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <Button
                    disabled={!task.title || !task.description} // Sprawdzaj oba pola
                    onClick={handleTask}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    Task
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default NewTaskWidget;