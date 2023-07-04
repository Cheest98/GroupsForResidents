import { Box } from '@mui/material';
import React from 'react';
import WidgetWrapper from '../WidgetWrapper';
import ShoppingSingleList from "./ShoppingSingleList";

const ShoppingRow = ({ shoppingLists, status, deleteShoppingList, completeShoppingList, addItemToList }) => {

    return (
        <WidgetWrapper>
            <h2>{status}</h2>
            <Box>
                {shoppingLists.map((list) => (
                    <ShoppingSingleList key={list._id} list={list} deleteShoppingList={deleteShoppingList} completeShoppingList={completeShoppingList} addItemToList={addItemToList} />
                ))}
            </Box>
        </WidgetWrapper>
    )
}

export default ShoppingRow;