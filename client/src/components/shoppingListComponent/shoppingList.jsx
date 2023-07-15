import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import FilterCompletedLists from "./FilterCompletedLists";
import ShoppingRow from "./ShoppingRow";

const ShoppingList = ({ shoppingLists, deleteShoppingList, completeShoppingList, addItemToList, removeItemFromList }) => {
    const todoLists = shoppingLists.filter((list) => list.completed === false);
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');


    const handleDelete = (listId) => {
        deleteShoppingList(listId);
    }

    return (

        <Box
            width="100%"
            padding="1rem 6%"
            display={isNonMobileScreens ? 'flex' : 'block'}
            gap="0.5rem"
        >
            <Box flexBasis={isNonMobileScreens ? '50%' : undefined}>
                <ShoppingRow
                    shoppingLists={todoLists}
                    status="To Buy"
                    handleDelete={handleDelete}
                    completeShoppingList={completeShoppingList}
                    addItemToList={addItemToList}
                    removeItemFromList={removeItemFromList} />
            </Box>
            <Box flexBasis={isNonMobileScreens ? '50%' : undefined}>
                <FilterCompletedLists handleDelete={handleDelete} />
            </Box>
        </Box>

    );
};

export default ShoppingList;