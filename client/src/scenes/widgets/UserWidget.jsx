import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from '@mui/material';
import UserEdit from "../widgets/UserWidgets/UserEdit";
import UserView from "../widgets/UserWidgets/UserView";

const UserWidget = ({ userId }) => {
    const [user, setUser] = useState(null);
    const { group } = useSelector((state) => state.user);
    const [editing, setEditing] = useState(false);
    const token = useSelector((state) => state.token);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            await getUser();
            setLoading(false);
        };

        fetchUser();
    }, [group]);

    //useEffect(() => {
    // getUser();
    //}, [group]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCancelClick = () => {
        setEditing(false);
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    if (!user) {
        return null;
    }


    if (editing) {
        return <UserEdit user={user.user} picturePath={user.picturePath} handleCancelClick={handleCancelClick} getUser={getUser} />;
    }

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
                </>
            ) : (
                <UserView user={user.user} picturePath={user.picturePath} handleEditClick={handleEditClick} />)}
        </>
    );

}

export default UserWidget;