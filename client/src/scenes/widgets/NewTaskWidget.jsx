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

const MyTaskWidget = () => {
    const dispatch = useDispatch();
    const [task, setTask] = useState({ title: '', description: '' });
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

    const handleTask = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("title", task.title);
        formData.append("description", task.description);

        const response = await fetch(`http://localhost:3001/tasks`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const tasks = await response.json();
        dispatch(setTasks({ tasks }));
        setTask({ title: '', description: '' }); // Resetuj wartości title i description
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
                        mb: "0.5rem",
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

export default MyTaskWidget;