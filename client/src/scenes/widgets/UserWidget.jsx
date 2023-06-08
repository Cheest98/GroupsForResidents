import { Box, Typography, useTheme, Divider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import UserView from "../widgets/UserWidgets/UserView";
import UserEdit from "../widgets/UserWidgets/UserEdit";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { group } = useSelector((state) => state.user);
    const [editing, setEditing] = useState(false);
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, [group]); // eslint-disable-line react-hooks/exhaustive-deps

    // to się pewnie da w jednego handlera - do sprwadzenia w przyszlosci
    const handleCancelClick = () => {
        setEditing(false);
    };
    const handleEditClick = () => {
        setEditing(true);
    };

    if (!user) {
        return null;
    }


    if (editing) {
        return <UserEdit user={user.user} picturePath={user.picturePath} handleCancelClick={handleCancelClick} getUser={getUser} />;
    }

    return (
        <UserView user={user.user} picturePath={user.picturePath} handleEditClick={handleEditClick} />);

}

export default UserWidget;
