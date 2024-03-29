import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../scenes/navbar";
import GroupView from "../widgets/GroupWidgets/GroupView";
import UserWidget from "../widgets/UserWidget";

const ProfilePage = () => {
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const user = useSelector((state) => state.user);
    const [groups, setGroups] = useState([]);
    const [userGroup, setUserGroup] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const getGroups = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/groups', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch groups');
            }
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getUserGroup = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/groups/${user._id}/group`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user group');
            }
            const data = await response.json();
            setUserGroup(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        //getUser();
        getGroups();
        getUserGroup();
    }, [user._id]); // Added dependencies

    if (!user) return null;
    return (
        <Box>
            <Navbar />
            <Box
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="center"
            >
                <Box width={isNonMobileScreens ? "70%" : "100%"}>
                    <UserWidget
                        groups={groups}
                        userId={user._id}
                        picturePath={user.picturePath}
                        getGroups={getGroups} />
                </Box>
                <Box width={isNonMobileScreens ? "30%" : "100%"}>
                    <GroupView
                        getUserGroup={getUserGroup}
                        userGroup={userGroup}
                        groups={groups}
                        getGroups={getGroups} />
                </Box>
            </Box>
        </Box>)
}

export default ProfilePage; 
