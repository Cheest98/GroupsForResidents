import React from 'react';
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CompletedList from './CompletedList';
import ToBuyList from './ToBuyList';
import WidgetWrapper from '../WidgetWrapper';

const ShoppingSingleList = ({ list, deleteShoppingList, completeShoppingList, addItemToList, removeItemFromList }) => {

    const handleDelete = (listId) => {
        deleteShoppingList(listId);
    }
    const handleComplete = (listId, price) => {
        completeShoppingList(listId, price);
    }

    return (
        <WidgetWrapper>
            {!list.completed ? (
                <ToBuyList list={list} handleDelete={handleDelete} handleComplete={handleComplete} addItemToList={addItemToList} removeItemFromList={removeItemFromList} />
            ) : (
                <CompletedList list={list} handleDelete={handleDelete} />
            )}
        </WidgetWrapper>
    )
}

export default ShoppingSingleList;