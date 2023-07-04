import { Box, useMediaQuery } from '@mui/material';
import ShoppingRow from "./ShoppingRow";

const ShoppingList = ({ shoppingLists, deleteShoppingList, completeShoppingList, addItemToList }) => {
    const todoLists = shoppingLists.filter((list) => list.completed === false);
    const completedTasks = shoppingLists.filter((list) => list.completed === true);
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

    return (
        <Box
            width="100%"
            padding="1rem 6%"
            display={isNonMobileScreens ? 'flex' : 'block'}
            gap="0.5rem"
        >
            <Box flexBasis={isNonMobileScreens ? '50%' : undefined}>
                <ShoppingRow shoppingLists={todoLists} status="To buy" deleteShoppingList={deleteShoppingList} completeShoppingList={completeShoppingList} addItemToList={addItemToList} />
            </Box>
            <Box flexBasis={isNonMobileScreens ? '50%' : undefined}>
                <ShoppingRow shoppingLists={completedTasks} status="Completed" deleteShoppingList={deleteShoppingList} />
            </Box>
        </Box>

    );
};

export default ShoppingList;