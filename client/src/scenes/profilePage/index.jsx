import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../scenes/navbar";
import UserWidget from "../widgets/UserWidget";
import GroupView from "../widgets/GroupWidgets/GroupView"

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    const getGroups = async () => {
        const response = await fetch("http://localhost:3001/groups", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setGroups(data);
    };

    useEffect(() => {
        getUser();
        getGroups();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    //console.log(user.group)
    if (!user) return null;
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                gap="0.5rem"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                </Box>
                <Box width="100%"
                    p="1rem 20%"
                ><UserWidget groups={groups} userId={userId} picturePath={user.picturePath} getGroups={getGroups} />
                    <GroupView groups={groups} />
                </Box>
            </Box>
        </Box>)
}
export default ProfilePage;