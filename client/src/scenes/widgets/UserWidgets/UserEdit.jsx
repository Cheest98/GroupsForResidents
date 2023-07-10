import { Cancel, CheckCircle, LocalPhone, MailOutline } from "@mui/icons-material";
import { Box, Divider, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexAround from "../../../components/FlexAround";
import FlexBetween from "../../../components/FlexBetween";
import UserImage from "../../../components/UserImage";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { setUser } from "../../../state";

const UserEdit = ({ user, handleCancelClick, getUser }) => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const token = useSelector((state) => state.token);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { firstName, lastName, description, phone } = user;
    const [formData, setFormData] = useState({
        // Stan formularza edycji
        firstName,
        lastName,
        description,
        phone
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name !== "picturePath") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Wywołanie API lub inna logika zapisu zmian
        try {
            const response = await fetch(`http://localhost:3001/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {

                console.log("Changes saved");

                await getUser();
                dispatch(setUser({ user: formData }));
                handleCancelClick();
            } else {

                console.error("Error while saving changes");
            }
        } catch (error) {
            // Obsłuż błąd związany z zapisem zmian
            console.error("Error while saving changes", error);
            console.log(user);
        }
    };

    return (
        <WidgetWrapper m="2rem 0" width="100%">
            <Typography color={medium}>Widok Edycji</Typography>
            <FlexBetween gap="1rem" m="1rem 0">
                <UserImage image={user.picturePath} />
                <Box>
                    <TextField
                        label="FirstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        onSubmit={handleSubmit}
                        name="firstName"
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        label="LastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        onSubmit={handleSubmit}
                        name="lastName"
                        sx={{ gridColumn: "span 4" }}
                    />

                </Box>
                {/* Do poprawy na wersji mobilnej */}
                <Box>
                    <Cancel sx={{ color: main }} onClick={handleCancelClick} />
                    <CheckCircle sx={{ color: main }} onClick={handleSubmit} />
                </Box>
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
                                <TextField
                                    label="Phone"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    onSubmit={handleSubmit}
                                    name="phone"
                                    sx={{ gridColumn: "span 4" }}
                                />
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
                <Box >
                    <TextField
                        label="Description"
                        value={formData.description}
                        onChange={handleFormChange}
                        onSubmit={handleSubmit}
                        name="description"
                        multiline
                        rows="4"
                        maxRows="10"
                        fullWidth
                    />
                </Box>
            </Box>
        </WidgetWrapper >

    );
};

export default UserEdit;