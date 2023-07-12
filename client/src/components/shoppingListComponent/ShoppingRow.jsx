import React, { useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import ShoppingSingleList from "./ShoppingSingleList";
import ShoppingStatus from '../ShoppingStatus';

const ShoppingRow = ({ shoppingLists, status, deleteShoppingList, completeShoppingList, addItemToList, removeItemFromList }) => {
    const [displayedListsCount, setDisplayedListsCount] = useState(6);

    const handleLoadMore = () => {
        setDisplayedListsCount(prevCount => prevCount + 6);
    }

    return (
        <Box>
            <ShoppingStatus
                mb="0.5rem">
                <h2>{status}</h2>
            </ShoppingStatus>
            <Grid container spacing={3}>
                {shoppingLists.slice(0, displayedListsCount).map((list) => (
                    <Grid item xs={12} sm={6} key={list._id}>
                        <ShoppingSingleList
                            list={list}
                            deleteShoppingList={deleteShoppingList}
                            completeShoppingList={completeShoppingList}
                            addItemToList={addItemToList}
                            removeItemFromList={removeItemFromList}
                        />
                    </Grid>
                ))}
            </Grid>
            {
                displayedListsCount < shoppingLists.length && (
                    <Button onClick={handleLoadMore}>More Lists</Button>
                )
            }
        </Box >
    )
}

export default ShoppingRow;
