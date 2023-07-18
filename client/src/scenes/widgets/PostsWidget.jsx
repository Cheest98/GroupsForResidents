import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "../widgets/PostWidget";

const PostsWidget = ({ getPosts, userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        getPosts();
    }, [getPosts]); // eslint-disable-line react-hooks/exhaustive-deps

    const sortedPosts = Array.isArray(posts)
        ? [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    return (
        <>
            {sortedPosts.map(({ _id, user, userFirstName, userLastName, description, picturePath, userPicturePath }) => (
                <PostWidget
                    key={_id}
                    postId={_id}
                    postUserId={user}
                    name={`${userFirstName} ${userLastName}`}
                    description={description}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                />
            ))}
        </>
    );
};

export default PostsWidget;