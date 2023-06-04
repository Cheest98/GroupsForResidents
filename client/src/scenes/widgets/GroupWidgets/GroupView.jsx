import React from "react";
import { Box, Typography, useTheme, Divider, useMediaQuery } from "@mui/material";
import { LocalPhone, MailOutline, EditOutlined } from "@mui/icons-material";
import UserImage from "../../../components/UserImage";
import FlexBetween from "../../../components/FlexBetween";
import WidgetWrapper from "../../../components/WidgetWrapper";
import FlexAround from "../../../components/FlexAround";
import { useDispatch, useSelector } from "react-redux";
import { setGroups } from "../../../state";
import { useEffect, useState } from "react";

const GroupView = ({ group }) => {
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    //console.log(group.name)
    const getGroups = async () => {
        const response = await fetch("http://localhost:3001/groups", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setGroups({ group: data }));
    };

    useEffect(() => {
        getGroups();
    }, []);

    console.log(group)


    return (
        <WidgetWrapper m="2rem 0" width="100%">
            <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                Group
            </Typography>
            <Box>
                <Typography
                    variant="h3"
                    color={dark}
                    fontWeight="300"
                >
                    ID: {group._id}
                </Typography>
                <Typography
                    variant="h3"
                    color={dark}
                    fontWeight="300"
                >
                    Name: {group.name}
                </Typography>
                <Typography
                    variant="h3"
                    color={dark}
                    fontWeight="300"
                >
                    Description: {group.description}
                </Typography>
                <Typography
                    variant="h3"
                    color={dark}
                    fontWeight="300"
                >
                    Members: {group.members}
                </Typography>
                <Typography color={medium}></Typography>
            </Box>
            <WidgetWrapper>wszystkie</WidgetWrapper>
        </WidgetWrapper >


    );
};

export default GroupView;