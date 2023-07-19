import { Box, Typography, useTheme } from "@mui/material";
import UserImage from "./UserImage";

const AuthorWidget = ({ firstName, lastName, picturePath }) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;

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