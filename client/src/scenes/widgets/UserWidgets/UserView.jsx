import React from "react";
import { Box, Typography, useTheme, Divider, useMediaQuery } from "@mui/material";
import { LocalPhone, MailOutline, EditOutlined } from "@mui/icons-material";
import UserImage from "../../../components/UserImage";
import FlexBetween from "../../../components/FlexBetween";
import WidgetWrapper from "../../../components/WidgetWrapper";
import FlexAround from "../../../components/FlexAround";

const UserView = ({ user, picturePath, handleEditClick }) => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <WidgetWrapper m="2rem 0" width="100%">
            <FlexBetween gap="1rem" m="1rem 0">
                <UserImage image={user.picturePath} />
                <Box>
                    <Typography
                        variant="h3"
                        color={dark}
                        fontWeight="300"
                    >
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Typography color={medium}>{user.group.name}</Typography>
                </Box>
                {/* Do poprawy na wersji mobilnej */}
                <EditOutlined sx={{ color: main }} onClick={handleEditClick} />
            </FlexBetween>
            <Divider />
            <Box p="1rem 0" >
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Details
                </Typography>
                <Box display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                    }}>
                    <FlexAround gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            <MailOutline sx={{ color: main }} />
                            <Box >
                                <Typography color={main} fontWeight="500" align="left">
                                    Email
                                </Typography>
                                <Typography color={medium}>{user.email}</Typography>
                            </Box>
                        </FlexBetween>
                    </FlexAround>
                    {/* Tutaj raczej zbyt przekombinowane */}
                    <FlexAround gap="1rem" >
                        <FlexBetween gap="1rem">
                            <LocalPhone sx={{ color: main }} />
                            <Box>
                                <Typography color={main} fontWeight="500" align="left">
                                    Phone
                                </Typography>
                                <Typography color={medium}>{user.phone}</Typography>
                            </Box>
                        </FlexBetween>

                    </FlexAround>
                </Box>
            </Box>

            <Divider />

            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Description
                </Typography>
                <Box display="flex" justifyContent="space-evenly">
                    <Typography color={main} >
                        {user.description}
                    </Typography>
                </Box>
            </Box>

        </WidgetWrapper >

    );
};

export default UserView;