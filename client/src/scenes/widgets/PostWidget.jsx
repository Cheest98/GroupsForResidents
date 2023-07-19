import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../components/WidgetWrapper";
import AuthorWidget from "../../components/Author";

const PostWidget = ({
    userFirstName,
    userLastName,
    description,
    picturePath,
    userPicturePath,
}) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;

    return (
        <WidgetWrapper m="2rem 0" width="100%">
            <Box display="flex" alignItems="center">
                <AuthorWidget
                    firstName={userFirstName}
                    lastName={userLastName}
                    picturePath={userPicturePath}
                />
            </Box>
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="50%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;