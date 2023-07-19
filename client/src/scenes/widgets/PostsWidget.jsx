import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import PostWidget from "../widgets/PostWidget";
import { Button, Skeleton } from '@mui/material';

const PostsWidget = ({ getPosts }) => {
    const posts = useSelector((state) => state.posts);
    const [loading, setLoading] = useState(true);

    const [displayedPostCount, setDisplayedPostCount] = useState(5);

    const handleLoadMore = () => {
        setDisplayedPostCount((prevCount) => prevCount + 6);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            await getPosts();
            setLoading(false);
        };

        fetchPosts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const sortedPosts = Array.isArray(posts)
        ? [...posts].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        : [];

    return (
        <>
            {loading ? (
                <>
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                        sx={{
                            padding: "0.75rem 1.5rem 0.75rem 1.5rem",
                            mt: "1rem",
                            borderRadius: "0.75rem",
                        }}
                    />
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                        sx={{
                            padding: "0.75rem 1.5rem 0.75rem 1.5rem",
                            mt: "1rem",
                            borderRadius: "0.75rem",
                        }}
                    />
                </>
            ) : (
                sortedPosts.slice(0, displayedPostCount).map(
                    ({ _id, user, userFirstName, userLastName, description, picturePath }) => (

                        <PostWidget
                            postId={_id}
                            postUserId={user}
                            userFirstName={userFirstName}
                            userLastName={userLastName}
                            description={description}
                            picturePath={picturePath}
                            userPicturePath={user.picturePath}
                        />
                    )
                )
            )}
            {displayedPostCount < sortedPosts.length && (
                <Button onClick={handleLoadMore}>More Posts</Button>
            )}
        </>
    );
};

export default PostsWidget;