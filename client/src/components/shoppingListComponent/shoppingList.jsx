import { Box, useMediaQuery } from '@mui/material';
import ShoppingRow from "./ShoppingRow";
import FilterCompletedLists from "./FilterCompletedLists"
import React, { useState } from 'react'

const ShoppingList = ({ shoppingLists, deleteShoppingList, completeShoppingList, addItemToList, removeItemFromList }) => {
    const todoLists = shoppingLists.filter((list) => list.completed === false);
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

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
                    deleteShoppingList={deleteShoppingList}
                    completeShoppingList={completeShoppingList}
                    addItemToList={addItemToList}
                    removeItemFromList={removeItemFromList} />
            </Box>
            <Box flexBasis={isNonMobileScreens ? '50%' : undefined}>
                <FilterCompletedLists deleteShoppingList={deleteShoppingList} />
            </Box>
        </Box>

    );
};

export default ShoppingList;