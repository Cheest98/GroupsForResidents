import {
    Box,
    Button,
    Divider,
    InputBase,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "../../../components/WidgetWrapper";
import { setShoppingLists } from "../../../state/index";

const NewShoppingListWidget = ({ getGroupShoppingList }) => {
    const dispatch = useDispatch();
    const [list, setList] = useState({ name: '' });
    const { palette } = useTheme();
    const currentShoppingLists = useSelector((state) => state.shoppingLists);
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

    const handleList = async () => {

        const response = await fetch(`http://localhost:3001/lists`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: _id,
                name: list.name,
                items: [], // Creating an empty list
                totalPrice: 0 // Initial totalPrice
            }),
        });
        if (!response.ok) {
            console.error('Server responded with status', response.status);
            return;
        }
        const newList = await response.json();

        const updatedShoppingLists = [...currentShoppingLists, newList];

        dispatch(setShoppingLists({ shoppingLists: updatedShoppingLists }));
        setList({ name: '' }); // Reset the list name

        getGroupShoppingList();
    };

    const handleNameChange = (e) => {
        setList({ name: e.target.value });
    };

    return (
        <WidgetWrapper>
            <Box
                width="100%"
                padding="1rem 6%"
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap="0.5rem"
            >
                <InputBase
                    placeholder="List Name"
                    onChange={handleNameChange}
                    value={list.name}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                        mb: "0.5rem",
                    }}
                />
            </Box>

            <Divider sx={{ margin: "1.25rem 0" }} />

            <Button
                disabled={!list.name} // Check if list name is provided
                onClick={handleList}
                sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "3rem",
                }}
            >
                Create List
            </Button>
        </WidgetWrapper>
    );
};

export default NewShoppingListWidget;