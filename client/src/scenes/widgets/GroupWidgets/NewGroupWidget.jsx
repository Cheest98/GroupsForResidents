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
import FlexBetween from "../../../components/FlexBetween";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { setGroups, setUser } from "../../../state/index";

const NewGroupWidget = ({ handleCancelCreatingClick, getGroups, getUserGroup }) => {
    const dispatch = useDispatch();
    const [newGroup, setNewGroup] = useState({ name: '', description: '', password: '' });
    const { palette } = useTheme();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');


    const handleCreateGroup = async () => {
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
        dispatch(setGroups({ groups: group.groups }));// assuming setGroups function takes group object and adds to state // Reset fields
        dispatch(setUser({ user: { group: group.group._id } }));
        setNewGroup({ name: '', description: '', password: '' });
        handleCancelCreatingClick();
        getGroups();
        getUserGroup();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGroup(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <WidgetWrapper>
            <Box width="100%"
                padding="1rem 6%"
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap="0.5rem">
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
                        mb: "0.5rem"
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
                        mb: "0.5rem",
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
                        mb: "0.5rem"
                    }}
                />
            </Box>

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <Button
                    disabled={!newGroup.name || !newGroup.password} // Check both fields
                    onClick={handleCreateGroup}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    Create Group
                </Button>
                <Button onClick={handleCancelCreatingClick}>Cancel</Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default NewGroupWidget; 