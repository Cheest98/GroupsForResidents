import React, { useEffect } from "react";
import { Box, Typography, useTheme, Divider, useMediaQuery, TextField, Button } from "@mui/material";
import { LocalPhone, MailOutline, EditOutlined } from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import UserImage from "../../../components/UserImage";
import FlexBetween from "../../../components/FlexBetween";
import WidgetWrapper from "../../../components/WidgetWrapper";
import ModalWrapper from "../../../components/ModalWrapper";
import CreatingGroupModalWrapper from "../../../components/CreatingGroupModalWrapper";
import FlexAround from "../../../components/FlexAround";
import NewGroupWidget from "./NewGroupWidget";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, setUser } from "../../../state";
import { useState } from "react";

const GroupView = ({ userGroup, groups, getUserGroup }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [password, setPassword] = useState('');
    const [creating, setCreating] = useState(false);

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const filteredGroups = groups.filter(group => group.name.includes(search));

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
    };

    const handleCloseModal = () => {
        setSelectedGroup(null);
    };

    const handleJoinClick = async () => {
        if (!selectedGroup) return;

        const response = await fetch(`http://localhost:3001/groups/${selectedGroup._id}/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: user._id,  // Add user._id to the request body
                password
            })
        });
        const data = await response.json();

        if (!response.ok) {
            // handle error
            console.log(data.message);
        } else {
            // successfully joined group
            console.log(data.group);
            // clear password and close modal
            setPassword('');
            setSelectedGroup(null);
            // update groups
            dispatch(setGroups({ groups: data.groups }));
            dispatch(setUser({ user: { group: data.group._id } }));
            getUserGroup();
        }
    };

    const handleCreateClick = () => {
        setCreating(true);
    };
    const handleCancelCreatingClick = () => {
        setCreating(false);
    };

    // need to optymalize rendering groupwidget after changing group
    return (
        <WidgetWrapper m="2rem 0" width="100%">
            <TextField type="text" value={search} onChange={handleSearchChange} placeholder="Search Group" />
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                Groups
            </Typography>
            <Box>
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    User Group Name: {userGroup?.name}
                </Typography>
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    User Group Description:  {userGroup?.description}  </Typography>

                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Groups
                </Typography>
            </Box>
            {filteredGroups.map((groupItem) => (
                <Box key={groupItem._id}>
                    <Typography variant="h3" color={dark} fontWeight="300">
                        Name: {groupItem.name}
                    </Typography>
                    <Typography variant="h3" color={dark} fontWeight="300">
                        Description: {groupItem.description}
                    </Typography>

                    <Button onClick={() => handleGroupSelect(groupItem)}>Join</Button>
                    <Divider />
                </Box>

            ))}
            <Button onClick={() => handleCreateClick()} >Create  new group</Button>
            <Modal open={selectedGroup != null} onClose={handleCloseModal}>
                <ModalWrapper>
                    <Box>
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Group Password"
                        />
                    </Box>
                    <Box>
                        <Button onClick={handleJoinClick}>Join</Button>
                    </Box>
                </ModalWrapper>
            </Modal >
            <Modal open={creating === true} onClose={handleCancelCreatingClick}>
                <CreatingGroupModalWrapper>
                    <NewGroupWidget handleCancelCreatingClick={handleCancelCreatingClick} />
                </CreatingGroupModalWrapper>
            </Modal >
        </WidgetWrapper >


    );
};

export default GroupView;