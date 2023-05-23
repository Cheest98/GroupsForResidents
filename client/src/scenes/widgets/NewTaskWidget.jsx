import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../state";

const MyTaskWidget = () => {
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handleTask = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", task);

        const response = await fetch(`http://localhost:3001/tasks`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const tasks = await response.json();
        dispatch(setTasks({ tasks }));
        setTask("");
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetween>

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>

                <Button
                    disabled={!task}
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