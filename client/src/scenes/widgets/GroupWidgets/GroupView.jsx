import { Box, Button, Divider, TextField, Typography, useTheme } from "@mui/material";
import Modal from '@mui/material/Modal';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatingGroupModalWrapper from "../../../components/CreatingGroupModalWrapper";
import ModalWrapper from "../../../components/ModalWrapper";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { setGroups, setUser } from "../../../state";
import NewGroupWidget from "./NewGroupWidget";

const GroupView = ({ userGroup, groups, getUserGroup, getGroups, }) => {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [password, setPassword] = useState('');
    const [creating, setCreating] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [joinGroupError, setJoinGroupError] = useState('');
    const [deletePasswordError, setDeletePasswordError] = useState('');


    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;


    const filteredGroups = groups.filter(group => group.name.includes(search));

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
        console.log(group)
    };

    const handleCloseModal = () => {
        setSelectedGroup(null);
    };
    const handleDeleteChange = (event) => {
        setDeletePassword(event.target.value);
    };
    const handleDeleteClick = async () => {
        if (!userGroup || !user) return;

        console.log('handleDeleteClick called');  // Add this

        const response = await fetch(`http://localhost:3001/groups/${userGroup._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: user._id,
                password: deletePassword
            })
        });

        if (!response.ok) {

            setDeletePasswordError("Incorrect Password");
        } else {
            console.log('Group deleted');
            // Clear password and refresh groups
            setDeletePassword('');
            setSelectedGroup(null);
            getGroups();
            getUserGroup();
            // Fetch updated user data
            const userResponse = await fetch(`http://localhost:3001/users/${user._id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!userResponse.ok) {
                console.log('Failed to fetch updated user data');
            } else {
                const updatedUser = await userResponse.json();
                // Update user data in the Redux store
                dispatch(setUser(updatedUser));
            }
        }
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
        console.log(user._id, password)
        console.log(setSelectedGroup(selectedGroup))
        const data = await response.json();

        if (!response.ok) {
            // handle error
            console.log(data.message);
            setJoinGroupError(data.message);
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
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                My group
            </Typography>
            {userGroup?.creator === user._id && (
                <Box>
                    <TextField
                        label="Password"
                        type="password"
                        value={deletePassword}
                        onChange={handleDeleteChange}
                        placeholder="Group Password to Delete"
                        error={Boolean(deletePasswordError)} // Show error style if there is an error
                        helperText={deletePasswordError} />
                    <Button onClick={handleDeleteClick}>Delete Group</Button>
                </Box>
            )}
            <Box>
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    User Group Name: {userGroup?.name}
                </Typography>
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    User Group Description: {userGroup?.description}
                </Typography>
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Groups
                </Typography>
            </Box>
            <Box>
                <TextField type="text" value={search} onChange={handleSearchChange} placeholder="Search Group" />
            </Box>
            {search.length >= 3 &&
                filteredGroups.map((groupItem) => (
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
            <Button onClick={handleCreateClick}>Create new group</Button>
            <Modal open={selectedGroup != null} onClose={handleCloseModal}>
                <ModalWrapper>
                    <Box display="flex"
                        flexDirection="column"
                        gap="15px"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ width: '100%' }}>
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Group Password"
                            error={Boolean(joinGroupError)}
                            helperText={joinGroupError}
                            fullWidth
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Button onClick={handleJoinClick} >Join</Button>
                    </Box>
                </ModalWrapper>
            </Modal>
            <Modal open={creating} onClose={handleCancelCreatingClick}>
                <CreatingGroupModalWrapper>
                    <NewGroupWidget handleCancelCreatingClick={handleCancelCreatingClick} getGroups={getGroups} getUserGroup={getUserGroup} />
                </CreatingGroupModalWrapper>
            </Modal>
        </WidgetWrapper>
    );
};

export default GroupView;
