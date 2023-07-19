import { Box, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../scenes/navbar";
import MyPostWidget from "../../scenes/widgets/NewPostWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget";
import { setPosts } from "../../state";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const userData = useSelector((state) => state.user);
    const { picturePath: userPicturePath } = userData || {};
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const getPosts = async () => {
        const response = await fetch(
            `http://localhost:3001/posts/group/${user.group}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

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
                    <MyPostWidget getPosts={getPosts} picturePath={userPicturePath} />
                </Box>
                <Box width="100%"
                    p="1rem 20%"
                ><PostsWidget getPosts={getPosts} />
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;