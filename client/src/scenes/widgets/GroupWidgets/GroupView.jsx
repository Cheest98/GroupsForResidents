import React from "react";
import { Box, Typography, useTheme, Divider, useMediaQuery } from "@mui/material";
import { LocalPhone, MailOutline, EditOutlined } from "@mui/icons-material";
import Modal from '@mui/material/Modal';
import UserImage from "../../../components/UserImage";
import FlexBetween from "../../../components/FlexBetween";
import WidgetWrapper from "../../../components/WidgetWrapper";
import FlexAround from "../../../components/FlexAround";
import { useDispatch, useSelector } from "react-redux";
import { setGroups, setPosts, setUser } from "../../../state";
import { useEffect, useState } from "react";

const GroupView = ({ groups }) => {
    const user = useSelector((state) => state.user);
    const [search, setSearch] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [password, setPassword] = useState('');
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const theme = useTheme();
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
        console.log(user._id, password)
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
        }
    };
    return (
        <WidgetWrapper m="2rem 0" width="100%">
            <input type="text" value={search} onChange={handleSearchChange} placeholder="Search Group" />
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                Groups
            </Typography>
            {filteredGroups.map((groupItem) => (
                <Box key={groupItem._id}>
                    <Typography variant="h3" color={dark} fontWeight="300">
                        Name: {groupItem.name}
                    </Typography>
                    <Typography variant="h3" color={dark} fontWeight="300">
                        Description: {groupItem.description}
                    </Typography>

                    <button onClick={() => handleGroupSelect(groupItem)}>More Info</button>
                    <Divider />
                </Box>

            ))}
            <Modal open={selectedGroup != null} onClose={handleCloseModal}>
                <Box>
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                    <button onClick={handleJoinClick}>Join</button>

                </Box>
            </Modal>
        </WidgetWrapper>


    );
};

export default GroupView;