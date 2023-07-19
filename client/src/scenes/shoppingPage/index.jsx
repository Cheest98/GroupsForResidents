import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "../../scenes/navbar";
import { setShoppingLists } from '../../state/index';
import NewListWidget from "../widgets/ShoppingListWidgets/NewListWidget";
import ShoppinglistWidget from "../widgets/ShoppingListWidgets/ShoppingListWidget";

const ShoppingListPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const getGroupShoppingList = async () => {
        const response = await fetch(
            `http://localhost:3001/lists/group/${user.group}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setShoppingLists({ shoppingLists: data }));
    };

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                gap="0.5rem"
                display="flex"
                justifyContent="space-around"
                alignItems="center"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <NewListWidget getGroupShoppingList={getGroupShoppingList} />
                </Box>
            </Box >
            <ShoppinglistWidget getGroupShoppingList={getGroupShoppingList} />
        </Box>
    );
};

export default ShoppingListPage;