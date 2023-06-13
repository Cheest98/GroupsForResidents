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
import FlexBetween from "../../../components/FlexBetween";
import FlexAround from "../../../components/FlexAround";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { useState } from "react";
import { setGroups, setUser } from "../../../state/index"
import { useDispatch, useSelector } from "react-redux";

const NewGroupWidget = () => {
    const dispatch = useDispatch();
    const [newGroup, setNewGroup] = useState({ name: '', description: '', password: '' });
    const { palette } = useTheme();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const handleTask = async () => {
        const response = await fetch(`http://localhost:3001/groups`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: user._id,
                name: newGroup.name,
                description: newGroup.description,
                password: newGroup.password
            }),
        });
        const group = await response.json();
        dispatch(setGroups({ groups: group.groups }));// assuming setGroups function takes group object and adds to state
        setNewGroup({ name: '', description: '', password: '' }); // Reset fields
        //dispatch(setGroups({ groups: group.groups }));
        dispatch(setUser({ user: { group: group.group._id } }));
        dispatch(setGroups(group));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGroup(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <InputBase
                    placeholder="Name"
                    name="name"
                    onChange={handleInputChange}
                    value={newGroup.name}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
                <InputBase
                    placeholder="password"
                    name="password"
                    onChange={handleInputChange}
                    value={newGroup.password}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
                <InputBase
                    placeholder="Description"
                    name="description"
                    onChange={handleInputChange}
                    value={newGroup.description}
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
                    disabled={!newGroup.name || !newGroup.password} // Check both fields
                    onClick={handleTask}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    Create Group
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default NewGroupWidget;