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
                                <Typography color={medium}>997997997</Typography>
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
                        orem ipsum dolor sit amet, consectetur adipiscing elit. Sed at dui nec nisl viverra mollis eget vitae sem. Praesent rutrum, diam nec gravida commodo, orci tellus blandit neque, in malesuada mi purus eleifend erat. In lorem turpis, blandit malesuada libero et, commodo ultricies erat. Maecenas sodales blandit malesuada. Maecenas aliquet lectus nibh, sollicitudin gravida quam tempor non. Ut a commodo est, vel dictum risus. Nullam varius bibendum augue sit amet sollicitudin. Donec risus justo, tincidunt et metus sit amet, congue tempus massa. Suspendisse velit orci, accumsan at pellentesque quis, varius a tellus. Nam semper metus sit amet velit cursus posuere in in quam. Suspendisse eget sem vel lorem scelerisque commodo. Fusce tristique mi vel bibendum commodo. Cras velit nulla, auctor eget dignissim ullamcorper, commodo et tellus. Suspendisse eget justo tempus, scelerisque nisl vehicula, fermentum lectus.
                    </Typography>
                </Box>
            </Box>

        </WidgetWrapper >

    );
};

export default UserView;