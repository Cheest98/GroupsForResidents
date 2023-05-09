import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import UserImage from "./UserImage";

const AuthorWidget = ({ userId }) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const [authorData, setAuthorData] = useState(null);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        const fetchAuthorData = async () => {
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setAuthorData(data);
        };
        fetchAuthorData();
    }, [userId, token]);

    if (!authorData) {
        return null; // Jeśli dane nie zostały jeszcze pobrane, to nie wyświetlamy nic
    }

    const { firstName, lastName, picturePath
    } = authorData;

    return (
        <Box display="flex" alignItems="center">
            <UserImage image={picturePath} size="55px" />
            <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                sx={{
                    ml: "1rem",
                    "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                    },
                }}
            >
                {`${firstName} ${lastName}`}
            </Typography>
        </Box>
    );
};

export default AuthorWidget;