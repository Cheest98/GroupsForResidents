import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../scenes/navbar";
import MyPostWidget from "../../scenes/widgets/NewPostWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget";
const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { picturePath, group } = useSelector(({ user }) => user);;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                gap="0.5rem"
            >
                <Box
                    flexBasis={isNonMobileScreens && "42%"}
                    mt={!isNonMobileScreens && "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                </Box>
                <Box width="100%"
                    p="1rem 20%"
                ><PostsWidget key={group} />
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;